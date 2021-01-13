const htmlmin = require('html-minifier');

// Importing configs
const menuJson = require('./src/config/menu.json');

module.exports = (config) => {
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/api');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/scripts');
  config.addPassthroughCopy('src/styles');

  config.addNunjucksShortcode('menuChapter', (language) => {
    let menu = `<div class="menu">`;
    for(chapter of menuJson[language]) {
      menu += `<ul class="menu__list"><span class="menu__title">${chapter['title']}</span>`;
      for (item of chapter['menu']) {
        menu += `<li class="menu__item"><a href="${item['url']}">${item['title']}</a></li>`;
      }
      menu += `</ul>`;
    }
    menu += `</div>`;
    return menu;
  });

  config.addNunjucksShortcode('languages', () => {
    return `<div class="languages"><div class="languages__flag languages__flag--ru"></div><div class="languages__flag languages__flag--en"></div></div>`;
  });

  config.addNunjucksShortcode('copyright', () => {
    return `© ${new Date().getFullYear()}, Физический факультет ВГУ`;
  });

  config.addNunjucksShortcode('address', () => {
    return `<a href="https://yandex.ru/maps/-/CGHl4S8j">394018, г. Воронеж, Университетская пл., 1, к. 238</a>`;
  });

  config.addFilter('htmlmin', (value) => {
    return htmlmin.minify(
      value, {
        removeComments: true,
        collapseWhitespace: true
      }
    );
  });

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const result = htmlmin.minify(
        content, {
          removeComments: true,
          collapseWhitespace: true
        }
      );
      return result;
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts'
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: [
      'md', 'njk'
    ],
  };
};

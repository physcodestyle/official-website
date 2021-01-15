const htmlmin = require('html-minifier');

// Importing configs
const menuJson = require('./src/config/menu.json');

module.exports = (config) => {
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/api');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/scripts');

  config.addNunjucksShortcode('menuChapter', (language, mode) => {
    let menu = (mode === 'nav' ? `<li class="navigation">` : `<div class="navigation">`);
    for(chapter of menuJson[language]) {
      if (mode === 'nav') {
        menu += `<h3 class="navigation__title">${chapter['title']}</h3><ul class="navigation__list">`;
      } else {
        menu += `<p class="navigation__title">${chapter['title']}</p><ul class="navigation__list">`;
      }
      for (item of chapter['menu']) {
        menu += `<li class="navigation__item"><a href="${item['url']}">${item['title']}</a></li>`;
      }
      menu += `</ul>`;
    }
    menu += (mode === 'nav' ? `</li>` : `</div>`);
    return menu;
  });

  config.addNunjucksShortcode('languages', () => {
    return `<div class="languages"><div class="languages__flag languages__flag--ru"></div><div class="languages__flag languages__flag--en"></div></div>`;
  });

  config.addNunjucksShortcode('copyright', (language) => {
    switch (language) {
      case 'en': return `© ${new Date().getFullYear()}, Physics Faculty of VSU`;
      case 'ru': return `© ${new Date().getFullYear()}, Физический факультет ВГУ`;
    }
  });

  config.addNunjucksShortcode('address', (language) => {
    switch (language) {
      case 'en': return `<a href="https://yandex.ru/maps/-/CGHl4S8j">394018, Voronezh, Universitetskaya square, 1, r. 238</a>`;
      case 'ru': return `<a href="https://goo.gl/maps/rvsJQgLD9DkFbfts8">394018, г. Воронеж, Университетская пл., 1, к. 238</a>`;
    }
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

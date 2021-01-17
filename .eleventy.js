const htmlmin = require('html-minifier');

// Importing configs
const footerMenuJson = require('./src/config/footer-menu.json');

module.exports = (config) => {
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/api');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/scripts');

  config.addNunjucksShortcode('footerMenu', (language) => {
    let menu = `<div class="footer-menu">`;
    for(chapter of footerMenuJson[language]) {
      `<p class="footer-menu__title">${chapter['title']}</p><ul class="footer-menu__list">`;
      for (item of chapter['menu']) {
        menu += `<li class="footer-menu__item"><a href="${item['url']}">${item['title']}</a></li>`;
      }
      menu += `</ul>`;
    }
    menu += `</div>`;
    return menu;
  });

  config.addNunjucksShortcode('languages', (language) => {
    let lang = `<div class="languages">`;
    switch (language) {
      case 'en':
        lang += `<a class="languages__flag" href="/">
          <img class="languages__flag-icon" src="/assets/Icon/Flag/RU.svg" width="24" height="24" alt="На русском языке" />
        </a>`;
        break;
      case 'ru':
        lang += `<a class="languages__flag" href="/en/">
          <img class="languages__flag-icon" src="/assets/Icon/Flag/GB.svg" width="24" height="24" alt="In English" />
        </a>`;
        break;
    }
    lang += `</div>`;
    return lang;
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

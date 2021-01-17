const htmlmin = require('html-minifier');

// Importing configs
const footerMenuJson = require('./src/config/footer-menu.json');

module.exports = (config) => {
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/api');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/scripts');

  // Footer Menu
  config.addNunjucksShortcode('footerMenu', (language) => {
    let menu = `<ul class="footer-menu">`;
    for(chapter of footerMenuJson[language]) {
      menu += `<li class="footer-menu__chapter">`;
      if (chapter['link']) {
        menu += `<a class="footer-menu__chapter-title" href="${chapter['link']}" title="${chapter['title']}">${chapter['title']}</a>`;
      } else {
        menu += `<p class="footer-menu__chapter-title">${chapter['title']}</p>`;
      }
      menu += `<ul class="footer-menu__list">`;
      for (item of chapter['menu']) {
        menu += `<li class="footer-menu__item">
          <a class="footer-menu__item-title" href="${item['url']}">${item['title']}</a>
        </li>`;
      }
      menu += `</ul></li>`;
    }
    menu += `</ul>`;
    return menu;
  });

  // Language Selector
  config.addNunjucksShortcode('languages', (language) => {
    let lang = `<div class="languages">`;
    switch (language) {
      case 'en':
        lang += `<a class="languages__flag button button--sticky" href="/">
          <img class="languages__flag-icon button-icon" src="/assets/Icon/Flag/RU.svg" width="24" height="24" alt="На русском языке" />
        </a>`;
        break;
      case 'ru':
        lang += `<a class="languages__flag button button--sticky" href="/en/">
          <img class="languages__flag-icon button-icon" src="/assets/Icon/Flag/GB.svg" width="24" height="24" alt="In English" />
        </a>`;
        break;
    }
    lang += `</div>`;
    return lang;
  });

  // Copyright
  config.addNunjucksShortcode('copyright', (language) => {
    switch (language) {
      case 'en': return `© ${new Date().getFullYear()}, Physics Faculty of VSU`;
      case 'ru': return `© ${new Date().getFullYear()}, Физический факультет ВГУ`;
    }
  });

  // Address
  config.addNunjucksShortcode('address', (language) => {
    switch (language) {
      case 'en': return `<a class="address__link" target="blank_" href="https://goo.gl/maps/rvsJQgLD9DkFbfts8" title="Show on map">394018, Voronezh, Universitetskaya&nbsp;square,&nbsp;1,&nbsp;r.&nbsp;238</a>`;
      case 'ru': return `<a class="address__link" target="blank_" href="https://yandex.ru/maps/-/CGHl4S8j" title="Показать на карте">394018, г. Воронеж, Университетская&nbsp;пл.,&nbsp;1,&nbsp;к.&nbsp;238</a>`;
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

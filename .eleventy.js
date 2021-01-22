const htmlmin = require('html-minifier');

// Importing configs
const footerMenuJson = require('./src/config/footer-menu.json');

module.exports = (config) => {
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/api');
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/images');

  // Shortcode: Footer Menu
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

  // Shortcode: Language Selector
  config.addNunjucksShortcode('languages', (language, url) => {
    let lang = `<div class="languages">`;
    switch (language) {
      case 'en':
        const regExp = /en\/[a-z]+\.html/g;
        if (url.match(regExp)) {
          url = url.replace('en/', '');
        } else {
          url = url.replace('en/', 'ru/');
        }
        lang += `<a class="languages__flag button button--sticky" href="${url}">
          <img class="languages__flag-icon button-icon" src="/assets/Icon/Flag/RU/Large.svg" width="24" height="24" title="На русском языке" />
        </a>`;
        break;
      case 'ru':
        if (url.includes('ru')) {
          url = url.replace('ru/', 'en/');
        } else {
          url = '/en' + url
        }
        lang += `<a class="languages__flag button button--sticky" href="${url}">
          <img class="languages__flag-icon button-icon" src="/assets/Icon/Flag/GB/Large.svg" width="24" height="24" title="In English" />
        </a>`;
        break;
    }
    lang += `</div>`;
    return lang;
  });

  // Shortcode: Copyright
  config.addNunjucksShortcode('copyright', (language) => {
    switch (language) {
      case 'en': return `© ${new Date().getFullYear()}, Physics Faculty of VSU`;
      case 'ru': return `© ${new Date().getFullYear()}, Физический факультет ВГУ`;
    }
  });

  // Shortcode: Address
  config.addNunjucksShortcode('address', (language) => {
    switch (language) {
      case 'en': return `<a class="address__link" target="blank_" href="https://goo.gl/maps/rvsJQgLD9DkFbfts8" title="Show on map">394018, Voronezh, Universitetskaya&nbsp;square,&nbsp;1,&nbsp;r.&nbsp;238</a>`;
      case 'ru': return `<a class="address__link" target="blank_" href="https://yandex.ru/maps/-/CGHl4S8j" title="Показать на карте">394018, г. Воронеж, Университетская&nbsp;пл.,&nbsp;1,&nbsp;к.&nbsp;238</a>`;
    }
  });

  // Shortcode: Timestamp to localized date converter
  config.addNunjucksShortcode('timestampToDate', (language, time) => {
    const date = new Date(time * 1000);
    let formnattedDate = date.toLocaleString(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    formnattedDate = formnattedDate.replace(' г.', '').replace('.', '');
    return formnattedDate;
  });

  // Shortcode: Read time colculator
  config.addNunjucksShortcode('readingTime', (language, text) => {
    let textLength = text.split(' ').length; // Split by words
    const wordsPerMinute = 150; // Average case.
    const value = Math.ceil(textLength / wordsPerMinute);
    if(textLength > 0){
      switch (language) {
      case 'en':
        return `${value} min read`;
      case 'ru':
        return `${value} мин чтения`;
      }
    }
  });

  // Filter: Limiter for loop
  config.addFilter('limit', function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Filter: Sorter (by date)
  config.addFilter('sortByDate', function(arr) {
    return arr.sort((a, b) => a.data.updatedAt - b.data.updatedAt)
  });

  // Filter: HTML minifier
  config.addFilter('htmlmin', (value) => {
    return htmlmin.minify(
      value, {
        removeComments: true,
        collapseWhitespace: true
      }
    );
  });

  // Transform: HTML minifier
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

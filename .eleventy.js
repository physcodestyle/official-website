const htmlmin = require('html-minifier');
const markdown = require('markdown-it')({ html: true });

module.exports = (config) => {
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/scripts');
  config.addPassthroughCopy('src/styles');

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

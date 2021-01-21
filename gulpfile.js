const gulp = require('gulp');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const axios = require('axios');
const fs = require('fs');

// Get current news

gulp.task('news', async () => {
  axios.get('/api/vk-news.php', {
      baseURL: 'https://phys.vsu.ru',
      params: {
        offset: 0,
        count: 10
      },
      timeout: 1000,
    })
    .then(function (response) {
      const vkNews = response.data;
      const vkKeys = Object.keys(vkNews);
      for (key of vkKeys) {
        let desc = '';
        const wordArray = vkNews[key].text.split('\n')[0].split(' ');
        for (i = 0; i < wordArray.length && i < 15; i++) {
          if (wordArray[i].slice(-1) === '.') {
            desc += wordArray[i]
            desc[desc.length - 1] = '…';
            break;
          } else if (wordArray[i].slice(0) === '#' || wordArray[i].slice(-1) === '\n') {
            desc += wordArray[i] + '…';
            break;
          } else {
            desc += wordArray[i] + ' ';
          }
        }
        let md = `---\n`;
        md += `permalink: '/ru/news/${key}/index.html'\n`;
        md += `layout: 'news.ru.njk'\n`;
        md += `source: ВКонтакте\n`;
        md += `tags:\n  - news_ru\n`;
        md += `description: '${desc}'\n`;
        md += `updatedAt: ${vkNews[key].date}\n`;
        md += `---\n`;
        if (vkNews[key].image) {
          md += `![${desc}](${vkNews[key].image.url})\n`;
          md += `${vkNews[key].text}`;
        } else if (vkNews[key].link) {
          md += `[${vkNews[key].text}](${vkNews[key].link})\n`;
        }
        fs.writeFile(`src/pages/news/${key}.ru.md`, md, function (err) {
          if (err) return console.log(err);
          console.log(`File ${key} with news fron VK was created.`);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Styles

gulp.task('styles', () => {
  return gulp.src('src/styles/{styles,print}.css')
      .pipe(postcss([
          require('postcss-import'),
          require('postcss-color-hex-alpha'),
          require('autoprefixer'),
          require('postcss-csso'),
      ]))
      .pipe(gulp.dest('dist/styles'));
});

// Scripts

gulp.task('scripts', () => {
    return gulp.src('src/scripts/scripts.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist/scripts'));
});

// Build

gulp.task('build', gulp.series(
  'styles',
  'scripts',
));

// Watch

gulp.task('watch', () => {
  gulp.watch('src/styles/**/*.css', gulp.series(
    'styles'
  ));
  gulp.watch('src/scripts/**/*.js', gulp.series(
    'scripts'
  ));
});

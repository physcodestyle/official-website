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
      let counter = 0;
      const vkNews = response.data;
      const vkKeys = Object.keys(vkNews);
      for (key of vkKeys) {
        counter++;
        const vkRegExp = /\[(club|id)[0-9]+\|/ig;
        let desc = `${vkNews[key].text.trim().replaceAll(vkRegExp, '').replaceAll(']', '').replaceAll('\n', ' ').replace('#ГостевойПост ', '').slice(0, 95)}…`;
        let md = `---\n`;
        md += `permalink: '/ru/news/${key}/index.html'\n`;
        md += `layout: 'news.ru.njk'\n`;
        md += `title: '${desc}'\n`;
        md += `source: ВКонтакте\n`;
        md += `tags:\n  - news_ru\n`;
        md += `description: '${desc}'\n`;
        md += `updatedAt: ${vkNews[key].date}\n`;
        md += `---\n`;
        if (vkNews[key].image) {
          md += `![${desc}](${vkNews[key].image.url})\n\n`;
          const list = vkNews[key].text.replaceAll(vkRegExp, '').replaceAll(']', '').split('\n');
          for (i = 0; i < list.length; i++) {
            if (list[i] !== '\n') {
              md += `${list[i].trim()}\n`;
            }
          }
        } else if (vkNews[key].link) {
          if (vkNews[key].link.image) {
            md += `![${desc}](${vkNews[key].link.image.url})\n\n`;
          }
          md += `[${vkNews[key].text}](${vkNews[key].link.url})\n`;
        }
        fs.writeFile(`src/pages/news/${key}.ru.md`, md, function (err) {
          if (err) return console.log(err);
        });
      }
      console.log(`${counter} files with news fron VK were created.`);
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

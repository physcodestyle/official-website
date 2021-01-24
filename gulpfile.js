const gulp = require('gulp');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const axios = require('axios');
const fs = require('fs');

// Processing a content with links

function addLinks(text) {
  const linkRegExp = /(http|https):\/\/[0-9a-zа-я=_%&?\/\.]+/gi;
  const allLinks = text.match(linkRegExp);
  let result = text;
  if (allLinks !== null) {
    allLinks.forEach(element => {
      result = result.replaceAll(element, `[${element}](${element})`);
    });
  }
  return result;
}

// Downloading files

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
}

// Get map images

gulp.task('map', async () => {
  const GOOGLE_MAP_KEY = process.env.PHYS_USER_GOOGLE_MAP_KEY;
  const PATH = 'https://maps.googleapis.com/maps/api/staticmap?center=Voronezh+State+University&zoom=15&language=en_US&maptype=roadmap&format=jpg&size=';
  const gMapLinks = [
    `${PATH}320x279&key=${GOOGLE_MAP_KEY}`,
    `${PATH}375x328&key=${GOOGLE_MAP_KEY}`,
    `${PATH}414x362&key=${GOOGLE_MAP_KEY}`,
    `${PATH}640x450&key=${GOOGLE_MAP_KEY}`,
  ];
  const gMapImages = [
    'dist/images/map/g-map-320.jpeg',
    'dist/images/map/g-map-375.jpeg',
    'dist/images/map/g-map-414.jpeg',
    'dist/images/map/g-map-640.jpeg',
  ];

  for (i = 0; i < gMapLinks.length; i++) {
    downloadFile(gMapLinks[i], gMapImages[i]);
  }
});

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
              md += addLinks(`${list[i].trim()}\n`);
            }
          }
          md = md.replaceAll(/[\n]{3,}/gi, `\n\n`);
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

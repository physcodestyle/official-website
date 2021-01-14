const gulp = require('gulp');
const postcss = require('gulp-postcss');

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

// Build

gulp.task('build', gulp.series(
  'styles',
));

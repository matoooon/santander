(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    sass = require('gulp-ruby-sass');

  function gulpTask() {
    return sass(config.src, { style: 'compact' })
      .pipe(gulp.dest(config.build));
  }

  gulp.task('sass', gulpTask);
})();

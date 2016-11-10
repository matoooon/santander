(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp');

  function assetsTask() {
    return gulp
      .src(config.copy.assets.src)
      .pipe(gulp.dest(config.copy.assets.dest));
  }

  gulp.task('assets', assetsTask);
})();

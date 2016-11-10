(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp');

  function libTask() {
    return gulp
      .src(config.copy.lib.src)
      .pipe(gulp.dest(config.copy.lib.dest));
  }

  gulp.task('lib', libTask);
})();

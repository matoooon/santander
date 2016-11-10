(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    wiredep = require('wiredep').stream;

  function wiredepTask() {
    return gulp
      .src(config.env.source)
      .pipe(wiredep({
        directory: config.copy.lib.dest,
        exclude: config.copy.lib.exclude
      }))
      .pipe(gulp.dest(config.build));
  }

  gulp.task('wiredep', wiredepTask);
})();

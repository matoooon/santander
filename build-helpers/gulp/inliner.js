(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    inliner = require('gulp-inline-css');

  function inlinerTask() {
    return gulp
      .src(config.inline.src)
      .pipe(inliner(config.inline.options))
      .pipe(gulp.dest(config.jade.templates.dest));
  }

  gulp.task('inliner', inlinerTask);
})();

(function wrapper() {
  'use strict';

  var changed = require('gulp-changed'),
    config = require('./config'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint');

  function jshintTask() {
    return gulp
      .src([config.src, config.tests.src])
      .pipe(changed(config.build))
      .pipe(jshint(config.jshintFile))
      .pipe(jshint.reporter('default'));
  }

  gulp.task('jshint', jshintTask);
})();

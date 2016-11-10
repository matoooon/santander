(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    jade = require('gulp-jade');

  function templatesTask() {
    return gulp
      .src([config.jade.templates.src, config.jade.templates.exclude])
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest(config.jade.templates.dest));
  }

  gulp.task('templates', templatesTask);
})();

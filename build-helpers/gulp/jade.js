(function wrapper() {
  'use strict';

  var changed = require('gulp-changed'),
    config = require('./config'),
    gulp = require('gulp'),
    inheritance = require('gulp-jade-inheritance'),
    jade = require('gulp-jade'),
    wiredep = require('wiredep').stream;

  function jadeTask() {
    return gulp
      .src(config.jade.files)
      .pipe(changed(config.build, {extension: '.html'}))
      .pipe(inheritance({ basedir: config.src }))
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest(config.build));
  }

  gulp.task('jade', jadeTask);
})();

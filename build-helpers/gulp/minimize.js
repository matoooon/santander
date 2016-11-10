(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    minifyHtml = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css'),
    sequence = require('run-sequence'),
    uglify = require('gulp-uglify');

  function minimizeCss() {
    return gulp
      .src(config.styles.files)
      .pipe(minifyCss())
      .pipe(gulp.dest(config.build));
  }

  function minimizeJs() {
    return gulp
      .src(config.scripts.build)
      .pipe(uglify())
      .pipe(gulp.dest(config.build));
  }

  function minimizeHtml() {
    return gulp
      .src(config.htmlFromJade)
      .pipe(minifyHtml({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest(config.build));
  }

  gulp.task('minimize-css', minimizeCss);
  gulp.task('minimize-js', minimizeJs);
  gulp.task('minimize-html', minimizeHtml);
})();
    
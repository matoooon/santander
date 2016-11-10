(function wrapper() {
  'use strict';

  var config = require('./config'),
  	fs = require('fs'),
  	gulp = require('gulp'),
  	inject = require('gulp-inject');

  function envTask() {
  	var fileDir = fs.existsSync(config.env.custom) ? config.env.custom : config.env.default

    return gulp
      .src(config.env.source)
      .pipe(inject(gulp.src(fileDir, {read: false}), {relative: true}))
      .pipe(gulp.dest(config.build));
  }

  gulp.task('env', envTask);
})();
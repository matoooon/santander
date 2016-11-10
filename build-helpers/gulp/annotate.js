(function wrapper() {
  'use strict';

  var changed = require('gulp-changed'),
    config = require('./config'),
    gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate');

  function annotateTask() {
    return gulp
      .src(config.scripts.files)
      .pipe(changed(config.build))
      .pipe(ngAnnotate())
      .pipe(gulp.dest(config.build));
  }

  gulp.task('annotate', annotateTask);
})();

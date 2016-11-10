(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    sequence = require('run-sequence'),
    useref = require('gulp-useref'),
    assets = useref.assets();

  function concatTask(resource) {
    return gulp
    .src([config.index, config.access, config.documents, config.policy])
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(config.build));
  }

  gulp.task('concat', concatTask);
})();

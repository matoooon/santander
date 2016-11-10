(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    sequence = require('run-sequence');

  var subTasks  = [config.copy.lib.dest, config.scripts.destFiles, config.scripts.prodFiles];

  function cleanTask(resource) {
    return function clean() {
      return gulp
      .src(resource)
      .pipe(rimraf());
    }
  }

  gulp.task('clean', cleanTask(config.build));
  gulp.task('clean-build', cleanTask(subTasks.concat([config.env.custom, config.env.default])));
  gulp.task('clean-core', cleanTask(subTasks));
})();

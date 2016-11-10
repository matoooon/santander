(function wrapper() {
  'use strict';

  var gulp = require('gulp'),
    sequence = require('run-sequence');

  function buildTask(done) {
    return sequence('clean', 'jshint', ['annotate', 'views', 'sass', 'assets', 'templates'], 'lib', 'jade', 'wiredep', 'inliner', 'concat', 'clean-build', ['minimize-html', 'minimize-css', 'minimize-js'], done);
  }

  function buildTestTask(done) {
    return sequence('clean', 'jshint', ['annotate', 'views', 'sass', 'assets', 'templates'], 'lib', 'jade', 'wiredep', 'inliner', 'env', 'concat', 'clean-core', ['minimize-html', 'minimize-css', 'minimize-js'], 'express', done);
  }

  gulp.task('build', buildTask);
  gulp.task('build-test', buildTestTask);
})();

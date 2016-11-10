(function wrapper() {
  'use strict';

  var gulp = require('gulp'),
    sequence = require('run-sequence');

  function runTask(done) {
  	return sequence('clean', 'jshint', ['annotate', 'sass', 'assets', 'views', 'templates'], 'lib', 'jade', 'wiredep', 'inliner', 'env', 'watch', 'express', done);
  }

  gulp.task('run', runTask);
})();

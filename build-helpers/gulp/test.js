(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    karma = require('gulp-karma');

  function testTask() {
    return gulp
      .src(config.tests.files)
      .pipe(karma({
        action: 'run',
        configFile: config.tests.config
      }))
      .on('error', function exit(error) {
        throw error;
      });
  }

  gulp.task('test', testTask);
})();

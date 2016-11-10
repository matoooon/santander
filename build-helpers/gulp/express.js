(function wrapper() {
  'use strict';

  var args = require('yargs').argv, 
  	config = require('./config'),
    gulp = require('gulp');

  function expressTask() {

  	process.env.APP_PORT = args.port || 5101
  	process.env.APP_ENV = args.env || 'dev'
  	process.env.APP_LIVE_PORT = args.live || 35729
    process.env.APP_API = args.api || 'private'

    return require('../.' + config.server);
  }

  gulp.task('express', expressTask);
})();
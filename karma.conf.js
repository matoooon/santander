(function wrapper() {
  'use strict';

  var karmaConf = {
    basePath: './',
    browsers: ['PhantomJS'],
    files: [
      'bower_components/angular/angular.js',
      'src/**/*.js',
      'tests/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true
  };

  function setConfig(config) {
    config.set(karmaConf);
  }

  module.exports = setConfig;
})();

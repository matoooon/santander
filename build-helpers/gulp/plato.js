(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    plato = require('plato');

  function platoTask(done) {
    plato.inspect(config.scripts.files, config.plato, { }, function callback() {
      console.log('Reporte de complejidad generado en %s/index.html', config.plato);
      done();
    });
  }

  gulp.task('plato', platoTask);
})();

(function wrapper() {
  'use strict';

  var config = require('./config'),
    gulp = require('gulp'),
    path = require('path'),
    sequence = require('run-sequence'),
    tinylr = require('tiny-lr')();

  function liveReload(event) {
    var file = path.relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [file]
        }
    });
  }

  function watchTask() {
    gulp.watch([config.build + '/**/*', '!' + config.copy.lib.dest + '/**/*'], liveReload);
  }

  gulp.watch(config.jade.files, function jadeSequence() {
    return sequence('jade', 'env', 'wiredep');
  });

  gulp.watch(config.jade.templates.src, function templatesSequence() {
    return sequence('templates', 'inliner');
  });

  gulp.watch(config.jade.views.src, ['views']);

  gulp.watch(config.sass.files, ['sass']);

  gulp.watch(config.scripts.files, function scriptSequence() {
    return sequence('jshint', 'annotate');
  });

  gulp.task('watch', watchTask);

  tinylr
    .listen(process.env.APP_LIVE_PORT);
})();

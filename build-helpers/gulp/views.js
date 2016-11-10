(function wrapper() {
  'use strict';

  var changed = require('gulp-changed'),
    config = require('./config'),
    foreach = require('gulp-foreach'),
    gulp = require('gulp'),
    inheritance = require('gulp-jade-inheritance'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename');

  function viewsTask(done) {
    return gulp
      .src(config.locals.src)
      .pipe(gulp.dest(config.locals.dest))
      .pipe(foreach(function compileLang(stream, file) {
        var locals = JSON.parse(file.contents.toString('utf-8'));

        return gulp
          .src(config.jade.views.src)
          .pipe(changed(config.jade.views.dest, {extension: '.html'}))
          .pipe(inheritance({ basedir: config.src }))
          .pipe(jade({
            locals: locals,
            pretty: true
          }))
          .pipe(rename(function renameDir(path) {
            path.dirname = path.dirname.replace(config.jade.views.basePath, config.jade.views.basePath + '/' + locals.langCode);
          }))
          .pipe(gulp.dest(config.build));
      }));
  }

  gulp.task('views', viewsTask);
})();

(function wrapper() {
  'use strict';

  var changelog = require('conventional-changelog'),
    fs = require('fs'),
    gulp = require('gulp'),
    pack = require('../../package.json');

  function changelogTask(done) {
    changelog({
      repository: pack.repository.url,
      version: pack.version
    }, function saveChangelog(error, log) {
      fs.writeFile('CHANGELOG.md', log, done);
    });
  }

  gulp.task('changelog', changelogTask);
})();

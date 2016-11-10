(function wrapper() {
  'use strict';

  var config = {
    build: './build',
    copy: {
      assets: {
        dest: './build/assets',
        src: './src/assets/**/*'
      },
      lib: {
        dest: './build/lib',
        exclude: ['ink'],
        src: './bower_components/**/*'
      }
    },
    styles: {
      files: './build/**/*.css',
      src: './src/styles'
    },
    env: {
      source: './build/*.html',
      default: './build/server-info.js',
      custom: './build/local.js'
    },
    index: './build/index.html',
    access: './build/access.html',
    documents: './build/documents.html',
    policy: './build/policy.html',
    htmlFromJade: './build/**/*.html',
    jade: {
      files: ['./src/**/*.jade', '!./src/views/**/*.jade'],
      templates: {
        dest: './build/messages',
        exclude: '!./message-templates/globals/**/*.jade',
        src: './message-templates/**/*.jade'
      },
      views: {
        basePath: 'views',
        dest: './build/views',
        src: ['./src/views/**/*.jade', '!./src/views/mixins/**/*.jade', '!./src/views/**/includes/*.jade', '!./src/views/**/mixins/*.jade']
      }
    },
    jshintFile: './.jshintrc',
    inline: {
      options: {
        preserveMediaQueries: true,
        removeLinkTags: false
      },
      src: './build/messages/**/*.html'
    },
    locals: {
      dest: './build/locals',
      src: './locals/**/*.json'
    },
    plato: './reports',
    sass: {
      files: './src/**/*.sass'
    },
    scripts: {
      build: './build/**/*.js',
      destFiles: './build/js/**/*.js',
      files: './src/**/*.js',
      prodFiles: '!./build/js/**/*.min.js'
    },
    server: './server/server.js',
    src: './src',
    tests: {
      config: './karma.conf.js',
      files: './tests/**/*.spec.js',
      src: './tests'
    }
  };

  module.exports = config;
})();

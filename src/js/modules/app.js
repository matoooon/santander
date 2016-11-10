(function wrapper() {
  'use strict';

  var app = angular
    .module('app', ['app.directives', 'app.routes', 'app.services', 'app.filters'])
    .config(configProviders)
    .run(init);

  function configProviders($controllerProvider, $provide) {
    app.controller = $controllerProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
  }

  function init() {
    new pym.Child({ polling: 100 });
  }
})();
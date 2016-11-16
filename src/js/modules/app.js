(function wrapper() {
  'use strict';

  var app = angular
    .module('app', ['app.directives', 'app.routes', 'app.services', 'app.filters'])
    .config(configProviders)
    .run(init);

  function configProviders($controllerProvider, $provide, ChartJsProvider) {
    app.controller = $controllerProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    ChartJsProvider.setOptions({ colors : [ '#0fe674', '#f60a95', '#fca205', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  }

  function init() {
    new pym.Child({ polling: 100 });
  }
})();
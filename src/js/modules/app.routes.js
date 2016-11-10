(function wrapper() {
  'use strict';

  angular
    .module('app.routes', ['app.services'])
    .config(locationConfig)
    .config(routeConfig);

  function locationConfig($locationProvider) {
    $locationProvider.hashPrefix('!');
  }

  function routeConfig(RouteHelperProvider) {
    var routes = {
      '/': {
        deps: [
          'app/home/homeController.js'
        ],
        otherwise: true,
        templateUrl: 'app/home/main.html'
      }
    };

    RouteHelperProvider.createRoutes(routes);
  }
})();
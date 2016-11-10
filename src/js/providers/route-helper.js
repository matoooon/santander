(function wrapper() {
  'use strict';

  angular
    .module('app.services')
    .provider('RouteHelper', RouteHelperProvider);

  function RouteHelperProvider($routeProvider) {
    var provider = {
      $get: angular.noop,
      createRoutes: function createRoutes(routes) {
        angular.forEach(routes, function createResolve(options, url) {
          if (options.deps) {
            options.resolve = { deps: provider.retrieveDeps(options) };
          }

          if (!options.skipTemplateTranslation) {
            options.templateUrl = [ options.templateUrl ].join('/');
          }

          $routeProvider.when(url, options);

          if (options.otherwise) {
            $routeProvider.otherwise({ redirectTo: url });
          }
        });
      },
      retrieveDeps: function retrieveDeps(options) {
        var factory = ['$q', '$rootScope', function retrieve($q, $rootScope) {
          var deferred = $q.defer();

          $script(options.deps, function resolveDeps() {
            $rootScope.$apply(deferred.resolve);
          });

          return deferred.promise;
        }];

        return factory;
      }
    };

    return provider;
  }
})();

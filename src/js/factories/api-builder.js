(function wrapper() {
  'use strict';

  angular
    .module('app.services')
    .factory('apiBuilder', apiBuilderFactory);

  function apiBuilderFactory($http, $q, apiAdapterService, catchError, headersEnum, serverInfo) {
    function facade(options, dataRequest, service) {
      var allQ,
        promises = [],
        srcApis = options.url.toString().split(',');

      srcApis.forEach(function buildService(src) {
        var deferred  = $q.defer(),
          body = options.body;

        if (dataRequest && Object.keys(dataRequest).length) {
          body = dataRequest;
        }
        $http({
            data: body,
            headers: options.headers || headersEnum,
            method: options.method,
            responseType: options.resType || 'json',
            url: serverInfo.dynPath + src,
            params: options.params
        })
        .error(function error(response) {
          deferred.reject(response);
        })
        .success(function success(data, status) {
          if (status < 400) {
            deferred.resolve(data);
          } else {
            deferred.reject(data);
          }
        });

        promises.push(deferred.promise);
      });

      allQ = (typeof options.url === 'object') ? $q.all(promises) : $q.when(promises[0]);
      var notCron = (options.notCron) ? options.notCron : false;


      if (service.alias) {
        catchError.alias = service.alias;

        catchError.clean();

        allQ.catch(catchError.raiseError);
      }

      allQ.finally();

      return allQ;
    }

    function factory(map) {
      var service = {
        attach: function attach(alias) {
          service.alias = alias;

          return service;
        }
      };

      function buildService(options, name) {
        if (angular.isObject(options)) {
          service[name] = function callToApi(data) {
            return facade(apiAdapterService(data, options), data, service);
          };
        }
      }

      angular.forEach(map, buildService);

      return service;
    }

    return factory;
  }
})();

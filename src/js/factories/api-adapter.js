(function wrapper() {
  'use strict';

  angular
    .module('app.services')
    .factory('apiAdapterService', apiAdapterServiceFactory);

  function apiAdapterServiceFactory() {
    function adapterData(data, options) {
      var mappingOptions = angular.copy(options);

      if (data) {
        if (data.headers) {
          mappingOptions.headers = data.headers;

          delete data.headers;
        }

        if (data.path) {
          mappingOptions.url = mappingOptions.url + '/' + data.path.join('/');

          delete data.path;
        }

        if (data.params) {
          mappingOptions.params = data.params;

          delete data.params;
        }

        if (data.notLoading) {
          mappingOptions.notLoading = data.notLoading;
        }
      }

      return mappingOptions;
    }

    return adapterData;
  }
})();

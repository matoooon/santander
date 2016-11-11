(function wrapper() {
  'use strict';

  angular
    .module('app.services')
    .factory('catchError', catchErrorFactory);

  function catchErrorFactory() {
    var factory = {
      clean: function clean() {
        factory.alias.error = false;
      },
      raiseError: function raiseError(response) {
        factory.alias.error = true;
        factory.alias.responseError = response;
      }
    };

    return factory;
  }
})();

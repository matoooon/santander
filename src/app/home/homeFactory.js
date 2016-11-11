(function wrapper() {
  'use strict';

  angular
    .module('app')
    .factory('homeFactory', homeFactory);

  function homeFactory(apiBuilder) {
    var service = {
      getClients: {
        method: 'post',
        url: '/workshop/filtrar'
      }
    };

    return apiBuilder(service);
  }
})();
(function wrapper() {
  'use strict';

  angular
    .module('app.constants')
    .constant('serverInfo', angular.copy($configInfo.serverInfo));
})();

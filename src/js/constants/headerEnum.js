(function wrapper() {
  angular
    .module('app.constants')
    .constant('headersEnum', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
})();

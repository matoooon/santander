(function wrapper() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController() {
    console.log('Home controller OK OK')

  }
})();
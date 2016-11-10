(function wrapper() {
  'use strict';

  angular
    .module('app.directives')
    .directive('sanCheckbox', sanCheckbox);

  function sanCheckbox($compile) {
    var directiveDefinitionObject = {
      link: link,
      restrict: 'E',
      scope: {
        color: '@?',
        name: '@?',
        idCheck: '@?',
        ngModel: '='
      },
      replace: true,
      require: 'ngModel',
      templateUrl: 'js/directives/san-checkbox/main.html'
    };

    function link(scope, element) {
      var el = element;
      var btn = element.find('input');
      btn.on('click', function(event){
        event.preventDefault();
        el[0].classList.toggle('c_on');
        scope.ngModel = !scope.ngModel;
        console.log(scope.ngModel)
        $compile(el)(scope.$parent)
      })
    }

    return directiveDefinitionObject;
  }
})();

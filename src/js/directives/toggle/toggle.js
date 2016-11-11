(function wrapper() {
  'use strict';

  angular
    .module('app.directives')
    .controller('ToggleDirectiveController', ToggleDirectiveController)
    .directive('toggle', toggleDirective);

  function ToggleDirectiveController() {
    this.actions = {
      default: {
        hide: 'hide',
        show: 'show'
      },
      fade: {
        hide: 'fadeOut',
        show: 'fadeIn'
      },
      upDown: {
        hide: 'slideUp',
        show: 'slideDown'
      }
    };
  }

  function toggleDirective($window) {
    var directiveDefinitionObject = {
      controller: 'ToggleDirectiveController',
      controllerAs: 'toggle',
      link: link,
      restrict: 'A',
      scope: {
        control: '@toggle',
        related: '@?',
        visible: '=?'
      }
    };

    function link(scope, element, attrs) {
      var control = angular.element(scope.control),
        animation = scope.toggle.actions[control.data('animation') || 'default'],
        speed = control.data('speed'),
        page = angular.element($window),
        related;

      function exit(event) {
        var target = angular.element(event.target);

        if (!target.is(scope.control) && !target.parents(scope.control).length) {
          control[animation.hide](speed);
        }
      }

      function hideRelated() {
        var current = angular.element(this);
        current[scope.toggle.actions[current.data('animation') || 'default'].hide](current.data('speed'));
      }

      function killListeners() {
        page.off('click', exit);
      }

      function toggleControl(event) {
        if (control.is(':visible')) {
          control[animation.hide](speed);
        } else {
          if (related) {
            related.each(hideRelated);
          }

          control[animation.show](speed);
        }

        event.stopPropagation();
      }

      if (control.data('exit')) {
        page.on('click', exit);
      }

      if (scope.related) {
        related = angular.element(scope.related);
      }

      if (!scope.visible) {
        control.hide();
      }

      element.on('click', toggleControl);
      element.on('$destroy', killListeners);
    }

    return directiveDefinitionObject;
  }
})();
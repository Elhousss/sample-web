/**
 * Created by ...
 */

angular.module("sample").directive('roleActionOnClick', function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      node : '=node',
      clicked: '&roleActionOnClick'
    },
    controller: 'RoleController',
    template: [
      '<span><ng-transclude></ng-transclude></span>'
    ].join(''),
    link: function(scope, element, attrs, ctrl) {

      element.on('click', function(){
        "use strict";
        scope.clicked(scope.node);
      });

    }
  };
});

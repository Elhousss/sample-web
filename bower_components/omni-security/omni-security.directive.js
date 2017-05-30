/**
 * Created by Asebban on 08/08/2016.
 */
angular.module("security").directive("omniSecurity", omniSecurityDirective);

  omniSecurityDirective.$inject = ['AuthorizationService'];

  function omniSecurityDirective(AuthorizationService){

    var directive = {
      template: "<div ng-if='authorized' style='display: inline-block'><ng-transclude></ng-transclude></div>",
      restrict: 'E',
      transclude: true,
      scope: {
        securedBy: '@'
      },
      link: function(scope, element, attrs) {

        if (AuthorizationService.authorize(scope.securedBy)) {
          scope.authorized = true;
        }
        else {
          scope.authorized = false;
        }
      }
    };

    return directive;

  };


angular.module("OmniComponents").directive("alert", alerteDirective);


function alerteDirective() {

  var directive = {
    templateUrl: 'app/common/directives/omni-components/omni-alert/omni-alert.html',
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@type'
    },
    link: link
  };

  return directive;

  function link(scope) {
    if (scope.type == "error") {
      scope.iconClass = "glyphicon glyphicon-ban-circle";
    }
    if (scope.type == "warning") {
      scope.iconClass = "glyphicon glyphicon-warning-sign";
    }
    if (scope.type == "info") {
      scope.iconClass = "glyphicon glyphicon-thumbs-up";
    }
  }
};

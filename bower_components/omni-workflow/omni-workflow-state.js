/**
 * Created by Asebban on 08/08/2016.
 */
angular.module("workflow").directive("omniWorkflowState", function(){
  return {
    template: [
    '<div class="workflowState {{class}}">',
    '<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> {{entity.workflowState}}',
    '</div>'
    ].join('\n'),
    restrict: 'E',
    replace: true,
    scope: {
      class: '@workflowClass',
      entity: '=workflowEntity'
    },
    link: function(scope, element, attrs) {
      var e = scope.entity;
    }
  };
});


/**
 * Created by Asebban on 08/08/2016.
 */
angular.module("workflow").directive("omniWorkflowTransitions", ['$rootScope','WorkflowService',function($rootScope, WorkflowService){
  return {
    template: [
    '<div class="workflowTransitions {{class}}">',
    '<button ng-repeat="t in transitions" ng-click="executeTransition(t.name)" type="button" class="btn btn-default" aria-label="Left Align">',
    '<span class="fa fa-step-forward" aria-hidden="true"></span>',
    '{{t.name}}',
    '</button>',
    '</div>'
    ].join('\n'),
    restrict: 'E',
    replace: true,
    scope: {
      entity: '=workflowEntity',
      class: '@workflowClass'
    },
    link: function(scope, element, attrs) {

      scope.executeTransition = function(transition) {
        if (angular.isDefined(transition)
          && angular.isDefined(scope.entity.processIdentifier)
          && angular.isDefined(scope.entity.workflow))
          WorkflowService.executeTransition(transition, scope.entity.processIdentifier, scope.entity.workflow)
            .then(
              function(data){
                scope.transitions = WorkflowService.getTransitions();
                scope.entity.workflowState = data.misc;
              },
              function(reason){
                $rootScope.$broadcast('workflowError', reason);
              }
            );
      };

      scope.allowedTransitions = function() {
        if (angular.isDefined(scope.entity) && angular.isDefined(scope.entity.workflow) && angular.isDefined(scope.entity.processIdentifier))
          WorkflowService.allowedTransitions(scope.entity.processIdentifier, scope.entity.workflow)
            .then(
              function(data) {
                  scope.transitions = WorkflowService.getTransitions();
                  scope.entity.workflowState = data.misc;
              },
              function(reason) {
                $rootScope.$broadcast('workflowError', reason);
              }
            );
      };
      scope.allowedTransitions();
    }
  };
}]);


/**
 * Created by Asebban on 10/02/2016.
 */
(function() {
  angular.module("workflow")
    .provider("WorkflowService", workflowServiceProvider);

  function workflowServiceProvider() {

    var executeTransitionUrl = '/rs/workflow/execute';
    var allowedTransitionsUrl = '/rs/workflow/allowedTransitions';
    var baseUrl = "/api";

    var provider = {
      getExecuteTransitionUrl: getExecuteTransitionUrl,
      setExecuteTransitionUrl: setExecuteTransitionUrl,
      getAllowedTransitionsUrl: getAllowedTransitionsUrl,
      setAllowedTransitionsUrl: setAllowedTransitionsUrl,
      getBaseUrl: getBaseUrl,
      setBaseUrl: setBaseUrl,
      $get: workflowService
    };

    return provider;

    function getExecuteTransitionUrl() {
      return executeTransitionUrl;
    };

    function setExecuteTransitionUrl(url) {
      executeTransitionUrl = url;
    };

    function getAllowedTransitionsUrl() {
      return allowedTransitionsUrl;
    };

    function setAllowedTransitionsUrl(url) {
      allowedTransitionsUrl = url;
    };

    function getBaseUrl() {
      return baseUrl;
    };

    function setBaseUrl(url) {
      baseUrl = url;
    };

    workflowService.$inject = ['$q', '$http'];

    function workflowService($q, $http) {

      var transitions;
      var entity;

      var service = {
        executeTransition : executeTransition,
        allowedTransitions : allowedTransitions,
        getTransitions : getTransitions,
        getEntity : getEntity
      };

      return service;

      function executeTransition(transitionName, processIdentifier, workflow) {
        var deferred = $q.defer();
        return $http.get(baseUrl + '/' + executeTransitionUrl + "?transition=" + transitionName + "&processIdentifier=" + processIdentifier + "&workflow=" + workflow)
          .then(function (resp) {
            var data = resp.data;
            if (data.status == 0) {
              transitions = data.listItems;
              entity = data.misc;
              deferred.resolve(data);
              return deferred.promise;
            }
            else {
              deferred.reject(data.message);
              return deferred.promise;
            }
            ;
          }, function (resp) {
            deferred.reject(resp.statusText);
            return deferred.promise;
          });
      };

      function allowedTransitions(processIdentifier, workflow) {
        var deferred = $q.defer();
        return $http.get(baseUrl + '/' + allowedTransitionsUrl + "?processIdentifier=" + processIdentifier + "&workflow=" + workflow)
          .then(function (resp) {
              var data = resp.data;
              if (data.status == 0) {
                transitions = data.listItems;
                entity = data.misc;
                deferred.resolve(data);
                return deferred.promise;
              }
              else {
                deferred.reject(data.message);
                return deferred.promise;
              }
              ;
            }
            , function (resp) {
              deferred.reject(resp.statusText);
              return deferred.promise;
            });
      };

      function getTransitions() {
        if (typeof(transitions) == 'object')
          return transitions;
      };

      function getEntity() {
        if (typeof(entity) == 'object')
          return entity;
      }
    }
  };
})();

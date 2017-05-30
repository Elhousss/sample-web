/**
 * Created by Asebban on 27/09/2016.
 */

(function() {
  angular.module('auth').provider('AuthorizationService', authorizationServiceProvider);

  function authorizationServiceProvider() {

    var baseUrl = '/api';

    var provider = {
      getBaseUrl: getBaseUrl,
      setBaseUrl: setBaseUrl,
      $get: authorizationService
    };

    return provider;

    function getBaseUrl() {
      return baseUrl;
    };

    function setBaseUrl(url) {
      baseUrl = url;
    };

    function authorizationService($http, $rootScope, $q) {

      var authorizedActions = [];
      var deferred = $q.defer();
      var authorizationsLoaded = false;

      var service = {
        isAuthorizationsLoaded: isAuthorizationsLoaded,
        getActions: getActions,
        setActions: setActions,
        authorize: authorize,
        load: load
      };

      return service;

      function isAuthorizationsLoaded() {
        return authorizationsLoaded;
      };

      function getActions() {
        return authorizedActions;
      };

      function setActions(actions) {
        authorizedActions = actions;
      };

      function authorize(action) {
        if (!authorizationsLoaded)
          return false;

        if (authorizedActions.indexOf(action) > -1)
          return true;
        else
          return false;
      };

      function load() {

        if (angular.isDefined(authorizedActions) && authorizedActions != null && authorizedActions.length > 0) {
          deferred.resolve(authorizedActions);
          return deferred.promise;
        }

        return $http.get(baseUrl + '/rs/navigation/loadAccessRights')
          .then(
            function (resp) {
              var data = resp.data;

              if (data.status == 0) {
                authorizedActions = data.listItems;
                authorizationsLoaded = true;
                deferred.resolve(data.listItems);
                $rootScope.$broadcast('authorizationLoadingSuccess', data.listItems);
                return deferred.promise;
              }
              else {
                $rootScope.$broadcast('authorizationLoadingError', data.message);
                authorizationsLoaded = false;
                deferred.reject(data.message);
                return deferred.promise;
              }
            }, function (resp) {
              $rootScope.$broadcast('authorizationLoadingError', resp.statusText);
              authorizationsLoaded = false;
              deferred.reject(resp.statusText);
              return deferred.promise;
            });
      };
    }

    authorizationService.$inject = ['$http', '$rootScope', '$q'];

  };
})();

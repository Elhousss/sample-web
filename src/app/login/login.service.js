/**
 * Created by Asebban on 08/08/2016.
 */
(function() {
  angular.module("login").service('LoadingInterceptor', loginService);

      function loginService ($q, $rootScope, $log) {
        'use strict';

        var service = {
          request : request,
          requestError : requestError,
          response : response,
          responseError : responseError
        };

        return service;

        function request(config) {
          $rootScope.loading = true;
          return config;
        };

        function requestError(rejection) {
          $rootScope.loading = false;
          $log.error('Request error:', rejection);
          return $q.reject(rejection);
        };

        function response(response) {
          $rootScope.loading = false;
          return response;
        };

        function responseError(rejection) {
          $rootScope.loading = false;
          $log.error('Response error:', rejection);
          return $q.reject(rejection);
        }
      };

      loginService.$inject  = ['$q', '$rootScope', '$log'];

})();


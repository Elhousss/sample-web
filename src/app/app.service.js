/**
 * Created by Asebban on 08/08/2016.
 */
(function() {
  "use strict";

  angular.module("sample").service('LoadingInterceptor',
    ['$q', '$rootScope', '$log',
      function ($q, $rootScope, $log) {
        'use strict';

        return {
          request: function (config) {
            $rootScope.loading = true;
            return config;
          },
          requestError: function (rejection) {
            $rootScope.loading = false;
            $log.error('Request error:', rejection);
            return $q.reject(rejection);
          },
          response: function (response) {
            $rootScope.loading = false;
            return response;
          },
          responseError: function (rejection) {
            $rootScope.loading = false;
            $log.error('Response error:', rejection);
            return $q.reject(rejection);
          }
        };
      }]);

  angular.module("sample").config(['$httpProvider', function ($httpProvider) { // $mdDateLocaleProvider
    $httpProvider.interceptors.push('LoadingInterceptor');
  }]);
})();

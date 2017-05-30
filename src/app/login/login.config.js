/**
 * Created by Asebban on 23/09/2016.
 */
(function() {
  angular.module("login").config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
  }]);

  angular.module("login").config(['AuthorizationServiceProvider','AuthenticationServiceProvider','Settings',function (AuthorizationServiceProvider, AuthenticationServiceProvider, Settings) {
    "use strict";
    AuthenticationServiceProvider.setBaseUrl(Settings.base);
    AuthenticationServiceProvider.setLoginUrl(Settings.base + '/rs/authenticate/login');
    AuthenticationServiceProvider.setPingUserUrl(Settings.base + '/rs/authenticate/user');
    AuthenticationServiceProvider.setLogoutUrl(Settings.base + '/rs/authenticate/logout');

    AuthorizationServiceProvider.setBaseUrl(Settings.base);

  }]);
})();

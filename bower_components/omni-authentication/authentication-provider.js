
(function () {

  angular.module('auth').provider('AuthenticationService', authenticationServiceProvider);

  function authenticationServiceProvider() {

    var baseUrl;
    var loginUrl;
    var logoutUrl;
    var pingUserUrl;

    var provider = {
      getBaseUrl : getBaseUrl,
      setBaseUrl : setBaseUrl,
      getLoginUrl : getLoginUrl,
      setLoginUrl : setLoginUrl,
      getLogoutUrl : getLogoutUrl,
      setLogoutUrl : setLogoutUrl,
      getPingUserUrl : getPingUserUrl,
      setPingUserUrl : setPingUserUrl,
      $get : authenticationService
    };

    return provider;


    function getBaseUrl() {
      if (!angular.isDefined(baseUrl) || baseUrl == null || baseUrl == "") {
        baseUrl = "/api";
        return baseUrl;
      }
      else {
        return baseUrl;
      }
    };

    function setBaseUrl(url) {
      baseUrl = url;
    };

    function getLoginUrl() {
      if (typeof(loginUrl) == 'undefined')
        return getBaseUrl() + '/rs/login';
      else
        return loginUrl;
    };

    function setLoginUrl(url) {
      loginUrl = url;
    };

    function getLogoutUrl() {
      if (typeof(logoutUrl) == 'undefined')
        return "/logout";
      else
        return logoutUrl;
    };

    function setLogoutUrl(url) {
      logoutUrl = url;
    };

    function getPingUserUrl() {
      if (typeof(pingUserUrl) == 'undefined')
        return "/user";
      else
        return pingUserUrl;
    };

    function setPingUserUrl(url) {
      pingUserUrl = url;
    };

    function authenticationService($http, $q) {

      var deferred = $q.defer();
      var authenticated;
      var authenticatedUser;
      var error;
      var message;

      var service = {
        getAuthenticatedUser : getAuthenticatedUser,
        setAuthenticatedUser : setAuthenticatedUser,
        isAuthenticated : isAuthenticated,
        setAuthenticated : setAuthenticated,
        isError : isError,
        getMessage : getMessage,
        authenticate : authenticate,
        pingUser : pingUser,
        changePassword : changePassword,
        logout : logout
      };

      return service;

      function getAuthenticatedUser() {
        return authenticatedUser;
      };

      function setAuthenticatedUser(user) {
        authenticatedUser = user;
      };

      function isAuthenticated() {
        return authenticated;
      };

      function setAuthenticated(isAuthenticated) {
        authenticated = isAuthenticated;
      };

      function isError() {
        return error;
      };

      function getMessage() {
        return message;
      };

      function authenticate(credentials) {

        if (!angular.isDefined(loginUrl))
          loginUrl = getBaseUrl() + "/rs/login";

        return $http.post(loginUrl, credentials)
          .then(function (resp) {
              if (resp.data.status == 0) {
                authenticatedUser = resp.data;
                authenticated = true;
                error = false;
                deferred.resolve(resp.data);
                return deferred.promise;
              }
              else {
                authenticatedUser = {};
                authenticated = false;
                error = true;
                message = "messages.userOrPasswordIncorrect";
                deferred.reject(message);
                return deferred.promise;
              }
            }
            , function (resp) {
              authenticatedUser = {};
              authenticated = false;
              error = true;
              message = resp.statusText;
              deferred.reject(message);
              return deferred.promise;
            });
      };

      function pingUser() {

        if (!angular.isDefined(pingUserUrl))
          pingUserUrl = getBaseUrl() + "/rs/user";

        return $http.get(pingUserUrl)
          .then(function (resp) {
              var data = resp.data;
              if (typeof(data) == 'object') {
                authenticatedUser = data;
                error = false;
                authenticated = true;
                deferred.resolve(data);
                return deferred.promise;
              }
              else {
                authenticatedUser = {};
                error = true;
                authenticated = false;
                var parser = new DOMParser();
                var doc = parser.parseFromString(data, "text/html");
                message = doc.body.textContent;
                deferred.reject(message);
                return deferred.promise;
              }
            },
            function (resp) {
              authenticatedUser = {};
              error = true;
              authenticated = false;
              message = resp.statusText;
              deferred.reject(message);
              return deferred.promise;
            });
      };

      function changePassword(cpUrl, oldPassword, newPassword, confirmNewPassword) {
        var deferred = $q.defer();

        if (!angular.isDefined(cpUrl)) {
          cpUrl = getBaseUrl() + "/rs/authenticate/changePassword";
        }

        cpUrl = cpUrl + "?oldPassword=" + oldPassword + "&password=" + newPassword + "&confirmPassword=" + confirmNewPassword;
        return $http.get(cpUrl)
          .then(function (resp) {
            var data = resp.data;
            if (data.status == 0) {
              var data = resp.data;
              deferred.resolve(data);
              return deferred.promise;
            }
            else {
              deferred.reject(data.message);
              return deferred.promise;
            }
          }, function (resp) {
            deferred.reject(resp.statusText);
            return deferred.promise;
          });
      };

      function logout(logoutUrl) {

        if (!angular.isDefined(logoutUrl))
          logoutUrl = getBaseUrl() + "/rs/logout";

        return $http.get(logoutUrl)
          .then(function (resp) {
            var data = resp.data;
            if (data == true) {
              authenticated = false;
              authenticatedUser = {};
              error = false;
              deferred.resolve(data);
              return deferred.promise;
            }
            else {
              deferred.reject(resp.statusText);
              return deferred.promise;
            }
          }, function (resp) {
            deferred.reject(resp.statusText);
            return deferred.promise;
          });
      };
    };

    authenticationService.$inject = ['$http', '$q'];

  };
})();

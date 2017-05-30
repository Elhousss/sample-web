/**
 * Created by Asebban on 08/08/2016.
 */
(function() {
  angular.module("login").controller("LoginController", loginController);

  function loginController($rootScope, $scope, $q, $window, AuthenticationService, Settings, $translate) {

    var userOrPasswordIncorrect = "messages.userOrPasswordIncorrect";

    $translate("messages.userOrPasswordIncorrect").then(function (translation) {
      "use strict";
      if (angular.isDefined(translation) && translation != null) {
        userOrPasswordIncorrect = translation;
      }
    });

    var processSuccessfulLogin = function (data) {

      $scope.user = data.user;

      if ($scope.multirole) {
        $scope.user.connectedRoleLabel = data.selectedRole;
        $window.location.href = Settings.base;
      }
      else {
        if (typeof(data.affectations) != 'undefined' && data.affectations != null && data.affectations.length > 1) {
          $scope.affectations = data.affectations;
          $scope.multirole = true;
        }
        else {
            $window.location.href = Settings.base;
        }

      }

    }

    $scope.login = function () {

      AuthenticationService.authenticate($scope.credentials)
        .then(function (data) {
            $rootScope.error = false;
            $rootScope.message = "";
            processSuccessfulLogin(data);
            return $q.resolve(data);
          }, function (reason) {
            $rootScope.error = true;
            $rootScope.message = reason;
            return $q.reject(reason);
          }
        ).then(function () {
        "use strict";
        console.log('Authentication successful');
      }, function (reason) {
        "use strict";
        console.log('Error : ' + reason);
        $rootScope.error = true;
        $rootScope.message = reason;
        $window.location.href = Settings.base + "/login.html";
      });
    };

  };

  loginController.$inject = ['$rootScope', '$scope', '$q', '$window', 'AuthenticationService', 'Settings', '$translate'];
})();

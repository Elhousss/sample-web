/**
 * Created by Asebban on 18/03/2016.
 */
(function() {
  angular.module("sample").controller("ChangePasswordController", cpController);

  function cpController($scope, Settings, title, close, $element, AuthenticationService) {

    $scope.oldPassword = null;
    $scope.newPassword = null;
    $scope.confirmNewPassword = null;
    $scope.title = title;

    $scope.confirmPasswordChange = function () {

      if ($scope.oldPassword == '') {
        close({
          status: -1,
          message: 'messages.emptyPassword'
        }, 500);
      }

      if ($scope.confirmNewPassword != $scope.newPassword) {
        close({
          status: -2,
          message: 'messages.passwordsNotMatch'
        }, 500);
      }

      if ($scope.confirmNewPassword == $scope.oldPassword) {
        close({
          status: -3,
          message: 'messages.passwordDidntChange'
        }, 500);
      }

      AuthenticationService.changePassword(Settings.base + "/rs/authenticate/changePassword", $scope.oldPassword, $scope.newPassword, $scope.confirmNewPassword)
        .then(
          function (data) {
            close({
              status: 0,
              message: 'messages.passwordChangeOk'
            }, 500);
          },
          function (reason) {

            close({
              status: -4,
              message: reason
            }, 500);
          });

    };

    $scope.cancelPasswordChange = function () {
      $element.modal('hide');
    };
  };

  cpController.$inject = ['$scope','Settings','title','close','$element','AuthenticationService'];

})();

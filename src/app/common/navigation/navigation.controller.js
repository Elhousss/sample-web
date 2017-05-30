(function() {
  angular.module("sample").controller("navigationController", navController);

  function navController($scope, $window, $rootScope, AuthenticationService, AuthorizationService, Settings, MessageHandlerService, $translate, MenuService, BreadCrumbService, ModalService) {

    $rootScope.popUntil = popUntil;
    $rootScope.changeLanguage = changeLanguage;
    $scope.onExit = onExit;
    $scope.logout = logout;
    $scope.changePassword = changePassword;

    activate();

    function popUntil(element) {
      BreadCrumbService.popUntil(element);
    };

    /*
     * Called by change of the language combobox in the navigation bar
     * */
    function changeLanguage(lang) {
      $translate.use(lang);
    };


    /*
     * Determines how we react to a window close
     * */
    function onExit() {
      $scope.authenticated = false;
    }

    /******************************************/

    /*
     * Called by the logout menu
     * */
    function logout() {
      AuthenticationService.logout()
        .then(function (data) {
          "use strict";
          $scope.authenticated = false;
          $window.location.href = Settings.base + "/login.html";
        }, function (reason) {
          "use strict";
          MessageHandlerService.displayErrorMessage(reason);
        });
    };

    function changePassword() {

      $translate("messages.changePassword").then(function (translation) {
        if (angular.isDefined(translation) && translation != null) {

          var title = translation;

          ModalService.showModal({
            templateUrl: "app/common/change-password/change-password-dialog.html",
            controller: "ChangePasswordController",
            inputs: {
              title: title
            }
          }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
              if (result.status == 0) {
                $translate(result.message).then(function (translation) {
                  if (angular.isDefined(translation) && translation != null) {
                    MessageHandlerService.displayInfoMessage(translation);
                  }
                  else {
                    MessageHandlerService.displayInfoMessage("messages.passwordChangeOk");
                  }
                });
              }
              else {
                $translate(result.message).then(function (translation) {
                  if (angular.isDefined(translation) && translation != null) {
                    MessageHandlerService.displayErrorMessage(translation);
                  }
                  else {
                    MessageHandlerService.displayErrorMessage(result.message);
                  }
                });
              }
              ;
            });
          });
        }
      });


    };

    function activate() {

      BreadCrumbService.init();

      $rootScope.$on('$translateChangeSuccess', function () {
        BreadCrumbService.translateAll();
        $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();
      });

      /*
       * Insure that the user is still connected when entering the main page
       * */
      AuthenticationService.pingUser()
        .then(function (data) {
          $scope.user = data;
        }, function (reason) {
          MessageHandlerService.displayErrorMessage(reason);
          $window.location.href = Settings.base + "/login.html";
        });

      /*
       * Get the used language (stored in local or cookie storage)
       * */
      $scope.lang = $translate.use();

      /*
       * Translate IDs that are outside the controller scope
       * */
      $translate('title').then(function (title) {
        $scope.title = title;
      });

      /*
       * Load the security actions related to the connected user
       * */

      AuthorizationService.load()
        .then(function (list) {
          "use strict";

          AuthorizationService.setActions(list);
          MenuService.loadMenu()
            .then(function (data) {
              if (data.status == 0) {
                $scope.menu = data.listItems;
              }
            }, function (reason) {
              MessageHandlerService.displayErrorMessage(reason);
            });

        }, function (reason) {
          "use strict";
          MessageHandlerService.displayErrorMessage(reason);
        });

      $window.onbeforeunload = $scope.onExit();
    }



  };

  navController.$inject = ['$scope','$window','$rootScope','AuthenticationService','AuthorizationService','Settings','MessageHandlerService','$translate','MenuService','BreadCrumbService','ModalService'];

})();

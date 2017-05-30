(function() {
  angular.module("message-handler", ["pascalprecht.translate"])
    .factory("MessageHandlerService", messageHandlerService);

  messageHandlerService.$inject = ['$rootScope', '$translate', '$q'];

  function messageHandlerService($rootScope, $translate, $q) {


        var service = {
          displayErrorMessage : displayErrorMessage,
          displayWarningMessage : displayWarningMessage,
          displayInfoMessage : displayInfoMessage,
          cleanWarnings : cleanWarnings,
          cleanInfos : cleanInfos,
          cleanErrors : cleanErrors
        };

        return service;

        function displayErrorMessage(message) {
          $rootScope.error = true;
          $translate(message).then(function (translation) {
            if (angular.isDefined(translation) && translation != null)
              $rootScope.message = translation;
            else
              $rootScope.message = message;
          });
        };

        function cleanErrors() {
          $rootScope.error = false;
          $rootScope.message = "";
        };

        function cleanInfos() {
          $rootScope.information = false;
          $rootScope.message = "";
        };

        function cleanWarnings() {
          $rootScope.warning = false;
          $rootScope.message = "";
        };

        function displayInfoMessage(message) {
          $rootScope.information = true;
          $translate(message).then(function (translation) {
            if (angular.isDefined(translation) && translation != null)
              $rootScope.message = translation;
            else
              $rootScope.message = message;
          });
        };

        function displayWarningMessage(message) {
          $rootScope.warning = true;
          $translate(message).then(function (translation) {
            if (angular.isDefined(translation) && translation != null)
              $rootScope.message = translation;
            else
              $rootScope.message = message;
          });
        }
      };

})();

/**
 * Created by Asebban on 17/03/2016.
 */

(function() {
  angular.module("breadcrumb", ["pascalprecht.translate"])
    .factory("BreadCrumbService", breadCrumbService);

      function breadCrumbService($translate, $rootScope) {
        /* The object in the stack contains :
         * the id of the content to insert in the breadcrumb
         * the label (translated id)
         * the url (when the element is clicked
         * the activation status : active or not
         */
        var breadCrumbStack = [];
        var service = {
          init : init,
          getBreadCrumbStack : getBreadCrumbStack,
          setBreadCrumbStack : setBreadCrumbStack,
          push : push,
          pop : pop,
          popUntil : popUntil,
          translateAll : translateAll,
          appendAddOn : appendAddOn
        };

        return service;

        function init() {
            var home = {id: "misc.home", url: "#"};
            breadCrumbStack = [];
            this.push(home);
        };
        function getBreadCrumbStack() {
            return breadCrumbStack;
        };
        function setBreadCrumbStack(stack) {
          breadCrumbStack = stack;
        };
        function push(element) {
          if (angular.isDefined(element) && element != null) {

            if (angular.isUndefined(element.id))
              throw "id is not defined";

            $translate(element.id).then(function (translation) {
              if (angular.isDefined(translation) && translation != null)
                element.label = translation;
              else
                element.label = element.id;
            });
            /*
             * Get the current top element of the stack and make it active before pushing the current one
             * */
            if (breadCrumbStack.length > 0) {
              var topElement = breadCrumbStack[breadCrumbStack.length - 1];
              topElement.active = "active";
            }
            /*
             * The element to insert will become the top of the stack, then make it inactive
             * */
            element.active = "";
            element.addOn = "";
            breadCrumbStack.push(element);
            $rootScope.breadcrumb = breadCrumbStack;
          }
        };
        function pop() {
          if (breadCrumbStack.length > 1) {
            var e = breadCrumbStack.pop();
            breadCrumbStack[breadCrumbStack.length - 1].active = "";
            $rootScope.breadcrumb = breadCrumbStack;
            return e;
          }
        };
        function popUntil(element) {
          if (breadCrumbStack.length > 1) {

            var e = breadCrumbStack[breadCrumbStack.length - 1];
            if (e.id == element.id)
              return;

            while (angular.isDefined(e) && e != null && (e.id != element.id)) {
              breadCrumbStack.pop();
              e = breadCrumbStack[breadCrumbStack.length - 1];
            }
            $rootScope.breadcrumb = breadCrumbStack;
          }
        };
        function translateAll() {
          var ids = [];
          for (var i = 0; i < breadCrumbStack.length; i++) {
            ids[i] = breadCrumbStack[i].id;
          }

          $translate(ids).then(function (translations) {
            if (angular.isDefined(translations) && translations != null) {
              for (var i = 0; i < ids.length; i++) {
                breadCrumbStack[i].label = translations[ids[i]];
              }
            }
            $rootScope.breadcrumb = breadCrumbStack;
          });
        };
        function appendAddOn(addOn) {
          if (breadCrumbStack.length > 0) {
            var top = breadCrumbStack[breadCrumbStack.length - 1];
            top.addOn = addOn;
          }
        };
      };

      breadCrumbService.$inject = ['$translate', '$rootScope'];

})();

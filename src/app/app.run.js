/**
 * Created by Asebban on 08/08/2016.
 */
(function() {
  angular.module("sample").run(['$rootScope','$location','AttachementService','MessageHandlerService','BreadCrumbService','Settings','$templateCache',function ($rootScope, $location, AttachementService, MessageHandlerService, BreadCrumbService, Settings, $templateCache) {

    $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
      MessageHandlerService.cleanErrors();
      MessageHandlerService.cleanInfos();
      MessageHandlerService.cleanWarnings();
      AttachementService.clearDocuments();
      $rootScope.nextUrl = next;
      $rootScope.actualLocation = $location.path();
    });

    $rootScope.base = Settings.base;
    $rootScope.root = Settings.root;

    $rootScope.$watch(function () {
      return $location.path()
    }, function (newLocation, oldLocation) {
      if ($rootScope.actualLocation === newLocation) {
        BreadCrumbService.pop();
      }
      else {
        if (newLocation.indexOf("recherche") != -1) {
          var element = {id: "button.search", url: "#" + newLocation};
          if (element.id != BreadCrumbService.getBreadCrumbStack()[BreadCrumbService.getBreadCrumbStack().length - 1].id)
            BreadCrumbService.push(element);
          $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();
        }
        if (newLocation.indexOf("add") != -1) {
          var element = {id: "button.add", url: "#" + newLocation};
          if (element.id != BreadCrumbService.getBreadCrumbStack()[BreadCrumbService.getBreadCrumbStack().length - 1].id)
            BreadCrumbService.push(element);
          $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();
        }
      }
    });

    $templateCache.put("partials/node.html", "<li><input id='node.actionId' name='node.actionId' ng-click='checkNode(node)' type='checkbox' ng-checked='node.checked' ng-disabled='disable'><span ng-click='toggleVisibility(node)'>{{ node.actionName }}</span></li>");
  }]);
})();

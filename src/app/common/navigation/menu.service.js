/**
 * Created by Asebban on 10/03/2016.
 */
(function() {
  angular.module("menu", [])
    .provider("MenuService", menuProvider);

      var menuUrl = "/rs/navigation/loadMenu";
      var baseUrl = '/api';

      function menuProvider() {

        var provider = {
          setMenuUrl : setMenuUrl,
          setBaseUrl : setBaseUrl,
          $get : menuService
        };

        return provider;

        function setMenuUrl(url) {
          "use strict";
          menuUrl = url;
        };

        function setBaseUrl(url) {
          "use strict";
          baseUrl = url;
        };

        menuService.$inject = ['$http', '$q'];

        function menuService($http, $q) {
          "use strict";
          var service = {
            loadMenu : loadMenu
          };

          return service;

          function loadMenu() {
            var deferred = $q.defer();
            return $http.get(baseUrl + menuUrl)
              .then(function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data);
                    return deferred.promise;
                  }
                  else {
                    deferred.reject(data.message);
                    return deferred.promise;
                  }
                }
                , function (resp) {
                  deferred.reject(resp.statusText);
                  return deferred.promise;
                });
          }
        };

    };

})();

/**
 * Created by ...
 */

(function() {
  angular.module("sample").factory("TreeService", ["$http", "$q", "Settings", function ($http, $q, Settings) {
    "use strict";

    var serviceTree = [];

    return {
      setTree: function (tree) {
        this.serviceTree = tree;
      },
      getTree: function () {
        return serviceTree;
      },
      loadChildren: function (actionId) {

        var deferred = $q.defer();

        return $http.get(Settings.base + "/rs/admin/role/loadChildren?id=" + actionId)
          .then(function (resp) {
              var data = resp.data;
              if (data.status == 0) {
                serviceTree = data.listItems;
                deferred.resolve(data.listItems);
                return deferred.promise;
              }
              else {
                if (typeof(data) == 'object') {
                  deferred.reject(data.message);
                  return deferred.promise;
                }
                else {
                  deferred.reject(resp.statusText);
                  return deferred.promise;
                }
              }
            }
            , function (resp) {
              deferred.reject(resp.statusText);
              return deferred.promise;
            });
      },

      getChildren: function (node) {

        var deferred = $q.defer();

        return $http.get(Settings.base + "/rs/admin/role/loadChildren?id=" + node.actionId + "&className=omnishore.sample.server.admin.metier.modele.Action")
          .then(function (resp) {
            var data = resp.data;
            if (data.status == 0) {
              deferred.resolve(data.listItems);
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

      }
    };
  }]);
})();

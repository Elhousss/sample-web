/**
 * Created by Asebban on 24/02/2016.
 */
(function() {
  angular.module("entity", ["settings", "attachements"]);

  angular.module("entity")
    .factory("EntityService", entityService);

      function entityService($http, $q, AttachementService, Settings)
      {
        var servicePath = "";

        var service = {
          setServicePath : setServicePath,
          getServicePath : getServicePath,
          create : create,
          view : view,
          search : search,
          searchAll : searchAll,
          edit : edit,
          cancelEdit : cancelEdit,
          save : save,
          delete : deleteEntity
        };

        return service;

        function setServicePath(path) {
            servicePath = path;
            if (servicePath.startsWith("/"))
              servicePath = servicePath.substring(1);

            if (servicePath.endsWith("/"))
              servicePath = servicePath.substring(0, servicePath.length - 1);
        };

        function getServicePath() {
            return servicePath;
        };

        function create(entity) {

            var deferred = $q.defer();
            var uuid = AttachementService.getUUID();

            return $http.post(Settings.base + "/rs/" + servicePath + "/create/" + uuid, entity)
              .then(function (resp) {
                var data = resp.data;
                if (data.status == 0) {
                  deferred.resolve(data.object);
                  return deferred.promise;
                }
                else {
                  if (typeof(resp.data) == 'object') {
                    deferred.reject(resp.data.message);
                    return deferred.promise;
                  }
                  else {
                    deferred.reject(resp.statusText);
                    return deferred.promise;
                  }
                }
              }, function (resp) {
                deferred.reject(resp.statusText);
                return deferred.promise;
              });
        };

        function view(id) {

            var deferred = $q.defer();
            return $http.get(Settings.base + "/rs/" + servicePath + "/" + id)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data.object);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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
        };

        function search(currentPage, pageSize, criteriaEntity) {

            var deferred = $q.defer();
            if (typeof(currentPage) == 'undefined' || currentPage == null)
              currentPage = 1;
            if (typeof(pageSize) == 'undefined' || pageSize == null)
              pageSize = 10;

            var myUrl = Settings.base + '/rs/' + servicePath + '/search/page/' + currentPage + '/' + pageSize;
            var data = {};

            for (var member in criteriaEntity) {
              if (angular.isDefined(criteriaEntity[member]) && criteriaEntity[member] != null)
                data[member] = criteriaEntity[member];
            }

            var req = {
              method: 'POST',
              url: myUrl,
              data: data
            };

            return $http(req)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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

        };

        function searchAll(criteriaEntity) {

            var deferred = $q.defer();

            var myUrl = Settings.base + '/rs/' + servicePath + '/search';
            var data = {};

            for (var member in criteriaEntity) {
              if (angular.isDefined(criteriaEntity[member]) && criteriaEntity[member] != null)
                data[member] = criteriaEntity[member];
            }

            var req = {};
            if (!jQuery.isEmptyObject(data)) {
              req = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                url: myUrl,
                data: data
              };
            }
            else {
              req = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                url: myUrl
              };
            }

            return $http.post(myUrl, data)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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

        };

        function edit(id) {

            var deferred = $q.defer();
            return $http.get(Settings.base + "/rs/" + servicePath + "/edit/" + id)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data.object);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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
        };

        function cancelEdit(id) {

            var deferred = $q.defer();
            return $http.get(Settings.base + "/rs/" + servicePath + "/cancelEdit/" + id)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data.object);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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
        };

        function save(entity) {

            var deferred = $q.defer();
            var uuid = AttachementService.getUUID();

            var myUrl = Settings.base + '/rs/' + servicePath + '/save/' + uuid;
            return $http.post(myUrl, entity)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data.object);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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
        };

        function deleteEntity(id) {

            var deferred = $q.defer();
            return $http.get(Settings.base + "/rs/" + servicePath + "/delete/" + id)
              .then(
                function (resp) {
                  var data = resp.data;
                  if (data.status == 0) {
                    deferred.resolve(data.status);
                    return deferred.promise;
                  }
                  else {
                    if (typeof(resp.data) == 'object') {
                      deferred.reject(resp.data.message);
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
        };
      };

      entityService.$inject =  ['$http', '$q', 'AttachementService', 'Settings'];

})();

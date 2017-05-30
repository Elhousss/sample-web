/**
 * Created by Asebban on 12/02/2016.
 */
(function() {
  angular.module("attachements")
    .provider("AttachementService", attachementServiceProvider);

  function attachementServiceProvider() {

    var attachementsUrl = "/rs/attachement/getAttachements"
      , downalodAttachementUrl = "/rs/attachement/download/"
      , removeAttachementUrl = "/rs/attachement/remove/"
      , uploadAttachementUrl = "/rs/attachement/upload/"
      , baseUrl = "/api";

    var provider = {
      setAttachementsUrl: setAttachementsUrl,
      setDownloadAttachementUrl: setDownloadAttachementUrl,
      setRemoveAttachementUrl: setRemoveAttachementUrl,
      setUploadAttachementUrl: setUploadAttachementUrl,
      setBaseUrl: setBaseUrl,
      $get: attachementService
    };

    return provider;

    var generateUUID = function () {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    };

    function setAttachementsUrl(url) {
      attachementsUrl = url;
    };

    function setDownloadAttachementUrl(url) {
      downalodAttachementUrl = url;
    };

    function setRemoveAttachementUrl(url) {
      removeAttachementUrl = url;
    };

    function setUploadAttachementUrl(url) {
      uploadAttachementUrl = url;
    };

    function setBaseUrl(url) {
      baseUrl = url;
    };

    attachementService.$inject = ['$q', '$http'];

    function attachementService($q, $http) {

      var uuid = "";
      var documents = [];
      var cleanMode = "automatic";

      var service = {
        getAttachementsUrl: getAttachementsUrl,
        getDownloadAttachementUrl: getDownloadAttachementUrl,
        getRemoveAttachementUrl: getRemoveAttachementUrl,
        getUploadAttachementUrl: getUploadAttachementUrl,
        getBaseUrl: getBaseUrl,
        generateUUID: generateUUID,
        getAttachements: getAttachements,
        downloadFile: downloadFile,
        getUUID: getUUID,
        addDocument: addDocument,
        getDocuments: getDocuments,
        clearDocuments: clearDocuments,
        removeDocument: removeDocument,
        removeAll: removeAll,
        setCleanMode: setCleanMode
      };

      return service;

      function getAttachementsUrl() {
        return attachementsUrl;
      };

      function getDownloadAttachementUrl() {
        return downalodAttachementUrl;
      };

      function getRemoveAttachementUrl() {
        return removeAttachementUrl;
      };

      function getUploadAttachementUrl() {
        return uploadAttachementUrl;
      };

      function getBaseUrl() {
        return baseUrl;
      };

      function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
          d += performance.now(); //use high-precision timer if available
        }
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      };

      function getAttachements(entity, className) {
        var deferred = $q.defer();
        return $http.get(baseUrl + attachementsUrl + "?id=" + entity.id + "&className=" + className)
          .then(function (resp) {
              documents = resp.data.listItems;
              deferred.resolve(resp);
              return deferred.promise;
            },
            function (resp) {
              deferred.reject(resp.statusText);
              return deferred.promise;
            });
      };

      function downloadFile(id) {
        var deferred = $q.defer();
        return $http.get(baseUrl + '/' + downalodAttachementUrl + '/' + id)
          .success(function (data, status, headers) {
            deferred.resolve(data);
            return deferred.promise;
          })
          .error(function (reason, status) {
            deferred.reject(reason);
            return deferred.promise;
          });
      };

      function getUUID() {
        if (angular.isDefined(uuid))
          return uuid;
        else
          return "";
      };

      function addDocument(document) {
        if (!angular.isDefined(uuid) || uuid == "") {
          uuid = generateUUID();
        }
        if (!angular.isDefined(documents) || documents == null)
          documents = [];
        documents.push(document);
      };

      function getDocuments() {
        if (angular.isDefined(documents))
          return documents;
        else
          return [];
      };

      function clearDocuments() {
        if (angular.isDefined(documents) && documents != null) {
          documents.length = 0;
          uuid = "";
        }
      };

      function removeDocument(index) {
        if (angular.isDefined(uuid) && uuid != "")
          documents.splice(index, 1);
        else {

          if (!angular.isDefined(documents) || documents.length == 0)
            return;

          if (index >= documents.length)
            return;

          var doc = documents[index];
          $http.get(baseUrl + '/' + removeAttachementUrl + '/' + doc.id)
            .success(function (data) {
              if (data.status == 0)
                documents.splice(index, 1);
            })
            .error(function (reason) {
            });
        }
      };

      function removeAll(id, className) {

      };

      function setCleanMode(value) {
        cleanMode = value;
      }
    }
  };
})();


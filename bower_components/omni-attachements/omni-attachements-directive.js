/**
 * Created by Asebban on 08/08/2016.
 */
(function() {
  angular.module("attachements").directive("omniAttachements", ['$rootScope', '$http', 'Upload', 'AttachementService', function ($rootScope, $http, Upload, AttachementService) {
  return {
    template: ['<div>',
               '<script type="text/ng-template" id="attachementTemplate.html">',
               '<form name="omniAttachementForm" enctype="multipart/form-data" method="post">',
               '<div ng-show="!disable">',
               '<label for="file"></label>',
               '<input type="file" ngf-select="" ng-model="document" id="file" required="" class="form-control">',
               '<button ng-disabled="!omniAttachementForm.$valid" ng-click="uploadDocument(document)" class="btn btn-default">Upload</button>',
               '<i ng-show="omniAttachementForm.document.$error">Error</i>',
               '</div>',
               '<span class="progress" ng-show="progressPercentage > 0 && progressPercentage < 100">',
               '<div class="col-sm-12" ng-show="progressPercentage > 0"><uib-progressbar class="progress-striped" value="progressPercentage" type="warning">{{progressPercentage}}%</uib-progressbar></div>',
               '</span>',
               '<table class="table" ng-show="documents.length > 0">',
               '<thead>',
               '<tr>',
               '<th>Document</th>',
               '<th ng-show="!disable">Action</th>',
               '</tr>',
               '</thead>',
               '<tbody>',
               '<tr ng-repeat="d in documents">',
               '<td>{{d.name}}</td>',
               '<td>',
               '<button ng-show="!disable" ng-click="removeUpload(d.name)" style="display: inline-block; border: none;background: none;">',
               '<span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: black;"></span>',
               '</button>',
               '<span class="glyphicon glyphicon-download-alt" ng-show="disable" aria-hidden="true" ng-click="downloadFile(d.id)"></span>',
               '</td>',
               '</tr>',
               '</tbody>',
               '</table>',
                '</form>',
                '<img src="assets/images/loading.png" ng-show="isLoading"/>',
                '</script>',
                '<div class="attachement {{cls}}">',
        '<span class="glyphicon glyphicon-paperclip" aria-hidden="true" uib-popover-template="popoverTemplate" popover-placement="right" popover-is-open="popoverIsOpen" ng-click="updatePopover()" popover-title="{{title | translate}}" style="top: 0px;">',
                '<span ng-show="documents.length > 0">[</span>',
                '{{documents.length}}',
                '<span ng-show="documents.length > 0">]</span>',
                '</span>',
                '</div>',
                '</div>'
    ].join('\n'),
    restrict: 'E',
    replace: true,
    scope: {
      entity: '=entity',
      className: '@classname',
      disable: '=disable', /* Ajout, consultation, modification */
      title: '@title',
      cleanMode: '@cleanMode', /* automatic, manual */
      cls: '@'
    },
    link: function(scope, element, attrs) {

      var downloadYourAttachementsMessage = "messages.downloadYourAttachementsMessage";
      var attachYourAttachementsMessage = "messages.attachYourAttachementsMessage";

      var hideProgress = function() {
        if (!scope.popoverIsOpen)
          scope.progressPercentage = 0;
      };

      scope.baseUrl = AttachementService.getBaseUrl();
      scope.base = scope.baseUrl;
      scope.popoverTemplate = "attachementTemplate.html";
      scope.progressPercentage = 0;
      scope.popoverIsOpen = false;

      scope.uploadUrl = AttachementService.getUploadAttachementUrl();
      scope.downloadUrl = AttachementService.getDownloadAttachementUrl();
      scope.getAttachementUrl = AttachementService.getAttachementsUrl();
      scope.removeAttachementUrl = AttachementService.getRemoveAttachementUrl();


      if (angular.isDefined(scope.cleanMode) && scope.cleanMode != "")
        AttachementService.setCleanMode(scope.cleanMode);

      scope.$watch('popoverIsOpen', hideProgress);
      scope.removeUpload = function(fileName) {
        var files = AttachementService.getDocuments();
        if (angular.isDefined(files) && files.length != 0) {
          for(i=0; i<files.length;i++) {
            /* file to remove found */
            if (files[i].name == fileName) {
              AttachementService.removeDocument(i);
            }
          }
        }
      };

      scope.downloadFile = function(id) {
        AttachementService.downloadFile(id)
          .then(function (result) {
              // success
              window.open(scope.baseUrl+'/'+scope.downloadUrl+'/' + id, '_self', '');
            },
            function (result) {
              $rootScope.$broadcast('attachementError', result);
            });
      };

      scope.updatePopover = function() {
        scope.popoverIsOpen = !scope.popoverIsOpen;

        if (scope.popoverIsOpen) {

          if (scope.disable)
            scope.title = downloadYourAttachementsMessage;
          else
            scope.title = attachYourAttachementsMessage;

          // En mode création, donc pas d'attachements à mettre à jour
          if (!angular.isDefined(scope.entity.id) || scope.entity.id == null || scope.entity.id == 0)
            return;

          // si les documents existent en mémoire, pas la peine d'aller vers le serveur
          var foundIdAbsence = false;
          if (angular.isDefined(scope.documents) && scope.documents != null && scope.documents.length > 0) {
            for(i=0; i<scope.documents.length;i++) {
              if (!angular.isDefined(scope.documents[i].id)) {
                foundIdAbsence = true;
                break;
              }
            }

            if (!foundIdAbsence)
              return;
          }

          scope.isLoading = true;
          AttachementService.getAttachements(scope.entity, scope.className)
            .then(
              function (resp) {
                var data = resp.data;
                if (data.status == 0) {
                  scope.documents = data.listItems;
                  scope.isLoading = false;
                }
                else {
                  $rootScope.$broadcast('attachementError', data.message);
                  scope.isLoading = false;
                }
              }
              ,function (reason) {
                $rootScope.$broadcast('attachementError', reason);
                scope.isLoading = false;
              }
            );
        }
      };

      scope.uploadDocument = function(file){

        /* check for duplicates */
        var files = AttachementService.getDocuments();
        if (angular.isDefined(files) && files != null && files.length != 0) {
          for(i=0; i<files.length;i++) {
            /* duplicate found */
            if (files[i].name == file.name)
              return;
          }
        }

        if (!scope.disable) {

          var uuid = AttachementService.getUUID();
          if (!angular.isDefined(uuid) || uuid == "") {
            AttachementService.generateUUID();
            uuid = AttachementService.getUUID();
          }

          Upload.upload({
            url: scope.baseUrl+'/'+scope.uploadUrl,
            data: {document: file, uuid: uuid}
          }).then(function (resp) {
            console.log('Success ' + resp.config.data.document.name + ' uploaded. Response: ' + resp.data);
            AttachementService.addDocument(resp.config.data.document);
            scope.documents = AttachementService.getDocuments();
          }, function (resp) {
            console.log('Error status: ' + resp.status);
            $rootScope.$broadcast('attachementError', resp.statusText+":"+resp.status);
          }, function (evt) {
            scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + scope.progressPercentage + '% ' + evt.config.data.document.name);
          });
        }

      };

      if (!angular.isDefined(scope.title)) {
        scope.title = attachYourAttachementsMessage;
      }
    }
  };
  }]);
})();


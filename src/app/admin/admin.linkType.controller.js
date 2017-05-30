
(function() {
  angular.module("sample").controller("LinkTypeController", linkTypeController);

  linkTypeController.$inject = ['$rootScope', '$routeParams', '$location', 'AttachementService', '$window', 'CrudService', 'MessageHandlerService',
    'EntityService', '$translate', 'BreadCrumbService'];

  function linkTypeController($rootScope, $routeParams, $location, AttachementService, $window,
                               CrudService, MessageHandlerService, EntityService, $translate, BreadCrumbService) {

    var vm = this;

    vm.noCache = true;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.searchText = "";

    vm.view = view;
    vm.selectSrcToDestLink = selectSrcToDestLink;
    vm.selectDestToSrcLink = selectDestToSrcLink;
    vm.selectLnkNature = selectLnkNature;
    vm.addAnother = addAnother;
    vm.create = create;
    vm.edit = edit;
    vm.save = save;
    vm.delete = deleteLinkType;
    vm.searchPageChanged = searchPageChanged;
    vm.search = search;
    vm.cancelEdit = cancelEdit;
    

    vm.back = back;
    vm.toString = toString;

    var entityCreatedMsg = "";
    var sessionExpiredMsg = "";
    var entitySavedMsg = "";
    var entityDeletedMsg = "";

    activate();


    ////////////////////////////////////////////////////////////////////////////////


    function view(id) {

      EntityService.setServicePath("admin/linkType");
      EntityService.view($routeParams.id)
        .then(function (data) {
          vm.linkType = data;


          /* Fill breadcrumb */
          var addOnString = vm.linkType.name;
          var view = {id: "button.view", url: "#/pages/admin/linkType/detail_linkType/" + vm.linkType.id};
          BreadCrumbService.push(view);
          BreadCrumbService.appendAddOn(addOnString);
          $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();
          CrudService.setMode(CrudService.detailMode());
          reload();

        }, function (statusText) {
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage('messages.sessionExpired');
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    };

    function selectSrcToDestLink(item) {
      if (angular.isDefined(item))
        vm.linkType.refSrcToDestLink = item.originalObject;
    };
    function selectDestToSrcLink(item) {
      if (angular.isDefined(item))
        vm.linkType.refDestToSrcLink = item.originalObject;
    };
    function selectLnkNature(item) {
      if (angular.isDefined(item))
        vm.linkType.refLnkNature = item.originalObject;
    };


    function create(linkType) {

      formatEntity(linkType);
	  EntityService.setServicePath("admin/linkType");
      EntityService.create(linkType)
        .then(function (data) {
            vm.linkType = data;
            formatEntity(vm.linkType);
            CrudService.setMode(CrudService.createMode());

            /* Fill breadcrumb */
            var addOnString = vm.linkType.id;
            var view = {id: "button.view", url: "#/pages/admin/linkType/detail_linkType/" + vm.linkType.id};
            BreadCrumbService.push(view);
            BreadCrumbService.appendAddOn(addOnString);
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            MessageHandlerService.displayInfoMessage('messages.entityCreated');
            reload();
          },
          function (reason) {
            if (reason == "OK")
              MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
            else
              MessageHandlerService.displayErrorMessage(reason);
          });

    };

    function addAnother() {
    
      /* Générer un ID unique pour indexer les eventuels documents attachés */

      /* Fill breadcrumb */
      var add = {id: "button.add", url: "#/pages/admin/linkType/add_linkType"};
      BreadCrumbService.pop();
      BreadCrumbService.push(add);
      BreadCrumbService.appendAddOn("LinkType");
      $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

      CrudService.setMode(CrudService.addMode());
      reload();
      init();
    };

    function edit(id) {

      EntityService.setServicePath("admin/linkType");
      EntityService.edit(id)
        .then(function (data) {
            vm.linkType = data;


            formatEntity(vm.linkType);

            /* Fill breadcrumb */
            var addOnString = vm.linkType.id;
            var edit = {id: "button.edit", url: "#/pages/admin/linkType/edit_linkType/" + vm.linkType.id};
            BreadCrumbService.pop();
            BreadCrumbService.push(edit);
            BreadCrumbService.appendAddOn(addOnString);
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            CrudService.setMode(CrudService.editMode());
            reload();
          }
          , function (reason) {
            if (reason == "OK")
              MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
            else
              MessageHandlerService.displayErrorMessage(reason);
          });
    };

    function save(linkType) {

      formatEntity(linkType);

      EntityService.setServicePath("admin/linkType");
      EntityService.save(linkType)
        .then(function (data) {
            vm.linkType = data;
            formatEntity(vm.linkType);
            CrudService.setMode(CrudService.saveMode());

            /* Fill breadcrumb */
            var addOnString = vm.linkType.id;
            var view = {id: "button.view", url: "#/pages/admin/linkType/detail_linkType/" + vm.linkType.id};
            BreadCrumbService.pop();
            BreadCrumbService.push(view);
            BreadCrumbService.appendAddOn(addOnString);
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            MessageHandlerService.displayInfoMessage('messages.entitySaved');
            reload();
          }
          , function (reason) {
            if (reason == "OK")
              MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
            else
              MessageHandlerService.displayErrorMessage(reason);
          });
    };

    function deleteLinkType(id) {

      EntityService.setServicePath("admin/linkType");
      EntityService.delete(id)
        .then(function (status) {
            MessageHandlerService.displayInfoMessage(entityDeletedMsg);

            /* Fill breadcrumb */
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            $location.path("#/pages/admin/linkType/recherche_linkType");
          }
          , function (reason) {
            if (reason == "OK")
              MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
            else
              MessageHandlerService.displayErrorMessage(reason);
          });
    };

    function searchPageChanged(currentPage) {
        vm.currentPage = currentPage;
        vm.search(vm.linkType);
    };

    /*
     * Search function with criteria
     */
    function search(linkType) {

      vm.searchOK = false;

      EntityService.setServicePath("admin/linkType");
      EntityService.search(vm.currentPage, vm.pageSize, linkType)
        .then(function (data) {
            vm.linkTypes = data.listItems;
            vm.count = data.count;
            vm.npages = CrudService.getNumPages(vm.count, vm.pageSize);
            vm.searchOK = true;
          }
          , function (reason) {

            if (reason == "OK")
              MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
            else
              MessageHandlerService.displayErrorMessage(reason);

            vm.searchOK = false;
          });
    };

    function cancelEdit(id) {

      EntityService.setServicePath("admin/linkType");
      EntityService.cancelEdit(id)
        .then(function (data) {
            CrudService.setMode(CrudService.saveMode());
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();
            reload();
          }
          , function (reason) {
            if (reason == "OK")
              MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
            else
              MessageHandlerService.displayErrorMessage(reason);
          });
    };




    function back() {
      $window.history.back();
    }

    function toString() {
      if (angular.isDefined(vm.linkType))
        return vm.linkType.id;
      return "linkType";
    }


    /*
     * out of scope functions
     */



    function loadSrcToDestLinks() {
      EntityService.setServicePath("admin/link");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.srcToDestLinks = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }


    function loadDestToSrcLinks() {
      EntityService.setServicePath("admin/link");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.destToSrcLinks = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }


    function loadLnkNatures() {
      EntityService.setServicePath("admin/linkNature");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.lnkNatures = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }



     
    var formatEntity = function (data) {
          var linkType = data;
      
      

      

    };

    function reload() {
      vm.createEnabled = CrudService.isCreateEnabled();
      vm.addEnabled = CrudService.isAddEnabled();
      vm.cancelEnabled = CrudService.isCancelEnabled();
      vm.editEnabled = CrudService.isEditEnabled();
      vm.saveEnabled = CrudService.isSaveEnabled();
      vm.deleteEnabled = CrudService.isDeleteEnabled();
      vm.backEnabled = CrudService.isBackEnabled();
      vm.disable = CrudService.isDisable();
      vm.mode = CrudService.getCurrentMode();
    };

    function init() {
        vm.linkType = new Object();
    };

    /*
     * perform at controller startup
     */

    function activate () {
      "use strict";

      $translate(['messages.entityCreated', 'messages.sessionExpired', 'messages.entitySaved', 'messages.entityDeleted']).then(function (translations) {
        entityCreatedMsg = translations['messages.entityCreated'];
        sessionExpiredMsg = translations['messages.sessionExpired'];
        entitySavedMsg = translations['messages.entitySaved'];
        entityDeletedMsg = translations['messages.entityDeleted'];
      });

      $rootScope.$on('workflowError', function(event, args) {
        MessageHandlerService.displayErrorMessage(args);
      });

      /**
       * Load references
       */

      loadSrcToDestLinks();
      loadDestToSrcLinks();
      loadLnkNatures();





      if (typeof($routeParams.id) != 'undefined') {
        if ($rootScope.nextUrl.endsWith("detail_linkType/" + $routeParams.id))
          vm.view($routeParams.id);
        if ($rootScope.nextUrl.endsWith("edit_linkType/" + $routeParams.id))
          vm.edit($routeParams.id);
        if ($rootScope.nextUrl.endsWith("delete_linkType/" + $routeParams.id))
          vm.delete($routeParams.id);
      }
      else {
        init();
        CrudService.setMode(CrudService.initMode());
        reload();
      }
      ;

    };

  };


})();

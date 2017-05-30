
(function() {
  angular.module("sample").controller("ActionController", actionController);

  actionController.$inject = ['$rootScope', '$routeParams', '$location', 'AttachementService', '$window', 'CrudService', 'MessageHandlerService',
    'EntityService', '$translate', 'BreadCrumbService'];

  function actionController($rootScope, $routeParams, $location, AttachementService, $window,
                               CrudService, MessageHandlerService, EntityService, $translate, BreadCrumbService) {

    var vm = this;

    vm.noCache = true;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.searchText = "";

    vm.view = view;
    vm.selectParent = selectParent;
    vm.addAnother = addAnother;
    vm.create = create;
    vm.edit = edit;
    vm.save = save;
    vm.delete = deleteAction;
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

      EntityService.setServicePath("admin/action");
      EntityService.view($routeParams.id)
        .then(function (data) {
          vm.action = data;


          /* Fill breadcrumb */
          var addOnString = vm.action.name;
          var view = {id: "button.view", url: "#/pages/admin/action/detail_action/" + vm.action.id};
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

    function selectParent(item) {
      if (angular.isDefined(item))
        vm.action.refParent = item.originalObject;
    };


    function create(action) {

      formatEntity(action);
	  EntityService.setServicePath("admin/action");
      EntityService.create(action)
        .then(function (data) {
            vm.action = data;
            formatEntity(vm.action);
            CrudService.setMode(CrudService.createMode());

            /* Fill breadcrumb */
            var addOnString = vm.action.id;
            var view = {id: "button.view", url: "#/pages/admin/action/detail_action/" + vm.action.id};
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
      var add = {id: "button.add", url: "#/pages/admin/action/add_action"};
      BreadCrumbService.pop();
      BreadCrumbService.push(add);
      BreadCrumbService.appendAddOn("Action");
      $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

      CrudService.setMode(CrudService.addMode());
      reload();
      init();
    };

    function edit(id) {

      EntityService.setServicePath("admin/action");
      EntityService.edit(id)
        .then(function (data) {
            vm.action = data;


            formatEntity(vm.action);

            /* Fill breadcrumb */
            var addOnString = vm.action.id;
            var edit = {id: "button.edit", url: "#/pages/admin/action/edit_action/" + vm.action.id};
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

    function save(action) {

      formatEntity(action);

      EntityService.setServicePath("admin/action");
      EntityService.save(action)
        .then(function (data) {
            vm.action = data;
            formatEntity(vm.action);
            CrudService.setMode(CrudService.saveMode());

            /* Fill breadcrumb */
            var addOnString = vm.action.id;
            var view = {id: "button.view", url: "#/pages/admin/action/detail_action/" + vm.action.id};
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

    function deleteAction(id) {

      EntityService.setServicePath("admin/action");
      EntityService.delete(id)
        .then(function (status) {
            MessageHandlerService.displayInfoMessage(entityDeletedMsg);

            /* Fill breadcrumb */
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            $location.path("#/pages/admin/action/recherche_action");
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
        vm.search(vm.action);
    };

    /*
     * Search function with criteria
     */
    function search(action) {

      vm.searchOK = false;

      EntityService.setServicePath("admin/action");
      EntityService.search(vm.currentPage, vm.pageSize, action)
        .then(function (data) {
            vm.actions = data.listItems;
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

      EntityService.setServicePath("admin/action");
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
      if (angular.isDefined(vm.action))
        return vm.action.id;
      return "action";
    }


    /*
     * out of scope functions
     */



    function loadParents() {
      EntityService.setServicePath("admin/action");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.parents = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }



     
    var formatEntity = function (data) {
          var action = data;
      
      

      

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
        vm.action = new Object();
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

      loadParents();





      if (typeof($routeParams.id) != 'undefined') {
        if ($rootScope.nextUrl.endsWith("detail_action/" + $routeParams.id))
          vm.view($routeParams.id);
        if ($rootScope.nextUrl.endsWith("edit_action/" + $routeParams.id))
          vm.edit($routeParams.id);
        if ($rootScope.nextUrl.endsWith("delete_action/" + $routeParams.id))
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

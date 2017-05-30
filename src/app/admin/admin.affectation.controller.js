
(function() {
  angular.module("sample").controller("AffectationController", affectationController);

  affectationController.$inject = ['$rootScope', '$routeParams', '$location', 'AttachementService', '$window', 'CrudService', 'MessageHandlerService',
    'EntityService', '$translate', 'BreadCrumbService'];

  function affectationController($rootScope, $routeParams, $location, AttachementService, $window,
                               CrudService, MessageHandlerService, EntityService, $translate, BreadCrumbService) {

    var vm = this;

    vm.noCache = true;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.searchText = "";

    vm.view = view;
    vm.selectFkRole = selectFkRole;
    vm.selectUorg = selectUorg;
    vm.addAnother = addAnother;
    vm.create = create;
    vm.edit = edit;
    vm.save = save;
    vm.delete = deleteAffectation;
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

      EntityService.setServicePath("admin/affectation");
      EntityService.view($routeParams.id)
        .then(function (data) {
          vm.affectation = data;


          /* Fill breadcrumb */
          var addOnString = vm.affectation.name;
          var view = {id: "button.view", url: "#/pages/admin/affectation/detail_affectation/" + vm.affectation.id};
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

    function selectFkRole(item) {
      if (angular.isDefined(item))
        vm.affectation.refFkRole = item.originalObject;
    };
    function selectUorg(item) {
      if (angular.isDefined(item))
        vm.affectation.refUorg = item.originalObject;
    };


    function create(affectation) {

      formatEntity(affectation);
	  EntityService.setServicePath("admin/affectation");
      EntityService.create(affectation)
        .then(function (data) {
            vm.affectation = data;
            formatEntity(vm.affectation);
            CrudService.setMode(CrudService.createMode());

            /* Fill breadcrumb */
            var addOnString = vm.affectation.id;
            var view = {id: "button.view", url: "#/pages/admin/affectation/detail_affectation/" + vm.affectation.id};
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
      var add = {id: "button.add", url: "#/pages/admin/affectation/add_affectation"};
      BreadCrumbService.pop();
      BreadCrumbService.push(add);
      BreadCrumbService.appendAddOn("Affectation");
      $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

      CrudService.setMode(CrudService.addMode());
      reload();
      init();
    };

    function edit(id) {

      EntityService.setServicePath("admin/affectation");
      EntityService.edit(id)
        .then(function (data) {
            vm.affectation = data;


            formatEntity(vm.affectation);

            /* Fill breadcrumb */
            var addOnString = vm.affectation.id;
            var edit = {id: "button.edit", url: "#/pages/admin/affectation/edit_affectation/" + vm.affectation.id};
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

    function save(affectation) {

      formatEntity(affectation);

      EntityService.setServicePath("admin/affectation");
      EntityService.save(affectation)
        .then(function (data) {
            vm.affectation = data;
            formatEntity(vm.affectation);
            CrudService.setMode(CrudService.saveMode());

            /* Fill breadcrumb */
            var addOnString = vm.affectation.id;
            var view = {id: "button.view", url: "#/pages/admin/affectation/detail_affectation/" + vm.affectation.id};
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

    function deleteAffectation(id) {

      EntityService.setServicePath("admin/affectation");
      EntityService.delete(id)
        .then(function (status) {
            MessageHandlerService.displayInfoMessage(entityDeletedMsg);

            /* Fill breadcrumb */
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            $location.path("#/pages/admin/affectation/recherche_affectation");
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
        vm.search(vm.affectation);
    };

    /*
     * Search function with criteria
     */
    function search(affectation) {

      vm.searchOK = false;

      EntityService.setServicePath("admin/affectation");
      EntityService.search(vm.currentPage, vm.pageSize, affectation)
        .then(function (data) {
            vm.affectations = data.listItems;
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

      EntityService.setServicePath("admin/affectation");
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
      if (angular.isDefined(vm.affectation))
        return vm.affectation.id;
      return "affectation";
    }


    /*
     * out of scope functions
     */



    function loadFkRoles() {
      EntityService.setServicePath("admin/role");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.fkRoles = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }


    function loadUorgs() {
      EntityService.setServicePath("admin/uorg");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.uorgs = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }



     
    var formatEntity = function (data) {
          var affectation = data;
      
      

      

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
        vm.affectation = new Object();
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

      loadFkRoles();
      loadUorgs();





      if (typeof($routeParams.id) != 'undefined') {
        if ($rootScope.nextUrl.endsWith("detail_affectation/" + $routeParams.id))
          vm.view($routeParams.id);
        if ($rootScope.nextUrl.endsWith("edit_affectation/" + $routeParams.id))
          vm.edit($routeParams.id);
        if ($rootScope.nextUrl.endsWith("delete_affectation/" + $routeParams.id))
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

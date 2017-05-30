
(function() {
  angular.module("sample").controller("LigneFactureController", ligneFactureController);

  ligneFactureController.$inject = ['$rootScope', '$routeParams', '$location', 'AttachementService', '$window', 'CrudService', 'MessageHandlerService',
    'EntityService', '$translate', 'BreadCrumbService'];

  function ligneFactureController($rootScope, $routeParams, $location, AttachementService, $window,
                               CrudService, MessageHandlerService, EntityService, $translate, BreadCrumbService) {

    var vm = this;

    vm.noCache = true;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.searchText = "";

    vm.view = view;
    vm.addAnother = addAnother;
    vm.create = create;
    vm.edit = edit;
    vm.save = save;
    vm.delete = deleteLigneFacture;
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

      EntityService.setServicePath("facture/ligneFacture");
      EntityService.view($routeParams.id)
        .then(function (data) {
          vm.ligneFacture = data;


          /* Fill breadcrumb */
          var addOnString = vm.ligneFacture.name;
          var view = {id: "button.view", url: "#/pages/facture/ligneFacture/detail_ligneFacture/" + vm.ligneFacture.id};
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



    function create(ligneFacture) {

      formatEntity(ligneFacture);
	  EntityService.setServicePath("facture/ligneFacture");
      EntityService.create(ligneFacture)
        .then(function (data) {
            vm.ligneFacture = data;
            formatEntity(vm.ligneFacture);
            CrudService.setMode(CrudService.createMode());

            /* Fill breadcrumb */
            var addOnString = vm.ligneFacture.id;
            var view = {id: "button.view", url: "#/pages/facture/ligneFacture/detail_ligneFacture/" + vm.ligneFacture.id};
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
      var add = {id: "button.add", url: "#/pages/facture/ligneFacture/add_ligneFacture"};
      BreadCrumbService.pop();
      BreadCrumbService.push(add);
      BreadCrumbService.appendAddOn("LigneFacture");
      $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

      CrudService.setMode(CrudService.addMode());
      reload();
      init();
    };

    function edit(id) {

      EntityService.setServicePath("facture/ligneFacture");
      EntityService.edit(id)
        .then(function (data) {
            vm.ligneFacture = data;


            formatEntity(vm.ligneFacture);

            /* Fill breadcrumb */
            var addOnString = vm.ligneFacture.id;
            var edit = {id: "button.edit", url: "#/pages/facture/ligneFacture/edit_ligneFacture/" + vm.ligneFacture.id};
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

    function save(ligneFacture) {

      formatEntity(ligneFacture);

      EntityService.setServicePath("facture/ligneFacture");
      EntityService.save(ligneFacture)
        .then(function (data) {
            vm.ligneFacture = data;
            formatEntity(vm.ligneFacture);
            CrudService.setMode(CrudService.saveMode());

            /* Fill breadcrumb */
            var addOnString = vm.ligneFacture.id;
            var view = {id: "button.view", url: "#/pages/facture/ligneFacture/detail_ligneFacture/" + vm.ligneFacture.id};
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

    function deleteLigneFacture(id) {

      EntityService.setServicePath("facture/ligneFacture");
      EntityService.delete(id)
        .then(function (status) {
            MessageHandlerService.displayInfoMessage(entityDeletedMsg);

            /* Fill breadcrumb */
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            $location.path("#/pages/facture/ligneFacture/recherche_ligneFacture");
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
        vm.search(vm.ligneFacture);
    };

    /*
     * Search function with criteria
     */
    function search(ligneFacture) {

      vm.searchOK = false;

      EntityService.setServicePath("facture/ligneFacture");
      EntityService.search(vm.currentPage, vm.pageSize, ligneFacture)
        .then(function (data) {
            vm.ligneFactures = data.listItems;
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

      EntityService.setServicePath("facture/ligneFacture");
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
      if (angular.isDefined(vm.ligneFacture))
        return vm.ligneFacture.id;
      return "ligneFacture";
    }


    /*
     * out of scope functions
     */




     
    var formatEntity = function (data) {
          var ligneFacture = data;
      
      

      

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
        vm.ligneFacture = new Object();
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






      if (typeof($routeParams.id) != 'undefined') {
        if ($rootScope.nextUrl.endsWith("detail_ligneFacture/" + $routeParams.id))
          vm.view($routeParams.id);
        if ($rootScope.nextUrl.endsWith("edit_ligneFacture/" + $routeParams.id))
          vm.edit($routeParams.id);
        if ($rootScope.nextUrl.endsWith("delete_ligneFacture/" + $routeParams.id))
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

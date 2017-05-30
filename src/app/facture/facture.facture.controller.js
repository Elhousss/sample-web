
(function() {
  angular.module("sample").controller("FactureController", factureController);

  factureController.$inject = ['$rootScope', '$routeParams', '$location', 'AttachementService', '$window', 'CrudService', 'MessageHandlerService',
    'EntityService', '$translate', 'BreadCrumbService'];

  function factureController($rootScope, $routeParams, $location, AttachementService, $window,
                               CrudService, MessageHandlerService, EntityService, $translate, BreadCrumbService) {

    var vm = this;

    vm.noCache = true;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.searchText = "";

    vm.view = view;
    vm.selectClient = selectClient;
    vm.selectUtilisateurCreation = selectUtilisateurCreation;
    vm.selectUorgCreation = selectUorgCreation;
    vm.addAnother = addAnother;
    vm.create = create;
    vm.edit = edit;
    vm.save = save;
    vm.delete = deleteFacture;
    vm.searchPageChanged = searchPageChanged;
    vm.search = search;
    vm.cancelEdit = cancelEdit;

    vm.addLigneFacture = addLigneFacture;
    vm.removeLigneFacture = removeLigneFacture;
    vm.editLigneFacture = editLigneFacture;
    vm.clearLigneFacture = clearLigneFacture;
    vm.ligneFactureTracker = ligneFactureTracker;



    vm.back = back;
    vm.toString = toString;
    vm.openDateFacture = openDateFacture;
    vm.openDateEmissionFacture = openDateEmissionFacture;
    vm.openDateLastUpdate = openDateLastUpdate;
    vm.openDateEcheance = openDateEcheance;
    vm.openDatePaiement = openDatePaiement;

    var entityCreatedMsg = "";
    var sessionExpiredMsg = "";
    var entitySavedMsg = "";
    var entityDeletedMsg = "";

    activate();


    ////////////////////////////////////////////////////////////////////////////////


    function view(id) {

      EntityService.setServicePath("facture/facture");
      EntityService.view($routeParams.id)
        .then(function (data) {
          vm.facture = data;


          /* Fill breadcrumb */
          var addOnString = vm.facture.name;
          var view = {id: "button.view", url: "#/pages/facture/facture/detail_facture/" + vm.facture.id};
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

    function selectClient(item) {
      if (angular.isDefined(item))
        vm.facture.refClient = item.originalObject;
    };
    function selectUtilisateurCreation(item) {
      if (angular.isDefined(item))
        vm.facture.refUtilisateurCreation = item.originalObject;
    };
    function selectUorgCreation(item) {
      if (angular.isDefined(item))
        vm.facture.refUorgCreation = item.originalObject;
    };


    function create(facture) {

      formatEntity(facture);
	  EntityService.setServicePath("facture/facture");
      EntityService.create(facture)
        .then(function (data) {
            vm.facture = data;
            formatEntity(vm.facture);
            CrudService.setMode(CrudService.createMode());

            /* Fill breadcrumb */
            var addOnString = vm.facture.id;
            var view = {id: "button.view", url: "#/pages/facture/facture/detail_facture/" + vm.facture.id};
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
      AttachementService.clearDocuments();

      /* Fill breadcrumb */
      var add = {id: "button.add", url: "#/pages/facture/facture/add_facture"};
      BreadCrumbService.pop();
      BreadCrumbService.push(add);
      BreadCrumbService.appendAddOn("Facture");
      $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

      CrudService.setMode(CrudService.addMode());
      reload();
      init();
    };

    function edit(id) {

      EntityService.setServicePath("facture/facture");
      EntityService.edit(id)
        .then(function (data) {
            vm.facture = data;

            vm.ligneFacture = new Object();

            formatEntity(vm.facture);

            /* Fill breadcrumb */
            var addOnString = vm.facture.id;
            var edit = {id: "button.edit", url: "#/pages/facture/facture/edit_facture/" + vm.facture.id};
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

    function save(facture) {

      formatEntity(facture);

      EntityService.setServicePath("facture/facture");
      EntityService.save(facture)
        .then(function (data) {
            vm.facture = data;
            formatEntity(vm.facture);
            CrudService.setMode(CrudService.saveMode());

            /* Fill breadcrumb */
            var addOnString = vm.facture.id;
            var view = {id: "button.view", url: "#/pages/facture/facture/detail_facture/" + vm.facture.id};
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

    function deleteFacture(id) {

      EntityService.setServicePath("facture/facture");
      EntityService.delete(id)
        .then(function (status) {
            MessageHandlerService.displayInfoMessage(entityDeletedMsg);

            /* Fill breadcrumb */
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            $location.path("#/pages/facture/facture/recherche_facture");
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
        vm.search(vm.facture);
    };

    /*
     * Search function with criteria
     */
    function search(facture) {

      vm.searchOK = false;

      EntityService.setServicePath("facture/facture");
      EntityService.search(vm.currentPage, vm.pageSize, facture)
        .then(function (data) {
            vm.factures = data.listItems;
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

      EntityService.setServicePath("facture/facture");
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


function addLigneFacture(ligneFacture) {

  if (!angular.isDefined(vm.facture.refsLigneFacture) || vm.facture.refsLigneFacture == null)
    vm.facture.refsLigneFacture = [];


  var v = jQuery.extend(true, {}, ligneFacture);
  v.idx = vm.facture.refsLigneFacture.length;
  vm.facture.refsLigneFacture.push(v);
};

function removeLigneFacture(ligneFacture) {

  if (!angular.isDefined(vm.facture.refsLigneFacture)
    || vm.facture.refsLigneFacture == null
    || vm.facture.refsLigneFacture.length == 0)
    return;

  var index = vm.facture.refsLigneFacture.indexOf(ligneFacture);
  if (index > -1) {
    vm.facture.refsLigneFacture.splice(index, 1);
  }
}

function editLigneFacture(ligneFacture) {

  if (!angular.isDefined(vm.facture.refsLigneFacture)
    || vm.facture.refsLigneFacture == null
    || vm.facture.refsLigneFacture.length == 0)
    return;

  vm.ligneFacture = {};
  vm.ligneFacture = ligneFacture;
}

function clearLigneFacture() {
  vm.ligneFacture = new Object();
};

vm.saveLigneFacture = function (ligneFacture) {

  if (!angular.isDefined(vm.facture.refsFormation)
    || vm.facture.refsLigneFacture == null
    || vm.facture.refsLigneFacture.length == 0)
    return;

  ligneFacture = vm.ligneFacture;
}

function ligneFactureTracker(f) {
  if (angular.isDefined(f.idx)) {
    return f.idx;
  }
  else {
    return f.id;
  }
}




    function back() {
      $window.history.back();
    }

    function toString() {
      if (angular.isDefined(vm.facture))
        return vm.facture.id;
      return "facture";
    }

    function openDateFacture() {
      vm.dateFactureOpened = true;
    }
    function openDateEmissionFacture() {
      vm.dateEmissionFactureOpened = true;
    }
    function openDateLastUpdate() {
      vm.dateLastUpdateOpened = true;
    }
    function openDateEcheance() {
      vm.dateEcheanceOpened = true;
    }
    function openDatePaiement() {
      vm.datePaiementOpened = true;
    }

    /*
     * out of scope functions
     */






    function loadClients() {
      EntityService.setServicePath("facture/client");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.clients = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }


    function loadUtilisateurCreations() {
      EntityService.setServicePath("admin/utilisateur");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.utilisateurCreations = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }


    function loadUorgCreations() {
      EntityService.setServicePath("admin/uorg");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.uorgCreations = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }



    function loadLivrables() {
      EntityService.setServicePath("facture/livrable");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.livrables = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }



    var formatEntity = function (data) {
          var facture = data;

      	  delete facture.refUtilisateurCreation;
          delete facture.refUorgCreation;

      	  if (angular.isDefined(facture.refClient) && facture.refClient != null) {
	      	  delete facture.refClient.refUtilisateurCreation;
	      	  delete facture.refClient.refUorgCreation;
      	  }

          if (angular.isDefined(facture.refsLigneFacture) && facture.refsLigneFacture != null && facture.refsLigneFacture.length > 0) {
            for (var i = 0; i < facture.refsLigneFacture.length; i++) {
              delete facture.refsLigneFacture[i].idx;
            }
          }

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
        vm.facture = new Object();
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

      loadClients();
      loadUtilisateurCreations();
      loadUorgCreations();

      loadLivrables();







      if (typeof($routeParams.id) != 'undefined') {
        if ($rootScope.nextUrl.endsWith("detail_facture/" + $routeParams.id))
          vm.view($routeParams.id);
        if ($rootScope.nextUrl.endsWith("edit_facture/" + $routeParams.id))
          vm.edit($routeParams.id);
        if ($rootScope.nextUrl.endsWith("delete_facture/" + $routeParams.id))
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

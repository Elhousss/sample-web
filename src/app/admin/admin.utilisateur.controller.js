
(function() {
  angular.module("sample").controller("UtilisateurController", utilisateurController);

  utilisateurController.$inject = ['$rootScope', '$routeParams', '$location', 'AttachementService', '$window', 'CrudService', 'MessageHandlerService',
    'EntityService', '$translate', 'BreadCrumbService'];

  function utilisateurController($rootScope, $routeParams, $location, AttachementService, $window,
                               CrudService, MessageHandlerService, EntityService, $translate, BreadCrumbService) {

    var vm = this;

    vm.noCache = true;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.searchText = "";

    vm.view = view;
    vm.selectUniteConnectee = selectUniteConnectee;
    vm.addAnother = addAnother;
    vm.create = create;
    vm.edit = edit;
    vm.save = save;
    vm.delete = deleteUtilisateur;
    vm.searchPageChanged = searchPageChanged;
    vm.search = search;
    vm.cancelEdit = cancelEdit;
    
    vm.addAffectation = addAffectation;
    vm.removeAffectation = removeAffectation;
    vm.editAffectation = editAffectation;
    vm.clearAffectation = clearAffectation;
    vm.affectationTracker = affectationTracker;

	vm.loadFkRoleAffectations = loadFkRoleAffectations;
	vm.loadUorgAffectations = loadUorgAffectations;
	

    vm.back = back;
    vm.toString = toString;

    var entityCreatedMsg = "";
    var sessionExpiredMsg = "";
    var entitySavedMsg = "";
    var entityDeletedMsg = "";

    activate();


    ////////////////////////////////////////////////////////////////////////////////


    function view(id) {

      EntityService.setServicePath("admin/utilisateur");
      EntityService.view($routeParams.id)
        .then(function (data) {
          vm.utilisateur = data;


          /* Fill breadcrumb */
          var addOnString = vm.utilisateur.name;
          var view = {id: "button.view", url: "#/pages/admin/utilisateur/detail_utilisateur/" + vm.utilisateur.id};
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

    function selectUniteConnectee(item) {
      if (angular.isDefined(item))
        vm.utilisateur.refUniteConnectee = item.originalObject;
    };


    function create(utilisateur) {

      formatEntity(utilisateur);
	  EntityService.setServicePath("admin/utilisateur");
      EntityService.create(utilisateur)
        .then(function (data) {
            vm.utilisateur = data;
            formatEntity(vm.utilisateur);
            CrudService.setMode(CrudService.createMode());

            /* Fill breadcrumb */
            var addOnString = vm.utilisateur.id;
            var view = {id: "button.view", url: "#/pages/admin/utilisateur/detail_utilisateur/" + vm.utilisateur.id};
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
      var add = {id: "button.add", url: "#/pages/admin/utilisateur/add_utilisateur"};
      BreadCrumbService.pop();
      BreadCrumbService.push(add);
      BreadCrumbService.appendAddOn("Utilisateur");
      $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

      CrudService.setMode(CrudService.addMode());
      reload();
      init();
    };

    function edit(id) {

      EntityService.setServicePath("admin/utilisateur");
      EntityService.edit(id)
        .then(function (data) {
            vm.utilisateur = data;

            vm.affectation = new Object();

            formatEntity(vm.utilisateur);

            /* Fill breadcrumb */
            var addOnString = vm.utilisateur.id;
            var edit = {id: "button.edit", url: "#/pages/admin/utilisateur/edit_utilisateur/" + vm.utilisateur.id};
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

    function save(utilisateur) {

      formatEntity(utilisateur);

      EntityService.setServicePath("admin/utilisateur");
      EntityService.save(utilisateur)
        .then(function (data) {
            vm.utilisateur = data;
            formatEntity(vm.utilisateur);
            CrudService.setMode(CrudService.saveMode());

            /* Fill breadcrumb */
            var addOnString = vm.utilisateur.id;
            var view = {id: "button.view", url: "#/pages/admin/utilisateur/detail_utilisateur/" + vm.utilisateur.id};
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

    function deleteUtilisateur(id) {

      EntityService.setServicePath("admin/utilisateur");
      EntityService.delete(id)
        .then(function (status) {
            MessageHandlerService.displayInfoMessage(entityDeletedMsg);

            /* Fill breadcrumb */
            BreadCrumbService.pop();
            $rootScope.breadcrumb = BreadCrumbService.getBreadCrumbStack();

            $location.path("#/pages/admin/utilisateur/recherche_utilisateur");
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
        vm.search(vm.utilisateur);
    };

    /*
     * Search function with criteria
     */
    function search(utilisateur) {

      vm.searchOK = false;

      EntityService.setServicePath("admin/utilisateur");
      EntityService.search(vm.currentPage, vm.pageSize, utilisateur)
        .then(function (data) {
            vm.utilisateurs = data.listItems;
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

      EntityService.setServicePath("admin/utilisateur");
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


function addAffectation(affectation) {

  if (!angular.isDefined(vm.utilisateur.refsAffectation) || vm.utilisateur.refsAffectation == null)
    vm.utilisateur.refsAffectation = [];

  if (!angular.isDefined(vm.fkRoleAffectations) || vm.fkRoleAffectations == null)
    return;

  for (var i = 0; i < vm.fkRoleAffectations.length; i++) {
    if (affectation.refFkRole.id == vm.fkRoleAffectations[i].id) {
      affectation.refFkRole = jQuery.extend(true, {}, vm.fkRoleAffectations[i]);
      break;
    }
  }
  if (!angular.isDefined(vm.uorgAffectations) || vm.uorgAffectations == null)
    return;

  for (var i = 0; i < vm.uorgAffectations.length; i++) {
    if (affectation.refUorg.id == vm.uorgAffectations[i].id) {
      affectation.refUorg = jQuery.extend(true, {}, vm.uorgAffectations[i]);
      break;
    }
  }

  var v = jQuery.extend(true, {}, affectation);
  v.idx = vm.utilisateur.refsAffectation.length;
  vm.utilisateur.refsAffectation.push(v);
};

function removeAffectation(affectation) {

  if (!angular.isDefined(vm.utilisateur.refsAffectation)
    || vm.utilisateur.refsAffectation == null
    || vm.utilisateur.refsAffectation.length == 0)
    return;

  var index = vm.utilisateur.refsAffectation.indexOf(affectation);
  if (index > -1) {
    vm.utilisateur.refsAffectation.splice(index, 1);
  }
}

function editAffectation(affectation) {

  if (!angular.isDefined(vm.utilisateur.refsAffectation)
    || vm.utilisateur.refsAffectation == null
    || vm.utilisateur.refsAffectation.length == 0)
    return;

  vm.affectation = {};
  vm.affectation = affectation;
}

function clearAffectation() {
  vm.affectation = new Object();
};

vm.saveAffectation = function (affectation) {

  if (!angular.isDefined(vm.utilisateur.refsFormation)
    || vm.utilisateur.refsAffectation == null
    || vm.utilisateur.refsAffectation.length == 0)
    return;

  affectation = vm.affectation;
}

function affectationTracker(f) {
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
      if (angular.isDefined(vm.utilisateur))
        return vm.utilisateur.id;
      return "utilisateur";
    }


    /*
     * out of scope functions
     */

    

    function loadFkRoleAffectations() {
      "use strict";
      EntityService.setServicePath("admin/role");
      EntityService.searchAll()
        .then(function (data) {
            vm.fkRoleAffectations = data.listItems;
          }
          , function (reason) {
            MessageHandlerService.displayErrorMessage(reason);
          });
    }


    function loadUorgAffectations() {
      "use strict";
      EntityService.setServicePath("admin/uorg");
      EntityService.searchAll()
        .then(function (data) {
            vm.uorgAffectations = data.listItems;
          }
          , function (reason) {
            MessageHandlerService.displayErrorMessage(reason);
          });
    }





    function loadUniteConnectees() {
      EntityService.setServicePath("admin/uorg");
      EntityService.searchAll()
        .then (function (data) {
          "use strict";
          vm.uniteConnectees = data.listItems;
        }, function (statusText) {
          "use strict";
          if (statusText == "OK")
            MessageHandlerService.displayErrorMessage(sessionExpiredMsg);
          else
            MessageHandlerService.displayErrorMessage(statusText);
        });
    }



     
    var formatEntity = function (data) {
          var utilisateur = data;
      
      

      
		    for(var i=0; i<utilisateur.refsAffectation.length; i++) {
		  		delete utilisateur.refsAffectation[i].idx;
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
        vm.utilisateur = new Object();
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

      loadUniteConnectees();



      loadFkRoleAffectations();
      loadUorgAffectations();





      if (typeof($routeParams.id) != 'undefined') {
        if ($rootScope.nextUrl.endsWith("detail_utilisateur/" + $routeParams.id))
          vm.view($routeParams.id);
        if ($rootScope.nextUrl.endsWith("edit_utilisateur/" + $routeParams.id))
          vm.edit($routeParams.id);
        if ($rootScope.nextUrl.endsWith("delete_utilisateur/" + $routeParams.id))
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

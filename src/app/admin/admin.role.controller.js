/**
 * Created by Asebban on 25/02/2016.
 */
angular.module("sample").controller("RoleController", function ($scope, $rootScope, $routeParams, $location, AttachementService,ivhTreeviewMgr,
                                                                  $window, CrudService, MessageHandlerService, EntityService, TreeService) {

    if(!Array.prototype.contains) {
        Array.prototype.contains = function(k) {
            for(var i=0; i < this.length; i++){
                if(this[i].id === k.id){
                    return true;
                }
            }
            return false;
        }
    };

    $scope.noCache = true;
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.searchText = "";    

	$scope.view = view;
	$scope.create = create;
	$scope.addAnother = addAnother;
	$scope.edit = edit;
	$scope.save = save;
	$scope.delete  = deleteRole;	
	$scope.searchPageChanged = searchPageChanged;  
	$scope.load = load;
	$scope.search = search;
	$scope.cancelEdit = cancelEdit;
	$scope.back = back; 
	$scope.toggeled = toggeled;
	$scope.selected = selected; 
	$scope.clicked = clicked;
		
	activate();

    function view (id) {

        EntityService.setServicePath("admin/role");
        EntityService.view($routeParams.id)
            .then(function (data) {
                $scope.role = data;
                CrudService.setMode(CrudService.detailMode());
                reload();
                TreeService.loadChildren(0)
                    .then(function(data){
                        $scope.tree = data;
                        if ($scope.role && $scope.role.refsFkAction && $scope.role.refsFkAction != null && $scope.role.refsFkAction.length > 0) {
                            for (var i = 0; i < $scope.tree.length; i++) {
                                if (actionsContains($scope.role.refsFkAction, $scope.tree[i])) {
                                    $scope.tree[i].checked = true;
                                }
                            }
                        }
                    }, function(reason){
                        MessageHandlerService.displayErrorMessage(reason);
                    });

            }, function (statusText) {
                if (statusText == "OK")
                    MessageHandlerService.displayErrorMessage("Votre session a expiré. Veuillez vous reconnecter");
                else
                    MessageHandlerService.displayErrorMessage(statusText);
            });
    };

    function create(role)
    {
        role.tree = $scope.tree;
        formatEntity(role);
        EntityService.setServicePath("/admin/role");
        EntityService.create(role)
            .then(function (data) {
                    $scope.role = data;
                    formatEntity($scope.role);
                    CrudService.setMode(CrudService.createMode());
                    MessageHandlerService.displayInfoMessage("Entité créée avec succès");
                    reload();
                },
                function (reason) {
                    if (reason == "OK")
                        MessageHandlerService.displayErrorMessage("votre session a expiré. Veuillez vous reconnecter");
                    else
                        MessageHandlerService.displayErrorMessage(reason);
                });

    }
    ;

    function addAnother() {
        /* Générer un ID unique pour indexer les eventuels documents attachés */
        AttachementService.clearDocuments();
        CrudService.setMode(CrudService.addMode());
        reload();
        init();
    };

    function edit(id) {

        EntityService.setServicePath("admin/role");
        EntityService.edit(id)
            .then(function (data) {
                    CrudService.setMode(CrudService.editMode());
                    $scope.role = data;
                    TreeService.loadChildren(0)
                        .then(function(data){
                            $scope.tree = data;
                            if ($scope.role && $scope.role.refsFkAction && $scope.role.refsFkAction != null && $scope.role.refsFkAction.length > 0) {
                                for (var i = 0; i < $scope.tree.length; i++) {
                                    if (actionsContains($scope.role.refsFkAction, $scope.tree[i])) {
                                        $scope.tree[i].checked = true;
                                    }
                                }
                            }
                        }, function(reason){
                            MessageHandlerService.displayErrorMessage(reason);
                        });
                    reload();
                }
                , function (reason) {
                    MessageHandlerService.displayErrorMessage(reason);
                });
    };

    function save(role) {

        role.tree = $scope.tree;
        formatEntity(role);

        EntityService.setServicePath("admin/role");
        EntityService.save(role)
            .then(function (data) {
                    $scope.role = data;
                    formatEntity($scope.role);
                    CrudService.setMode(CrudService.saveMode());
                    MessageHandlerService.displayInfoMessage("Entité mise à jour avec succès");
                    reload();
                }
                , function (reason) {
                    MessageHandlerService.displayErrorMessage(reason);
                });
    };

    function deleteRole(id) {

        EntityService.setServicePath("admin/role");
        EntityService.delete(id)
            .then(function (status) {
                    MessageHandlerService.displayInfoMessage("Entité supprimée avec succès");
                    $location.path("/");
                }
                , function (reason) {
                    MessageHandlerService.displayErrorMessage(reason);
                });
    };

    function searchPageChanged(currentPage) {
        $scope.currentPage = currentPage;
        $scope.search($scope.role);
    };

    function load() {
        var role = {};
        EntityService.setServicePath("admin/role");
        EntityService.searchAll(role)
            .then(function (data) {
                    $scope.roles = data.listItems;
                    $scope.searchOK = true;
                }
                , function (reason) {
                    MessageHandlerService.displayErrorMessage(reason);
                    $scope.searchOK = false;
                });
    };

    function search(role)
    {
        $scope.searchOK = false;

        EntityService.setServicePath("admin/role");
        EntityService.search($scope.currentPage, $scope.pageSize, role)
            .then(function (data) {
                    $scope.roles = data.listItems;
                    $scope.count = data.count;
                    $scope.npages = CrudService.getNumPages($scope.count, $scope.pageSize);
                    $scope.searchOK = true;
                }
                , function (reason) {
                    MessageHandlerService.displayErrorMessage(reason);
                    $scope.searchOK = false;
                });

    };

    function cancelEdit(id) {

        EntityService.setServicePath("admin/role");
        EntityService.cancelEdit(id)
            .then(function (data) {
                    CrudService.setMode(CrudService.saveMode());
                    reload();
                }
                , function (reason) {
                    MessageHandlerService.displayErrorMessage(reason);
                });
    };

    function formatEntity(role) {

        if (role && role != null && role.refsFkAction && role.refsFkAction != null && role.refsFkAction.length > 0) {
            for(var i=0; i<role.refsFkAction.length; i++) {
              delete role.refsFkAction[i].refActionParent;
            }
        }

        if (role && role != null && role.tree && role.tree != null && role.tree.length > 0) {
            var tree = role.tree;
            for(var i=0; i<tree.length; i++) {
                formatNode(tree[i]);
            }
        }
    };

    function formatNode(node) {
        if (node && node != null && node.children && node.children.length > 0){
            for(var i=0; i<node.children.length; i++)
                formatNode(node.children[i]);
        }
    };

    function back() {
        $window.history.back();
    }


    function toggeled(ivhNode, ivhIsExpanded, ivhTree) {
      "use strict";

      console.log("Noeud "+ivhNode.actionName+" toggeled")

    };

	function selected(ivhNode, ivhIsSelected, ivhTree) {
	  "use strict";
	
	  if (ivhIsSelected) {
	    ivhNode.touched = 1;
	  }
	  else {
	    ivhNode.touched = -1;
	  }
    };

    function clicked(ivhNode) {
      "use strict";

      if (ivhNode.children && ivhNode.children != null && ivhNode.children.length > 0) {
        return;
     }

     TreeService.loadChildren(ivhNode.actionId)
     .then(
        function(data){

          var someAreChecked = false;
          var someArentChecked = false;

          ivhNode.children = data;
          if (ivhNode.children && ivhNode.children != null && ivhNode.children.length > 0) {
            for(var i=0; i<ivhNode.children.length; i++) {
              ivhNode.children[i].touched = 0;
              if (actionsContains($scope.role.refsFkAction, ivhNode.children[i])) {
                ivhNode.children[i].checked = true;
                someAreChecked = true;
              }
              else {
                if ($rootScope.nextUrl.endsWith("recherche_role/" + $routeParams.id) ||
                  $rootScope.nextUrl.endsWith("edit_role/" + $routeParams.id)) {

                  ivhNode.children[i].checked = false;
                  someArentChecked = true;
                }
              }
            }

            if (someAreChecked && someArentChecked) {
              ivhNode.indeterminate = true;
            }

            ivhTreeviewMgr.expand($scope.tree, ivhNode, true);

          }
        },
        function(reason){
          MessageHandlerService.displayErrorMessage(reason);
        });
    };

	function activate() {
	    if (typeof($routeParams.id) != 'undefined') {
	
	        if ($rootScope.nextUrl.endsWith("add_role/" + $routeParams.id))
	            $scope.view($routeParams.id);
	        if ($rootScope.nextUrl.endsWith("recherche_role/" + $routeParams.id))
	            $scope.view($routeParams.id);
	        if ($rootScope.nextUrl.endsWith("detail_role/" + $routeParams.id))
	            $scope.view($routeParams.id);
	        if ($rootScope.nextUrl.endsWith("edit_role/" + $routeParams.id))
	            $scope.edit($routeParams.id);
	        if ($rootScope.nextUrl.endsWith("delete_role/" + $routeParams.id))
	            $scope.delete($routeParams.id);
	
	        TreeService.loadChildren($routeParams.id)
	            .then(function(data){
	
	                $scope.tree = data;
	                if ($scope.role && $scope.role.refsFkAction && $scope.role.refsFkAction != null && $scope.role.refsFkAction.length > 0) {
	                    for (var i = 0; i < $scope.tree.length; i++) {
	                        if (actionsContains($scope.role.refsFkAction, $scope.tree[i])) {
	                            $scope.tree[i].checked = true;
	                        }
	                    }
	                }
	            }, function(reason){
	                MessageHandlerService.displayErrorMessage(reason);
	            });
	
	    }
	    else {
	        init();
	        CrudService.setMode(CrudService.initMode());
	        reload();
	        TreeService.loadChildren(0)
	            .then(function(data){
	                $scope.tree = data;
	            }, function(reason){
	                MessageHandlerService.displayErrorMessage(reason);
	            });
	    }
	};


    function reload() {
        $scope.createEnabled = CrudService.isCreateEnabled();
        $scope.addEnabled = CrudService.isAddEnabled();
        $scope.cancelEnabled = CrudService.isCancelEnabled();
        $scope.editEnabled = CrudService.isEditEnabled();
        $scope.saveEnabled = CrudService.isSaveEnabled();
        $scope.deleteEnabled = CrudService.isDeleteEnabled();
        $scope.backEnabled = CrudService.isBackEnabled();
        $scope.disable = CrudService.isDisable();
        $scope.mode = CrudService.getCurrentMode();
    };

    function init() {
            $scope.role = new Object();
    };

    function actionsContains(array, value) {
        if (!array || array.length == 0)
            return false;
        for(var i=0;i<array.length;i++) {
            if (array[i].id == value.actionId) {
                return true;
            }
        }
        return false;
    }
    
});

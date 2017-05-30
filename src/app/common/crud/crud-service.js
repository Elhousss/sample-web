(function() {
  angular.module("crud", []);
  angular.module("crud").factory("CrudService", crudService);

    function crudService($rootScope) {

      var INIT = "init";
      var ADD = "add";
      var EDIT = "edit";
      var DETAIL = "detail";
      var SEARCH = "search";

      var currentMode = INIT;

      var createEnabled = true;
      var addEnabled = false;
      var editEnabled = false;
      var saveEnabled = false;
      var deleteEnabled = false;
      var cancelEnabled = false;
      var searchEnabled = false;
      var backEnabled = false;
      var disable = false;

      var service = {
        setMode : setMode,
        resetObject : resetObject,
        initMode : initMode,
        createMode : createMode,
        addMode : addMode,
        editMode : editMode,
        saveMode : saveMode,
        resetObject : resetObject,
        deleteMode : deleteMode,
        detailMode : detailMode,
        searchMode : searchMode,
        isCreateEnabled : isCreateEnabled,
        isEditEnabled : isEditEnabled,
        isSaveEnabled : isSaveEnabled,
        isAddEnabled : isAddEnabled,
        isDeleteEnabled : isDeleteEnabled,
        isCancelEnabled : isCancelEnabled,
        isBackEnabled : isBackEnabled,
        isDisable : isDisable,
        getNumPages : getNumPages,
        getCurrentMode : getCurrentMode
      };

      return service;

      function setMode(mode) {
        if (mode == INIT) {
          createEnabled = true;
          addEnabled = false;
          editEnabled = false;
          saveEnabled = false;
          deleteEnabled = false;
          cancelEnabled = false;
          searchEnabled = false;
          disable = false;
          backEnabled = false;
          currentMode = mode;
          $rootScope.screenMode = mode;
        }
        if (mode == DETAIL) {
          createEnabled = false;
          addEnabled = true;
          editEnabled = true;
          saveEnabled = false;
          deleteEnabled = true;
          cancelEnabled = false;
          searchEnabled = false;
          backEnabled = true;
          disable = true;
          currentMode = mode;
          $rootScope.screenMode = mode;
        }
        if (mode == EDIT) {
          createEnabled = false;
          addEnabled = false;
          editEnabled = false;
          saveEnabled = true;
          deleteEnabled = false;
          cancelEnabled = true;
          searchEnabled = false;
          backEnabled = true;
          disable = false;
          currentMode = mode;
          $rootScope.screenMode = mode;
        }
        if (mode == ADD) {
          createEnabled = true;
          addEnabled = false;
          editEnabled = false;
          saveEnabled = false;
          deleteEnabled = false;
          cancelEnabled = false;
          searchEnabled = false;
          backEnabled = true;
          disable = false;
          currentMode = mode;
          $rootScope.screenMode = mode;
        }
        if (mode == SEARCH) {
          createEnabled = false;
          addEnabled = false;
          editEnabled = false;
          saveEnabled = false;
          deleteEnabled = false;
          cancelEnabled = false;
          searchEnabled = true;
          backEnabled = false;
          disable = false;
          currentMode = mode;
          $rootScope.screenMode = mode;
        }
      };
      function resetObject(obj) {
        for (var v in obj) {
          v = null;
        }
      };
      function initMode() {
        return INIT;
      };
      function createMode() {
        return DETAIL;
      };
      function addMode() {
        return ADD;
      };
      function editMode() {
        return EDIT;
      };
      function saveMode() {
        return DETAIL;
      };
      function deleteMode() {
        return INIT;
      };
      function detailMode() {
        return DETAIL;
      };
      function searchMode() {
        return DETAIL;
      };
      function isCreateEnabled() {
        return createEnabled;
      };
      function isEditEnabled() {
        return editEnabled;
      };
      function isSaveEnabled() {
        return saveEnabled;
      };
      function isAddEnabled() {
        return addEnabled;
      };
      function isDeleteEnabled() {
        return deleteEnabled;
      };
      function isCancelEnabled() {
        return cancelEnabled;
      };
      function isBackEnabled() {
        return backEnabled;
      };
      function isDisable() {
        return disable;
      };
      function getNumPages(count, psize) {
        var reste = count % psize;
        var diviseur = count - reste;
        return ((diviseur / psize) + 1);
      };
      function getCurrentMode() {
        return currentMode;
      };
      function reload(scope) {
        scope.createEnabled = createEnabled;
        scope.addEnabled = addEnabled;
        scope.cancelEnabled = cancelEnabled;
        scope.editEnabled = editEnabled;
        scope.saveEnabled = saveEnabled;
        scope.deleteEnabled = deleteEnabled;
        scope.backEnabled = backEnabled;
        scope.disable = disable;
        scope.mode = currentMode;
      };

    };

    crudService.$inject = ['$rootScope'];

})();

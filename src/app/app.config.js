(function() {
  "use strict";

  angular.module("sample").config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/i18n/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('fr');
    $translateProvider.fallbackLanguage('fr');
    $translateProvider.useCookieStorage();

  }]);

  angular.module("sample").config(['ivhTreeviewOptionsProvider',function (ivhTreeviewOptionsProvider) {
    ivhTreeviewOptionsProvider.set({
      idAttribute: 'actionId',
      labelAttribute: 'actionName',
      childrenAttribute: 'children',
      selectedAttribute: 'checked',
      useCheckboxes: true,
      expandToDepth: 0,
      indeterminateAttribute: 'indeterminate',
      defaultSelectedState: true,
      validate: true,
      twistieCollapsedTpl: '<span class="glyphicon glyphicon-folder-close"></span>',
      twistieExpandedTpl: '<span class="glyphicon glyphicon-folder-open"></span>',
      twistieLeafTpl: '<span class="glyphicon glyphicon-menu-right"></span>'
    });
  }]);

  angular.module("sample").config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
    $httpProvider.interceptors.push(function () {
      return {
        response: function (response) {
          $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = response.headers('X-CSRF-TOKEN');
          return response;
        }
      }
    });
  }]);

  angular.module('sample').config(['AuthenticationServiceProvider','AuthorizationServiceProvider','AttachementServiceProvider','WorkflowServiceProvider','Settings','MenuServiceProvider', function (AuthenticationServiceProvider, AuthorizationServiceProvider, AttachementServiceProvider, WorkflowServiceProvider, Settings, MenuServiceProvider) {
    "use strict";

    AuthenticationServiceProvider.setBaseUrl(Settings.base);
    AuthenticationServiceProvider.setLoginUrl(Settings.base + '/rs/authenticate/login');
    AuthenticationServiceProvider.setPingUserUrl(Settings.base + '/rs/authenticate/user');
    AuthenticationServiceProvider.setLogoutUrl(Settings.base + '/rs/authenticate/logout');

    AuthorizationServiceProvider.setBaseUrl(Settings.base);

    WorkflowServiceProvider.setBaseUrl(Settings.base);
    WorkflowServiceProvider.setExecuteTransitionUrl('/rs/workflow/execute');
    WorkflowServiceProvider.setAllowedTransitionsUrl('/rs/workflow/allowedTransitions');

    MenuServiceProvider.setBaseUrl(Settings.base);
    MenuServiceProvider.setMenuUrl('/rs/navigation/loadMenu');
  }]);

  angular.module('sample').config(['AttachementServiceProvider','Settings',function (AttachementServiceProvider, Settings) {
    AttachementServiceProvider.setBaseUrl(Settings.base);
    AttachementServiceProvider.setAttachementsUrl('/rs/attachement/getAttachements');
    AttachementServiceProvider.setDownloadAttachementUrl('/rs/attachement/download');
    AttachementServiceProvider.setRemoveAttachementUrl('/rs/attachement/remove');
    AttachementServiceProvider.setUploadAttachementUrl('/rs/attachement/upload');

  }]);
})();

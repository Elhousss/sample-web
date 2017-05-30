/**
 * Created by ...
 */
 
/*
 * Configure routes
 * */

(function() {
  "use strict";


  angular.module("sample").config(["$routeProvider", "$httpProvider", "Settings", function ($routeProvider, $httpProvider, Settings) {
    $routeProvider
      .when("/", {
        templateUrl: Settings.root + 'common/home/home.html'
      })
      .when("/pages/facture/client/recherche_client", {
        templateUrl: Settings.root + 'facture/search_client.html'
      })
      .when("/pages/facture/client/add_client", {
        templateUrl: Settings.root + 'facture/client.html'
      })
      .when("/pages/facture/client/detail_client/:id", {
        templateUrl: Settings.root + 'facture/client.html'
      })
      .when("/pages/facture/client/edit_client/:id", {
        templateUrl: Settings.root + 'facture/client.html'
      })
      .when("/pages/facture/client/delete_client/:id", {
        templateUrl: Settings.root + 'facture/client.html'
      })
      .when("/pages/facture/livrable/recherche_livrable", {
        templateUrl: Settings.root + 'facture/search_livrable.html'
      })
      .when("/pages/facture/livrable/add_livrable", {
        templateUrl: Settings.root + 'facture/livrable.html'
      })
      .when("/pages/facture/livrable/detail_livrable/:id", {
        templateUrl: Settings.root + 'facture/livrable.html'
      })
      .when("/pages/facture/livrable/edit_livrable/:id", {
        templateUrl: Settings.root + 'facture/livrable.html'
      })
      .when("/pages/facture/livrable/delete_livrable/:id", {
        templateUrl: Settings.root + 'facture/livrable.html'
      })
      .when("/pages/facture/ligneFacture/recherche_ligneFacture", {
        templateUrl: Settings.root + 'facture/search_ligneFacture.html'
      })
      .when("/pages/facture/ligneFacture/add_ligneFacture", {
        templateUrl: Settings.root + 'facture/ligneFacture.html'
      })
      .when("/pages/facture/ligneFacture/detail_ligneFacture/:id", {
        templateUrl: Settings.root + 'facture/ligneFacture.html'
      })
      .when("/pages/facture/ligneFacture/edit_ligneFacture/:id", {
        templateUrl: Settings.root + 'facture/ligneFacture.html'
      })
      .when("/pages/facture/ligneFacture/delete_ligneFacture/:id", {
        templateUrl: Settings.root + 'facture/ligneFacture.html'
      })
      .when("/pages/facture/facture/recherche_facture", {
        templateUrl: Settings.root + 'facture/search_facture.html'
      })
      .when("/pages/facture/facture/add_facture", {
        templateUrl: Settings.root + 'facture/facture.html'
      })
      .when("/pages/facture/facture/detail_facture/:id", {
        templateUrl: Settings.root + 'facture/facture.html'
      })
      .when("/pages/facture/facture/edit_facture/:id", {
        templateUrl: Settings.root + 'facture/facture.html'
      })
      .when("/pages/facture/facture/delete_facture/:id", {
        templateUrl: Settings.root + 'facture/facture.html'
      })
      .when("/pages/admin/link/recherche_link", {
        templateUrl: Settings.root + 'admin/search_link.html'
      })
      .when("/pages/admin/link/add_link", {
        templateUrl: Settings.root + 'admin/link.html'
      })
      .when("/pages/admin/link/detail_link/:id", {
        templateUrl: Settings.root + 'admin/link.html'
      })
      .when("/pages/admin/link/edit_link/:id", {
        templateUrl: Settings.root + 'admin/link.html'
      })
      .when("/pages/admin/link/delete_link/:id", {
        templateUrl: Settings.root + 'admin/link.html'
      })
      .when("/pages/admin/uorg/recherche_uorg", {
        templateUrl: Settings.root + 'admin/search_uorg.html'
      })
      .when("/pages/admin/uorg/add_uorg", {
        templateUrl: Settings.root + 'admin/uorg.html'
      })
      .when("/pages/admin/uorg/detail_uorg/:id", {
        templateUrl: Settings.root + 'admin/uorg.html'
      })
      .when("/pages/admin/uorg/edit_uorg/:id", {
        templateUrl: Settings.root + 'admin/uorg.html'
      })
      .when("/pages/admin/uorg/delete_uorg/:id", {
        templateUrl: Settings.root + 'admin/uorg.html'
      })
      .when("/pages/admin/linkType/recherche_linkType", {
        templateUrl: Settings.root + 'admin/search_linkType.html'
      })
      .when("/pages/admin/linkType/add_linkType", {
        templateUrl: Settings.root + 'admin/linkType.html'
      })
      .when("/pages/admin/linkType/detail_linkType/:id", {
        templateUrl: Settings.root + 'admin/linkType.html'
      })
      .when("/pages/admin/linkType/edit_linkType/:id", {
        templateUrl: Settings.root + 'admin/linkType.html'
      })
      .when("/pages/admin/linkType/delete_linkType/:id", {
        templateUrl: Settings.root + 'admin/linkType.html'
      })
      .when("/pages/admin/affectation/recherche_affectation", {
        templateUrl: Settings.root + 'admin/search_affectation.html'
      })
      .when("/pages/admin/affectation/add_affectation", {
        templateUrl: Settings.root + 'admin/affectation.html'
      })
      .when("/pages/admin/affectation/detail_affectation/:id", {
        templateUrl: Settings.root + 'admin/affectation.html'
      })
      .when("/pages/admin/affectation/edit_affectation/:id", {
        templateUrl: Settings.root + 'admin/affectation.html'
      })
      .when("/pages/admin/affectation/delete_affectation/:id", {
        templateUrl: Settings.root + 'admin/affectation.html'
      })
      .when("/pages/admin/document/recherche_document", {
        templateUrl: Settings.root + 'admin/search_document.html'
      })
      .when("/pages/admin/document/add_document", {
        templateUrl: Settings.root + 'admin/document.html'
      })
      .when("/pages/admin/document/detail_document/:id", {
        templateUrl: Settings.root + 'admin/document.html'
      })
      .when("/pages/admin/document/edit_document/:id", {
        templateUrl: Settings.root + 'admin/document.html'
      })
      .when("/pages/admin/document/delete_document/:id", {
        templateUrl: Settings.root + 'admin/document.html'
      })
      .when("/pages/admin/attachementInstance/recherche_attachementInstance", {
        templateUrl: Settings.root + 'admin/search_attachementInstance.html'
      })      
      .when("/pages/admin/linkNature/recherche_linkNature", {
        templateUrl: Settings.root + 'admin/search_linkNature.html'
      })
      .when("/pages/admin/linkNature/add_linkNature", {
        templateUrl: Settings.root + 'admin/linkNature.html'
      })
      .when("/pages/admin/linkNature/detail_linkNature/:id", {
        templateUrl: Settings.root + 'admin/linkNature.html'
      })
      .when("/pages/admin/linkNature/edit_linkNature/:id", {
        templateUrl: Settings.root + 'admin/linkNature.html'
      })
      .when("/pages/admin/linkNature/delete_linkNature/:id", {
        templateUrl: Settings.root + 'admin/linkNature.html'
      })
      .when("/pages/admin/wkflog/recherche_wkflog", {
        templateUrl: Settings.root + 'admin/search_wkflog.html'
      })
      .when("/pages/admin/wkflog/add_wkflog", {
        templateUrl: Settings.root + 'admin/wkflog.html'
      })
      .when("/pages/admin/wkflog/detail_wkflog/:id", {
        templateUrl: Settings.root + 'admin/wkflog.html'
      })
      .when("/pages/admin/wkflog/edit_wkflog/:id", {
        templateUrl: Settings.root + 'admin/wkflog.html'
      })
      .when("/pages/admin/wkflog/delete_wkflog/:id", {
        templateUrl: Settings.root + 'admin/wkflog.html'
      })
      .when("/pages/admin/action/recherche_action", {
        templateUrl: Settings.root + 'admin/search_action.html'
      })
      .when("/pages/admin/action/add_action", {
        templateUrl: Settings.root + 'admin/action.html'
      })
      .when("/pages/admin/action/detail_action/:id", {
        templateUrl: Settings.root + 'admin/action.html'
      })
      .when("/pages/admin/action/edit_action/:id", {
        templateUrl: Settings.root + 'admin/action.html'
      })
      .when("/pages/admin/action/delete_action/:id", {
        templateUrl: Settings.root + 'admin/action.html'
      })
      .when("/pages/admin/role/recherche_role", {
        templateUrl: Settings.root + 'admin/search_role.html'
      })
      .when("/pages/admin/role/add_role", {
        templateUrl: Settings.root + 'admin/role.html'
      })
      .when("/pages/admin/role/detail_role/:id", {
        templateUrl: Settings.root + 'admin/role.html'
      })
      .when("/pages/admin/role/edit_role/:id", {
        templateUrl: Settings.root + 'admin/role.html'
      })
      .when("/pages/admin/role/delete_role/:id", {
        templateUrl: Settings.root + 'admin/role.html'
      })
      .when("/pages/admin/utilisateur/recherche_utilisateur", {
        templateUrl: Settings.root + 'admin/search_utilisateur.html'
      })
      .when("/pages/admin/utilisateur/add_utilisateur", {
        templateUrl: Settings.root + 'admin/utilisateur.html'
      })
      .when("/pages/admin/utilisateur/detail_utilisateur/:id", {
        templateUrl: Settings.root + 'admin/utilisateur.html'
      })
      .when("/pages/admin/utilisateur/edit_utilisateur/:id", {
        templateUrl: Settings.root + 'admin/utilisateur.html'
      })
      .when("/pages/admin/utilisateur/delete_utilisateur/:id", {
        templateUrl: Settings.root + 'admin/utilisateur.html'
      })
      .when("/pages/admin/linkInstance/recherche_linkInstance", {
        templateUrl: Settings.root + 'admin/search_linkInstance.html'
      })
      .when("/pages/admin/linkInstance/add_linkInstance", {
        templateUrl: Settings.root + 'admin/linkInstance.html'
      })
      .when("/pages/admin/linkInstance/detail_linkInstance/:id", {
        templateUrl: Settings.root + 'admin/linkInstance.html'
      })
      .when("/pages/admin/linkInstance/edit_linkInstance/:id", {
        templateUrl: Settings.root + 'admin/linkInstance.html'
      })
      .when("/pages/admin/linkInstance/delete_linkInstance/:id", {
        templateUrl: Settings.root + 'admin/linkInstance.html'
      })
      .when("/login", {
        templateUrl: 'login.html'
      })
      .otherwise({
          redirectTo: 'index.html'
        }
      );
  }]);
})();



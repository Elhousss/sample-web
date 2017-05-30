/*
 loadMenu
 */
exports.loadMenu = function(req, res) {
  res.status(200).json({
    "object" : null,
    "status" : 0,
    "message" : null,
    "listItems" : [{
      "id" : "test",
      "label" : "Test",
      "link" : "",
      "codeAction" : "awb.aida.server.utile.IActionSecurisees.TEST_CONSULTER_MODULE_UC",
      "beanName" : null,
      "icon" : null,
      "parent" : true,
      "children" : [{
        "id" : "formateur",
        "label" : "Formateur",
        "link" : "/pages/test/formateur/recherche_formateur",
        "codeAction" : "awb.aida.server.utile.IActionSecurisees.TB_FORMATEUR_RECHERCHER_UC",
        "beanName" : "FormateurController",
        "icon" : "/images/menu/Search.png",
        "parent" : false,
        "children" : []
      }, {
        "id" : "project",
        "label" : "Project",
        "link" : "/pages/test/project/recherche_project",
        "codeAction" : "awb.aida.server.utile.IActionSecurisees.TB_PROJECT_RECHERCHER_UC",
        "beanName" : "ProjectController",
        "icon" : "/images/menu/Search.png",
        "parent" : false,
        "children" : []
      }, {
        "id" : "type",
        "label" : "Type",
        "link" : "/pages/test/type/recherche_type",
        "codeAction" : "awb.aida.server.utile.IActionSecurisees.TB_TYPE_RECHERCHER_UC",
        "beanName" : "TypeController",
        "icon" : "/images/menu/Search.png",
        "parent" : false,
        "children" : []
      }]
    }, {
      "id" : "admin",
      "label" : "admin",
      "link" : "",
      "codeAction" : "awb.aida.server.utile.IActionSecurisees.ADMIN_CONSULTER_MODULE_UC",
      "beanName" : null,
      "icon" : null,
      "parent" : true,
      "children" : [{
        "id" : "utilisateur",
        "label" : "Utilisateur",
        "link" : "/pages/admin/utilisateur/recherche_utilisateur",
        "codeAction" : "awb.aida.server.utile.IActionSecurisees.ITAR_SECURITY_USER_RECHERCHER_UC",
        "beanName" : "UtilisateurController",
        "icon" : "/images/menu/Search.png",
        "parent" : false,
        "children" : []
      }, {
        "id" : "role",
        "label" : "Role",
        "link" : "/pages/admin/role/recherche_role",
        "codeAction" : "awb.aida.server.utile.IActionSecurisees.ITAR_SECURITY_ROLE_RECHERCHER_UC",
        "beanName" : "RoleController",
        "icon" : "/images/menu/Search.png",
        "parent" : false,
        "children" : []
      }, {
        "id" : "uorg",
        "label" : "Unite Organisationnelle",
        "link" : "/pages/admin/uorg/recherche_uorg",
        "codeAction" : "awb.aida.server.utile.IActionSecurisees.ITAR_UNITEORG_RECHERCHER_UC",
        "beanName" : "UorgController",
        "icon" : "/images/menu/Search.png",
        "parent" : false,
        "children" : []
      }]
    }],
    "count" : null,
    "misc" : ["1000", "1021", "1022", "1023", "1024", "1025", "1026", "1028", "1029", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1060", "1062", "1063", "1064", "1065", "1066", "1067", "1068", "1069", "1070", "1071", "1085", "1086", "1087", "1088", "1089", "1090", "1091", "1092", "1093", "1095", "1096", "1097", "1098", "1099", "1100", "1101", "1102", "1103", "300000", "300001", "300002", "300003"]
  });
};
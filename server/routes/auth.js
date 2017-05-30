/*
 Login
 */
var loginAnswer = {"user":{"connectedRoleLabel":"Adminisrateur","login":"ADMIN","nom":"Administrateur","prenom":"Admin","mail":null,"motdepasse":null,"connected":true,"blocked":null,"uniteOrganisationnelleName":"Direction"},"session":"6DD6A6991C04B7452856F2185D061942","affectations":[],"selectedAffectation":null,"statusText":null,"status":0};
var user = {"connectedRoleLabel":"Adminisrateur","login":"ADMIN","nom":"Administrateur","prenom":"Admin","mail":null,"motdepasse":null,"connected":true,"blocked":null,"uniteOrganisationnelleName":"Direction"};
var actions = {"object":null,"status":0,"message":null,"listItems":["1000","1021","1022","1023","1024","1025","1026","1028","1029","1041","1042","1043","1044","1045","1046","1047","1048","1049","1051","1052","1053","1054","1055","1056","1057","1058","1059","1060","1062","1063","1064","1065","1066","1067","1068","1069","1070","1071","1085","1086","1087","1088","1089","1090","1091","1092","1093","1095","1096","1097","1098","1099","1100","1101","1102","1103","300000","300001","300002","300003"],"count":null,"misc":null};

exports.login = function(req, res) {
  res.status(200).json(loginAnswer);
};

/*
 User
 */
exports.user = function(req, res) {
  res.status(200).json(user);
};

exports.loadAccessRights = function(req, res) {
  res.status(200).json(actions);
}

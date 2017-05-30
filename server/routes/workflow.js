/**
 * Created by Asebban on 06/10/2016.
 */
var t = {"object":null,"status":0,"message":null,"listItems":[{"name":"valider","to":"VALIDE","visible":true,"wfactionId":"300002"},{"name":"rejeter","to":"REJETE","visible":true,"wfactionId":"300003"}],"count":null,"misc":"EN ATTENTE"};
var e = {"object":null,"status":0,"message":null,"listItems":[],"count":null,"misc":"REJETE"};

exports.allowedTransitions = function(req, res) {
  res.status(200).json(t);
};

/*
 User
 */
exports.executeTransition = function(req, res) {
  res.status(200).json(e);
};

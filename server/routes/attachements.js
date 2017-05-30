/**
 * Created by Asebban on 10/10/2016.
 */
var attachs = {"object":null,"status":0,"message":null,"listItems":[{"id":1151,"name":"sample-parent-complet.rar","url":"c:/attach/omnishore.angular.server.test.metier.modele.Project/1752/Files/sample-parent-complet.rar","path":"c:/attach/omnishore.angular.server.test.metier.modele.Project/1752/Files/sample-parent-complet.rar"}],"count":null,"misc":null};

exports.getAttachements = function(req, res) {
  res.status(200).json(attachs);
};

exports.upload = function(req, res) {
  res.status(200).json(attachs);
};

exports.download = function(req, res) {
  res.status(200);
};

exports.remove = function(req, res) {
  res.status(200);
};

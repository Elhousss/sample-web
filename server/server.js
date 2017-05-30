/**
 * Module dependencies.
 */

var base = '/api';

var express = require('express'),
  client = require('./routes/client'),
  livrable = require('./routes/livrable'),
  ligneFacture = require('./routes/ligneFacture'),
  facture = require('./routes/facture'),
  link = require('./routes/link'),
  uorg = require('./routes/uorg'),
  linkType = require('./routes/linkType'),
  affectation = require('./routes/affectation'),
  document = require('./routes/document'),
  attachementInstance = require('./routes/attachementInstance'),
  linkNature = require('./routes/linkNature'),
  wkflog = require('./routes/wkflog'),
  action = require('./routes/action'),
  role = require('./routes/role'),
  utilisateur = require('./routes/utilisateur'),
  linkInstance = require('./routes/linkInstance'),
  attachement = require('./routes/attachements'),
  auth = require('./routes/auth'),
  navigation = require('./routes/navigation'),
  workflow = require('./routes/workflow'),

  bodyParser = require('body-parser'),
  app = express(),
  port = process.env.SERVER_PORT || 9000;

// Configuration
app.set('port', port);
app.use(bodyParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post(base+'/rs/facture/client/create', client.addClient);
app.get(base+'/rs/facture/client/:id', client.findClientById);
app.post(base+'/rs/facture/client', client.addClient);
app.get(base+'/rs/facture/client/edit/:id', client.editClient);
app.get(base+'/rs/facture/client/cancelEdit/:id',client.cancelEditClient);
app.post(base+'/rs/facture/client/save/*', client.updateClient);
app.post(base+'/rs/facture/client/search/*', client.findAllClients);
app.delete(base+'/rs/facture/client/:id', client.deleteClient);
app.post(base+'/rs/facture/livrable/create', livrable.addLivrable);
app.get(base+'/rs/facture/livrable/:id', livrable.findLivrableById);
app.post(base+'/rs/facture/livrable', livrable.addLivrable);
app.get(base+'/rs/facture/livrable/edit/:id', livrable.editLivrable);
app.get(base+'/rs/facture/livrable/cancelEdit/:id',livrable.cancelEditLivrable);
app.post(base+'/rs/facture/livrable/save/*', livrable.updateLivrable);
app.post(base+'/rs/facture/livrable/search/*', livrable.findAllLivrables);
app.delete(base+'/rs/facture/livrable/:id', livrable.deleteLivrable);
app.post(base+'/rs/facture/ligneFacture/create', ligneFacture.addLigneFacture);
app.get(base+'/rs/facture/ligneFacture/:id', ligneFacture.findLigneFactureById);
app.post(base+'/rs/facture/ligneFacture', ligneFacture.addLigneFacture);
app.get(base+'/rs/facture/ligneFacture/edit/:id', ligneFacture.editLigneFacture);
app.get(base+'/rs/facture/ligneFacture/cancelEdit/:id',ligneFacture.cancelEditLigneFacture);
app.post(base+'/rs/facture/ligneFacture/save/*', ligneFacture.updateLigneFacture);
app.post(base+'/rs/facture/ligneFacture/search/*', ligneFacture.findAllLigneFactures);
app.delete(base+'/rs/facture/ligneFacture/:id', ligneFacture.deleteLigneFacture);
app.post(base+'/rs/facture/facture/create', facture.addFacture);
app.get(base+'/rs/facture/facture/:id', facture.findFactureById);
app.post(base+'/rs/facture/facture', facture.addFacture);
app.get(base+'/rs/facture/facture/edit/:id', facture.editFacture);
app.get(base+'/rs/facture/facture/cancelEdit/:id',facture.cancelEditFacture);
app.post(base+'/rs/facture/facture/save/*', facture.updateFacture);
app.post(base+'/rs/facture/facture/search/*', facture.findAllFactures);
app.delete(base+'/rs/facture/facture/:id', facture.deleteFacture);
app.post(base+'/rs/admin/link/create', link.addLink);
app.get(base+'/rs/admin/link/:id', link.findLinkById);
app.post(base+'/rs/admin/link', link.addLink);
app.get(base+'/rs/admin/link/edit/:id', link.editLink);
app.get(base+'/rs/admin/link/cancelEdit/:id',link.cancelEditLink);
app.post(base+'/rs/admin/link/save/*', link.updateLink);
app.post(base+'/rs/admin/link/search/*', link.findAllLinks);
app.delete(base+'/rs/admin/link/:id', link.deleteLink);
app.post(base+'/rs/admin/uorg/create', uorg.addUorg);
app.get(base+'/rs/admin/uorg/:id', uorg.findUorgById);
app.post(base+'/rs/admin/uorg', uorg.addUorg);
app.get(base+'/rs/admin/uorg/edit/:id', uorg.editUorg);
app.get(base+'/rs/admin/uorg/cancelEdit/:id',uorg.cancelEditUorg);
app.post(base+'/rs/admin/uorg/save/*', uorg.updateUorg);
app.post(base+'/rs/admin/uorg/search/*', uorg.findAllUorgs);
app.delete(base+'/rs/admin/uorg/:id', uorg.deleteUorg);
app.post(base+'/rs/admin/linkType/create', linkType.addLinkType);
app.get(base+'/rs/admin/linkType/:id', linkType.findLinkTypeById);
app.post(base+'/rs/admin/linkType', linkType.addLinkType);
app.get(base+'/rs/admin/linkType/edit/:id', linkType.editLinkType);
app.get(base+'/rs/admin/linkType/cancelEdit/:id',linkType.cancelEditLinkType);
app.post(base+'/rs/admin/linkType/save/*', linkType.updateLinkType);
app.post(base+'/rs/admin/linkType/search/*', linkType.findAllLinkTypes);
app.delete(base+'/rs/admin/linkType/:id', linkType.deleteLinkType);
app.post(base+'/rs/admin/affectation/create', affectation.addAffectation);
app.get(base+'/rs/admin/affectation/:id', affectation.findAffectationById);
app.post(base+'/rs/admin/affectation', affectation.addAffectation);
app.get(base+'/rs/admin/affectation/edit/:id', affectation.editAffectation);
app.get(base+'/rs/admin/affectation/cancelEdit/:id',affectation.cancelEditAffectation);
app.post(base+'/rs/admin/affectation/save/*', affectation.updateAffectation);
app.post(base+'/rs/admin/affectation/search/*', affectation.findAllAffectations);
app.delete(base+'/rs/admin/affectation/:id', affectation.deleteAffectation);
app.post(base+'/rs/admin/document/create', document.addDocument);
app.get(base+'/rs/admin/document/:id', document.findDocumentById);
app.post(base+'/rs/admin/document', document.addDocument);
app.get(base+'/rs/admin/document/edit/:id', document.editDocument);
app.get(base+'/rs/admin/document/cancelEdit/:id',document.cancelEditDocument);
app.post(base+'/rs/admin/document/save/*', document.updateDocument);
app.post(base+'/rs/admin/document/search/*', document.findAllDocuments);
app.delete(base+'/rs/admin/document/:id', document.deleteDocument);
app.post(base+'/rs/admin/attachementInstance/create', attachementInstance.addAttachementInstance);
app.get(base+'/rs/admin/attachementInstance/:id', attachementInstance.findAttachementInstanceById);
app.post(base+'/rs/admin/attachementInstance', attachementInstance.addAttachementInstance);
app.get(base+'/rs/admin/attachementInstance/edit/:id', attachementInstance.editAttachementInstance);
app.get(base+'/rs/admin/attachementInstance/cancelEdit/:id',attachementInstance.cancelEditAttachementInstance);
app.post(base+'/rs/admin/attachementInstance/save/*', attachementInstance.updateAttachementInstance);
app.post(base+'/rs/admin/attachementInstance/search/*', attachementInstance.findAllAttachementInstances);
app.delete(base+'/rs/admin/attachementInstance/:id', attachementInstance.deleteAttachementInstance);
app.post(base+'/rs/admin/linkNature/create', linkNature.addLinkNature);
app.get(base+'/rs/admin/linkNature/:id', linkNature.findLinkNatureById);
app.post(base+'/rs/admin/linkNature', linkNature.addLinkNature);
app.get(base+'/rs/admin/linkNature/edit/:id', linkNature.editLinkNature);
app.get(base+'/rs/admin/linkNature/cancelEdit/:id',linkNature.cancelEditLinkNature);
app.post(base+'/rs/admin/linkNature/save/*', linkNature.updateLinkNature);
app.post(base+'/rs/admin/linkNature/search/*', linkNature.findAllLinkNatures);
app.delete(base+'/rs/admin/linkNature/:id', linkNature.deleteLinkNature);
app.post(base+'/rs/admin/wkflog/create', wkflog.addWkflog);
app.get(base+'/rs/admin/wkflog/:id', wkflog.findWkflogById);
app.post(base+'/rs/admin/wkflog', wkflog.addWkflog);
app.get(base+'/rs/admin/wkflog/edit/:id', wkflog.editWkflog);
app.get(base+'/rs/admin/wkflog/cancelEdit/:id',wkflog.cancelEditWkflog);
app.post(base+'/rs/admin/wkflog/save/*', wkflog.updateWkflog);
app.post(base+'/rs/admin/wkflog/search/*', wkflog.findAllWkflogs);
app.delete(base+'/rs/admin/wkflog/:id', wkflog.deleteWkflog);
app.post(base+'/rs/admin/action/create', action.addAction);
app.get(base+'/rs/admin/action/:id', action.findActionById);
app.post(base+'/rs/admin/action', action.addAction);
app.get(base+'/rs/admin/action/edit/:id', action.editAction);
app.get(base+'/rs/admin/action/cancelEdit/:id',action.cancelEditAction);
app.post(base+'/rs/admin/action/save/*', action.updateAction);
app.post(base+'/rs/admin/action/search/*', action.findAllActions);
app.delete(base+'/rs/admin/action/:id', action.deleteAction);
app.post(base+'/rs/admin/role/create', role.addRole);
app.get(base+'/rs/admin/role/:id', role.findRoleById);
app.post(base+'/rs/admin/role', role.addRole);
app.get(base+'/rs/admin/role/edit/:id', role.editRole);
app.get(base+'/rs/admin/role/cancelEdit/:id',role.cancelEditRole);
app.post(base+'/rs/admin/role/save/*', role.updateRole);
app.post(base+'/rs/admin/role/search/*', role.findAllRoles);
app.delete(base+'/rs/admin/role/:id', role.deleteRole);
app.post(base+'/rs/admin/utilisateur/create', utilisateur.addUtilisateur);
app.get(base+'/rs/admin/utilisateur/:id', utilisateur.findUtilisateurById);
app.post(base+'/rs/admin/utilisateur', utilisateur.addUtilisateur);
app.get(base+'/rs/admin/utilisateur/edit/:id', utilisateur.editUtilisateur);
app.get(base+'/rs/admin/utilisateur/cancelEdit/:id',utilisateur.cancelEditUtilisateur);
app.post(base+'/rs/admin/utilisateur/save/*', utilisateur.updateUtilisateur);
app.post(base+'/rs/admin/utilisateur/search/*', utilisateur.findAllUtilisateurs);
app.delete(base+'/rs/admin/utilisateur/:id', utilisateur.deleteUtilisateur);
app.post(base+'/rs/admin/linkInstance/create', linkInstance.addLinkInstance);
app.get(base+'/rs/admin/linkInstance/:id', linkInstance.findLinkInstanceById);
app.post(base+'/rs/admin/linkInstance', linkInstance.addLinkInstance);
app.get(base+'/rs/admin/linkInstance/edit/:id', linkInstance.editLinkInstance);
app.get(base+'/rs/admin/linkInstance/cancelEdit/:id',linkInstance.cancelEditLinkInstance);
app.post(base+'/rs/admin/linkInstance/save/*', linkInstance.updateLinkInstance);
app.post(base+'/rs/admin/linkInstance/search/*', linkInstance.findAllLinkInstances);
app.delete(base+'/rs/admin/linkInstance/:id', linkInstance.deleteLinkInstance);

app.get(base+'/rs/workflow/allowedTransitions', workflow.allowedTransitions);
app.get(base+'/rs/workflow/execute\?*', workflow.executeTransition);

app.get(base+'/rs/authenticate/user', auth.user);
app.post(base+'/rs/authenticate/login', auth.login);

app.get(base+'/rs/navigation/loadMenu', navigation.loadMenu);
app.get(base+'/rs/navigation/loadAccessRights', auth.loadAccessRights);

app.get(base+'/rs/attachement/getAttachements\?*', attachement.getAttachements);
app.post(base+'/rs/attachement/upload', attachement.upload);
app.get(base+'/rs/attachement/download/*', attachement.download);
app.get(base+'/rs/attachement/remove/*', attachement.remove);

module.exports = app;

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

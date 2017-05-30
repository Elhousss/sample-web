var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var utilisateurs = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET utilisateurs listing.
 */
exports.findAllUtilisateurs = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET utilisateur by identifier.
 */
exports.findUtilisateurById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].id == id) {
      r.object = utilisateurs[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a utilisateur
 */

exports.addUtilisateur = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  utilisateurs.push(e);
  res.status(200).json(data);
};

/*
 * Edit a utilisateur by is identifier (lock it for update).
 */
exports.editUtilisateur = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].id == id) {
      console.log('utilisateur found. Id = '+id);
      r.object = utilisateurs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a utilisateur by is identifier (unlock it).
 */
exports.cancelEditUtilisateur = function(req, res) {

  var id = req.params.id,
    i;

  utilisateurs = r.listItems;

  for (i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].id == id) {
      console.log('utilisateur unlocked. Id = '+id);
      r.object = utilisateurs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a utilisateur by is identifier.
 */
exports.updateUtilisateur = function(req, res) {
  var utilisateur  = req.body,
      id      = utilisateur.id,
      i;

  for (i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].id == id) {
      utilisateurs[i] = clone(utilisateur);
      r.object = utilisateurs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a utilisateur
 */
exports.deleteUtilisateur = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].id == id) {
      utilisateurs.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


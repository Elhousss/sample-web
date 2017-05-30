var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var ligneFactures = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET ligneFactures listing.
 */
exports.findAllLigneFactures = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET ligneFacture by identifier.
 */
exports.findLigneFactureById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < ligneFactures.length; i++) {
    if (ligneFactures[i].id == id) {
      r.object = ligneFactures[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a ligneFacture
 */

exports.addLigneFacture = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  ligneFactures.push(e);
  res.status(200).json(data);
};

/*
 * Edit a ligneFacture by is identifier (lock it for update).
 */
exports.editLigneFacture = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < ligneFactures.length; i++) {
    if (ligneFactures[i].id == id) {
      console.log('ligneFacture found. Id = '+id);
      r.object = ligneFactures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a ligneFacture by is identifier (unlock it).
 */
exports.cancelEditLigneFacture = function(req, res) {

  var id = req.params.id,
    i;

  ligneFactures = r.listItems;

  for (i = 0; i < ligneFactures.length; i++) {
    if (ligneFactures[i].id == id) {
      console.log('ligneFacture unlocked. Id = '+id);
      r.object = ligneFactures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a ligneFacture by is identifier.
 */
exports.updateLigneFacture = function(req, res) {
  var ligneFacture  = req.body,
      id      = ligneFacture.id,
      i;

  for (i = 0; i < ligneFactures.length; i++) {
    if (ligneFactures[i].id == id) {
      ligneFactures[i] = clone(ligneFacture);
      r.object = ligneFactures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a ligneFacture
 */
exports.deleteLigneFacture = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < ligneFactures.length; i++) {
    if (ligneFactures[i].id == id) {
      ligneFactures.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var factures = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET factures listing.
 */
exports.findAllFactures = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET facture by identifier.
 */
exports.findFactureById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < factures.length; i++) {
    if (factures[i].id == id) {
      r.object = factures[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a facture
 */

exports.addFacture = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  factures.push(e);
  res.status(200).json(data);
};

/*
 * Edit a facture by is identifier (lock it for update).
 */
exports.editFacture = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < factures.length; i++) {
    if (factures[i].id == id) {
      console.log('facture found. Id = '+id);
      r.object = factures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a facture by is identifier (unlock it).
 */
exports.cancelEditFacture = function(req, res) {

  var id = req.params.id,
    i;

  factures = r.listItems;

  for (i = 0; i < factures.length; i++) {
    if (factures[i].id == id) {
      console.log('facture unlocked. Id = '+id);
      r.object = factures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a facture by is identifier.
 */
exports.updateFacture = function(req, res) {
  var facture  = req.body,
      id      = facture.id,
      i;

  for (i = 0; i < factures.length; i++) {
    if (factures[i].id == id) {
      factures[i] = clone(facture);
      r.object = factures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a facture
 */
exports.deleteFacture = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < factures.length; i++) {
    if (factures[i].id == id) {
      factures.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


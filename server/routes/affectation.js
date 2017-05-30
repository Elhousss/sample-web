var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var affectations = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET affectations listing.
 */
exports.findAllAffectations = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET affectation by identifier.
 */
exports.findAffectationById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < affectations.length; i++) {
    if (affectations[i].id == id) {
      r.object = affectations[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a affectation
 */

exports.addAffectation = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  affectations.push(e);
  res.status(200).json(data);
};

/*
 * Edit a affectation by is identifier (lock it for update).
 */
exports.editAffectation = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < affectations.length; i++) {
    if (affectations[i].id == id) {
      console.log('affectation found. Id = '+id);
      r.object = affectations[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a affectation by is identifier (unlock it).
 */
exports.cancelEditAffectation = function(req, res) {

  var id = req.params.id,
    i;

  affectations = r.listItems;

  for (i = 0; i < affectations.length; i++) {
    if (affectations[i].id == id) {
      console.log('affectation unlocked. Id = '+id);
      r.object = affectations[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a affectation by is identifier.
 */
exports.updateAffectation = function(req, res) {
  var affectation  = req.body,
      id      = affectation.id,
      i;

  for (i = 0; i < affectations.length; i++) {
    if (affectations[i].id == id) {
      affectations[i] = clone(affectation);
      r.object = affectations[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a affectation
 */
exports.deleteAffectation = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < affectations.length; i++) {
    if (affectations[i].id == id) {
      affectations.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


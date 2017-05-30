var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var livrables = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET livrables listing.
 */
exports.findAllLivrables = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET livrable by identifier.
 */
exports.findLivrableById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < livrables.length; i++) {
    if (livrables[i].id == id) {
      r.object = livrables[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a livrable
 */

exports.addLivrable = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  livrables.push(e);
  res.status(200).json(data);
};

/*
 * Edit a livrable by is identifier (lock it for update).
 */
exports.editLivrable = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < livrables.length; i++) {
    if (livrables[i].id == id) {
      console.log('livrable found. Id = '+id);
      r.object = livrables[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a livrable by is identifier (unlock it).
 */
exports.cancelEditLivrable = function(req, res) {

  var id = req.params.id,
    i;

  livrables = r.listItems;

  for (i = 0; i < livrables.length; i++) {
    if (livrables[i].id == id) {
      console.log('livrable unlocked. Id = '+id);
      r.object = livrables[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a livrable by is identifier.
 */
exports.updateLivrable = function(req, res) {
  var livrable  = req.body,
      id      = livrable.id,
      i;

  for (i = 0; i < livrables.length; i++) {
    if (livrables[i].id == id) {
      livrables[i] = clone(livrable);
      r.object = livrables[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a livrable
 */
exports.deleteLivrable = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < livrables.length; i++) {
    if (livrables[i].id == id) {
      livrables.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


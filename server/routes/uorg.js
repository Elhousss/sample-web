var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var uorgs = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET uorgs listing.
 */
exports.findAllUorgs = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET uorg by identifier.
 */
exports.findUorgById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < uorgs.length; i++) {
    if (uorgs[i].id == id) {
      r.object = uorgs[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a uorg
 */

exports.addUorg = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  uorgs.push(e);
  res.status(200).json(data);
};

/*
 * Edit a uorg by is identifier (lock it for update).
 */
exports.editUorg = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < uorgs.length; i++) {
    if (uorgs[i].id == id) {
      console.log('uorg found. Id = '+id);
      r.object = uorgs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a uorg by is identifier (unlock it).
 */
exports.cancelEditUorg = function(req, res) {

  var id = req.params.id,
    i;

  uorgs = r.listItems;

  for (i = 0; i < uorgs.length; i++) {
    if (uorgs[i].id == id) {
      console.log('uorg unlocked. Id = '+id);
      r.object = uorgs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a uorg by is identifier.
 */
exports.updateUorg = function(req, res) {
  var uorg  = req.body,
      id      = uorg.id,
      i;

  for (i = 0; i < uorgs.length; i++) {
    if (uorgs[i].id == id) {
      uorgs[i] = clone(uorg);
      r.object = uorgs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a uorg
 */
exports.deleteUorg = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < uorgs.length; i++) {
    if (uorgs[i].id == id) {
      uorgs.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


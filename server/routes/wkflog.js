var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var wkflogs = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET wkflogs listing.
 */
exports.findAllWkflogs = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET wkflog by identifier.
 */
exports.findWkflogById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < wkflogs.length; i++) {
    if (wkflogs[i].id == id) {
      r.object = wkflogs[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a wkflog
 */

exports.addWkflog = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  wkflogs.push(e);
  res.status(200).json(data);
};

/*
 * Edit a wkflog by is identifier (lock it for update).
 */
exports.editWkflog = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < wkflogs.length; i++) {
    if (wkflogs[i].id == id) {
      console.log('wkflog found. Id = '+id);
      r.object = wkflogs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a wkflog by is identifier (unlock it).
 */
exports.cancelEditWkflog = function(req, res) {

  var id = req.params.id,
    i;

  wkflogs = r.listItems;

  for (i = 0; i < wkflogs.length; i++) {
    if (wkflogs[i].id == id) {
      console.log('wkflog unlocked. Id = '+id);
      r.object = wkflogs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a wkflog by is identifier.
 */
exports.updateWkflog = function(req, res) {
  var wkflog  = req.body,
      id      = wkflog.id,
      i;

  for (i = 0; i < wkflogs.length; i++) {
    if (wkflogs[i].id == id) {
      wkflogs[i] = clone(wkflog);
      r.object = wkflogs[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a wkflog
 */
exports.deleteWkflog = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < wkflogs.length; i++) {
    if (wkflogs[i].id == id) {
      wkflogs.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var attachementInstances = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET attachementInstances listing.
 */
exports.findAllAttachementInstances = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET attachementInstance by identifier.
 */
exports.findAttachementInstanceById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < attachementInstances.length; i++) {
    if (attachementInstances[i].id == id) {
      r.object = attachementInstances[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a attachementInstance
 */

exports.addAttachementInstance = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  attachementInstances.push(e);
  res.status(200).json(data);
};

/*
 * Edit a attachementInstance by is identifier (lock it for update).
 */
exports.editAttachementInstance = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < attachementInstances.length; i++) {
    if (attachementInstances[i].id == id) {
      console.log('attachementInstance found. Id = '+id);
      r.object = attachementInstances[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a attachementInstance by is identifier (unlock it).
 */
exports.cancelEditAttachementInstance = function(req, res) {

  var id = req.params.id,
    i;

  attachementInstances = r.listItems;

  for (i = 0; i < attachementInstances.length; i++) {
    if (attachementInstances[i].id == id) {
      console.log('attachementInstance unlocked. Id = '+id);
      r.object = attachementInstances[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a attachementInstance by is identifier.
 */
exports.updateAttachementInstance = function(req, res) {
  var attachementInstance  = req.body,
      id      = attachementInstance.id,
      i;

  for (i = 0; i < attachementInstances.length; i++) {
    if (attachementInstances[i].id == id) {
      attachementInstances[i] = clone(attachementInstance);
      r.object = attachementInstances[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a attachementInstance
 */
exports.deleteAttachementInstance = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < attachementInstances.length; i++) {
    if (attachementInstances[i].id == id) {
      attachementInstances.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


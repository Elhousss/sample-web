var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var linkInstances = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET linkInstances listing.
 */
exports.findAllLinkInstances = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET linkInstance by identifier.
 */
exports.findLinkInstanceById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < linkInstances.length; i++) {
    if (linkInstances[i].id == id) {
      r.object = linkInstances[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a linkInstance
 */

exports.addLinkInstance = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  linkInstances.push(e);
  res.status(200).json(data);
};

/*
 * Edit a linkInstance by is identifier (lock it for update).
 */
exports.editLinkInstance = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < linkInstances.length; i++) {
    if (linkInstances[i].id == id) {
      console.log('linkInstance found. Id = '+id);
      r.object = linkInstances[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a linkInstance by is identifier (unlock it).
 */
exports.cancelEditLinkInstance = function(req, res) {

  var id = req.params.id,
    i;

  linkInstances = r.listItems;

  for (i = 0; i < linkInstances.length; i++) {
    if (linkInstances[i].id == id) {
      console.log('linkInstance unlocked. Id = '+id);
      r.object = linkInstances[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a linkInstance by is identifier.
 */
exports.updateLinkInstance = function(req, res) {
  var linkInstance  = req.body,
      id      = linkInstance.id,
      i;

  for (i = 0; i < linkInstances.length; i++) {
    if (linkInstances[i].id == id) {
      linkInstances[i] = clone(linkInstance);
      r.object = linkInstances[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a linkInstance
 */
exports.deleteLinkInstance = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < linkInstances.length; i++) {
    if (linkInstances[i].id == id) {
      linkInstances.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


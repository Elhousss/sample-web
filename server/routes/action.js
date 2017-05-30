var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var actions = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET actions listing.
 */
exports.findAllActions = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET action by identifier.
 */
exports.findActionById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < actions.length; i++) {
    if (actions[i].id == id) {
      r.object = actions[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a action
 */

exports.addAction = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  actions.push(e);
  res.status(200).json(data);
};

/*
 * Edit a action by is identifier (lock it for update).
 */
exports.editAction = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < actions.length; i++) {
    if (actions[i].id == id) {
      console.log('action found. Id = '+id);
      r.object = actions[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a action by is identifier (unlock it).
 */
exports.cancelEditAction = function(req, res) {

  var id = req.params.id,
    i;

  actions = r.listItems;

  for (i = 0; i < actions.length; i++) {
    if (actions[i].id == id) {
      console.log('action unlocked. Id = '+id);
      r.object = actions[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a action by is identifier.
 */
exports.updateAction = function(req, res) {
  var action  = req.body,
      id      = action.id,
      i;

  for (i = 0; i < actions.length; i++) {
    if (actions[i].id == id) {
      actions[i] = clone(action);
      r.object = actions[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a action
 */
exports.deleteAction = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < actions.length; i++) {
    if (actions[i].id == id) {
      actions.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


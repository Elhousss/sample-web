var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var roles = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET roles listing.
 */
exports.findAllRoles = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET role by identifier.
 */
exports.findRoleById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < roles.length; i++) {
    if (roles[i].id == id) {
      r.object = roles[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a role
 */

exports.addRole = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  roles.push(e);
  res.status(200).json(data);
};

/*
 * Edit a role by is identifier (lock it for update).
 */
exports.editRole = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < roles.length; i++) {
    if (roles[i].id == id) {
      console.log('role found. Id = '+id);
      r.object = roles[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a role by is identifier (unlock it).
 */
exports.cancelEditRole = function(req, res) {

  var id = req.params.id,
    i;

  roles = r.listItems;

  for (i = 0; i < roles.length; i++) {
    if (roles[i].id == id) {
      console.log('role unlocked. Id = '+id);
      r.object = roles[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a role by is identifier.
 */
exports.updateRole = function(req, res) {
  var role  = req.body,
      id      = role.id,
      i;

  for (i = 0; i < roles.length; i++) {
    if (roles[i].id == id) {
      roles[i] = clone(role);
      r.object = roles[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a role
 */
exports.deleteRole = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < roles.length; i++) {
    if (roles[i].id == id) {
      roles.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


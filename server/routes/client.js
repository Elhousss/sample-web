var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var clients = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET clients listing.
 */
exports.findAllClients = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET client by identifier.
 */
exports.findClientById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < clients.length; i++) {
    if (clients[i].id == id) {
      r.object = clients[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a client
 */

exports.addClient = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  clients.push(e);
  res.status(200).json(data);
};

/*
 * Edit a client by is identifier (lock it for update).
 */
exports.editClient = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < clients.length; i++) {
    if (clients[i].id == id) {
      console.log('client found. Id = '+id);
      r.object = clients[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a client by is identifier (unlock it).
 */
exports.cancelEditClient = function(req, res) {

  var id = req.params.id,
    i;

  clients = r.listItems;

  for (i = 0; i < clients.length; i++) {
    if (clients[i].id == id) {
      console.log('client unlocked. Id = '+id);
      r.object = clients[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a client by is identifier.
 */
exports.updateClient = function(req, res) {
  var client  = req.body,
      id      = client.id,
      i;

  for (i = 0; i < clients.length; i++) {
    if (clients[i].id == id) {
      clients[i] = clone(client);
      r.object = clients[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a client
 */
exports.deleteClient = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < clients.length; i++) {
    if (clients[i].id == id) {
      clients.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


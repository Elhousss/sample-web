var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var links = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET links listing.
 */
exports.findAllLinks = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET link by identifier.
 */
exports.findLinkById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < links.length; i++) {
    if (links[i].id == id) {
      r.object = links[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a link
 */

exports.addLink = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  links.push(e);
  res.status(200).json(data);
};

/*
 * Edit a link by is identifier (lock it for update).
 */
exports.editLink = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < links.length; i++) {
    if (links[i].id == id) {
      console.log('link found. Id = '+id);
      r.object = links[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a link by is identifier (unlock it).
 */
exports.cancelEditLink = function(req, res) {

  var id = req.params.id,
    i;

  links = r.listItems;

  for (i = 0; i < links.length; i++) {
    if (links[i].id == id) {
      console.log('link unlocked. Id = '+id);
      r.object = links[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a link by is identifier.
 */
exports.updateLink = function(req, res) {
  var link  = req.body,
      id      = link.id,
      i;

  for (i = 0; i < links.length; i++) {
    if (links[i].id == id) {
      links[i] = clone(link);
      r.object = links[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a link
 */
exports.deleteLink = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < links.length; i++) {
    if (links[i].id == id) {
      links.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


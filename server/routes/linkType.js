var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var linkTypes = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET linkTypes listing.
 */
exports.findAllLinkTypes = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET linkType by identifier.
 */
exports.findLinkTypeById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < linkTypes.length; i++) {
    if (linkTypes[i].id == id) {
      r.object = linkTypes[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a linkType
 */

exports.addLinkType = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  linkTypes.push(e);
  res.status(200).json(data);
};

/*
 * Edit a linkType by is identifier (lock it for update).
 */
exports.editLinkType = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < linkTypes.length; i++) {
    if (linkTypes[i].id == id) {
      console.log('linkType found. Id = '+id);
      r.object = linkTypes[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a linkType by is identifier (unlock it).
 */
exports.cancelEditLinkType = function(req, res) {

  var id = req.params.id,
    i;

  linkTypes = r.listItems;

  for (i = 0; i < linkTypes.length; i++) {
    if (linkTypes[i].id == id) {
      console.log('linkType unlocked. Id = '+id);
      r.object = linkTypes[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a linkType by is identifier.
 */
exports.updateLinkType = function(req, res) {
  var linkType  = req.body,
      id      = linkType.id,
      i;

  for (i = 0; i < linkTypes.length; i++) {
    if (linkTypes[i].id == id) {
      linkTypes[i] = clone(linkType);
      r.object = linkTypes[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a linkType
 */
exports.deleteLinkType = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < linkTypes.length; i++) {
    if (linkTypes[i].id == id) {
      linkTypes.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var linkNatures = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET linkNatures listing.
 */
exports.findAllLinkNatures = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET linkNature by identifier.
 */
exports.findLinkNatureById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < linkNatures.length; i++) {
    if (linkNatures[i].id == id) {
      r.object = linkNatures[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a linkNature
 */

exports.addLinkNature = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  linkNatures.push(e);
  res.status(200).json(data);
};

/*
 * Edit a linkNature by is identifier (lock it for update).
 */
exports.editLinkNature = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < linkNatures.length; i++) {
    if (linkNatures[i].id == id) {
      console.log('linkNature found. Id = '+id);
      r.object = linkNatures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a linkNature by is identifier (unlock it).
 */
exports.cancelEditLinkNature = function(req, res) {

  var id = req.params.id,
    i;

  linkNatures = r.listItems;

  for (i = 0; i < linkNatures.length; i++) {
    if (linkNatures[i].id == id) {
      console.log('linkNature unlocked. Id = '+id);
      r.object = linkNatures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a linkNature by is identifier.
 */
exports.updateLinkNature = function(req, res) {
  var linkNature  = req.body,
      id      = linkNature.id,
      i;

  for (i = 0; i < linkNatures.length; i++) {
    if (linkNatures[i].id == id) {
      linkNatures[i] = clone(linkNature);
      r.object = linkNatures[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a linkNature
 */
exports.deleteLinkNature = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < linkNatures.length; i++) {
    if (linkNatures[i].id == id) {
      linkNatures.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


var r = {"object":null,"status":0,"message":null,"listItems":[],"count":0,"misc":null};
var documents = r.listItems;

function clone(obj){
  try{
    var copy = JSON.parse(JSON.stringify(obj));
  } catch(ex){
    alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
  }
  return copy;
}

/*
 * GET documents listing.
 */
exports.findAllDocuments = function(req, res) {
  res.status(200).json(r);
};

/*
 * GET document by identifier.
 */
exports.findDocumentById = function(req, res) {
  var id = req.params.id,
      i;

  for (i = 0; i < documents.length; i++) {
    if (documents[i].id == id) {
      r.object = documents[i];
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not found");
};

/*
 * Create a document
 */

exports.addDocument = function(req, res) {
  var e = req.body;
  var data = {};

  data.object = e;
  data.status = 0;
  e.id  = Math.random().toString(36).substring(2);
  documents.push(e);
  res.status(200).json(data);
};

/*
 * Edit a document by is identifier (lock it for update).
 */
exports.editDocument = function(req, res) {

  var id = req.params.id,
  i;

  for (i = 0; i < documents.length; i++) {
    if (documents[i].id == id) {
      console.log('document found. Id = '+id);
      r.object = documents[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * Cancel Edition of  a document by is identifier (unlock it).
 */
exports.cancelEditDocument = function(req, res) {

  var id = req.params.id,
    i;

  documents = r.listItems;

  for (i = 0; i < documents.length; i++) {
    if (documents[i].id == id) {
      console.log('document unlocked. Id = '+id);
      r.object = documents[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};


/*
 * Update a document by is identifier.
 */
exports.updateDocument = function(req, res) {
  var document  = req.body,
      id      = document.id,
      i;

  for (i = 0; i < documents.length; i++) {
    if (documents[i].id == id) {
      documents[i] = clone(document);
      r.object = documents[i];
	  r.status = 0;
      res.status(200).json(r);
      return;
    }
  }
  res.status(404).json("Not modified");
};

/*
 * DELETE a document
 */
exports.deleteDocument = function(req, res) {

  var id = req.params.id,
      i;

  for (i = 0; i < documents.length; i++) {
    if (documents[i].id == id) {
      documents.splice(i, 1);
      res.status(200).json();
      return;
    }
  }

  res.status(404).json("Not deleted");
};


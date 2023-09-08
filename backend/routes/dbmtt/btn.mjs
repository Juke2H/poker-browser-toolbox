import express from "express";
import dbMTT from "../../dbconn/connMTT.mjs";
import { ObjectId } from "mongodb";

//Each route mjs is one collection inside the directory-name database.

/*Routes are named after positions at a poker table. 
  BTN stands for Button or the Dealer position.
  The Button position is, clockwise, before the Small Blind.
  #7 at a 9-handed table. */

// Create a new express router instance.
const router = express.Router();

// Define a route to handle GET requests at the root endpoint ("/").
router.get("/", async (req, res) => {
  // Access the "BTN" collection from the "dbMTT" database.
  let collection = await dbMTT.collection("BTN");
  
  // Find all documents in the collection and convert them to an array.
  let results = await collection.find({}).toArray();
  
  // Send the results as a response with a 200 status code.
  res.send(results).status(200);
});

// Define a route to handle GET requests with a specific ID parameter.
router.get("/:id", async (req, res) => {
  let collection = await dbMTT.collection("BTN");
  
  // Create a query object to find a document by its ID.
  let query = { _id: new ObjectId(req.params.id) };
  
  // Find a single document that matches the query.
  let result = await collection.findOne(query);

  // If no document is found, send a "Not found" response with a 404 status code.
  // Otherwise, send the result as a response with a 200 status code.
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Define a route to handle POST requests to create a new document.
router.post("/", async (req, res) => {
  // Create a new document object based on the request body.
  let newDocument = {
    profilename: req.body.profilename,
    range: {
      call: req.body.range.call,
      raise: req.body.range.raise,
    },
    description: req.body.description,
    type: req.body.type,
    stack: req.body.stack,
  };

  let collection = await dbMTT.collection("BTN");
  
  // Insert the new document into the collection and get the insertion result.
  let result = await collection.insertOne(newDocument);
  
  // Send the insertion result as a response with a 204 status code.
  res.send(result).status(204);
});

// Define a route to handle PATCH requests to update a document by ID.
router.patch("/:id", async (req, res) => {
  // Create a query object to find a document by its ID.
  const query = { _id: new ObjectId(req.params.id) };
  
  // Create an updates object with new values based on the request body.
  const updates = {
    $set: {
      profilename: req.body.profilename,
      range: {
        call: req.body.range.call,
        raise: req.body.range.raise,
      },
      description: req.body.description,
      type: req.body.type,
      stack: req.body.stack,
    },
  };

  let collection = await dbMTT.collection("BTN");
  
  // Update the document that matches the query with the new values.
  let result = await collection.updateOne(query, updates);
  
  // Send the update result as a response with a 200 status code.
  res.send(result).status(200);
});

// Define a route to handle DELETE requests to remove a document by ID.
router.delete("/:id", async (req, res) => {
  // Create a query object to find a document by its ID.
  const query = { _id: new ObjectId(req.params.id) };

  let collection = dbMTT.collection("BTN");
  
  // Delete the document that matches the query and get the deletion result.
  let result = await collection.deleteOne(query);
  
  // Send the deletion result as a response with a 200 status code.
  res.send(result).status(200);
});

export default router;
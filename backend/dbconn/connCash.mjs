import { MongoClient } from "mongodb";

// connCash will connect to the cash game database.

// Retrieve the MongoDB connection string from the environment variable ATLAS_URI,
// or use an empty string if it's not defined
const connectionString = process.env.ATLAS_URI || "";

// Create a new instance of the MongoDB client using the connection string
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Declare a variable to hold the database connection
let connCash;

try {
  // Attempt to establish a connection to the MongoDB server
  connCash = await client.connect();
} catch (e) {
  // If an error occurs during connection, log the error message
  console.error(e);
}

// Access the "Cash" database from the established connection
let dbCash = connCash.db("Cash");

export default dbCash;

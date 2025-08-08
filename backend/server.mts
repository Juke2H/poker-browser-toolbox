import express from "express";
import cors from "cors";
import { config } from "dotenv";
import errorHandler from "./middleWare/errorHandler.mts";

// Probably needs fileUrlToPath and path.dirname convertion in order to work
config({ path: "./newConfig/.env" });
console.log(process.env); // Remove when no longer needed

const PORT = process.env.PORT || 8080;
const server = express();

//Sets up express to find both backend and frontend.
server.use(cors());
server.use(express.json());
server.use(express.static("public"));

// Route imports go here

// Start server and handle errors if it doesn't
server.listen(PORT, async () => {
  try {
    //
  } catch (error) {
    console.error("Server failed to start:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
    // process.exit(1);
  }
});

// Look into process.on('exit') listeners.

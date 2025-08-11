import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import errorHandler from "./middleWare/errorHandler.mts";

import templateRoutes from "./newRoutes/matrixTemplateRoutes.mts";
import profileRoutes from "./newRoutes/matrixProfileRoutes.mts";

// Probably needs fileUrlToPath and path.dirname convertion in order to work
const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: path.resolve(__dirname, "newConfig", ".env") });
// console.log(process.env);

const PORT = process.env.PORT || 8080;
const server = express();

// Sets up express to find both backend and frontend.
server.use(cors());
server.use(express.json());
server.use(express.static("public"));

// Route imports
server.use("/templates", templateRoutes);
server.use("/profiles", profileRoutes);

// Handles browser refreshes
server.use('/{*splat}', (request, response) => {
  response.sendFile('index.html', { root: 'public' });
});

// Handles errors that call next()
server.use(errorHandler);

// Start server and handle errors if it doesn't
server.listen(PORT, async () => {
  try {
    //
  } catch (error) {
    console.error("Server failed to start:", {
      // If error is known, show message, otherwise show "Unknown error"
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
    // Log the exit due to error
    process.on("exit", (code) => {
      console.log(`About to exit with code: ${code}`);
    });
  }
  console.log(`Server is running on port: ${PORT}`);
});

// Look into process.on('exit') listeners.

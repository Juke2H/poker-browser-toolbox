import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import { MongoClient } from "mongodb";

//Configure .env. I'm not sure if this is necessary since running locally only takes ".env" and not "config.env"
import { config } from 'dotenv';
config({ path: './config.env' });

//Need to import all collections
import cashBB from "./routes/dbcash/bb.mjs";
import cashSB from "./routes/dbcash/sb.mjs";
import cashBTN from "./routes/dbcash/btn.mjs";
import cashCO from "./routes/dbcash/co.mjs";
import cashHJ from "./routes/dbcash/hj.mjs";
import cashLJ from "./routes/dbcash/lj.mjs";
import cashMP from "./routes/dbcash/mp.mjs";
import cashUTG1 from "./routes/dbcash/utg1.mjs";
import cashUTG from "./routes/dbcash/utg.mjs";

import mttBB from "./routes/dbmtt/bb.mjs";
import mttSB from "./routes/dbmtt/sb.mjs";
import mttBTN from "./routes/dbmtt/btn.mjs";
import mttCO from "./routes/dbmtt/co.mjs";
import mttHJ from "./routes/dbmtt/hj.mjs";
import mttLJ from "./routes/dbmtt/lj.mjs";
import mttMP from "./routes/dbmtt/mp.mjs";
import mttUTG1 from "./routes/dbmtt/utg1.mjs";
import mttUTG from "./routes/dbmtt/utg.mjs";

const PORT = process.env.PORT || 8080;
const app = express();

//Sets up express to find both backend and frontend.
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

//Shows express all the different collections
app.use("/cashbb", cashBB);
app.use("/cashsb", cashSB);
app.use("/cashbtn", cashBTN);
app.use("/cashco", cashCO);
app.use("/cashhj", cashHJ);
app.use("/cashlj", cashLJ);
app.use("/cashmp", cashMP);
app.use("/cashutg1", cashUTG1);
app.use("/cashutg", cashUTG);

app.use("/mttbb", mttBB);
app.use("/mttsb", mttSB);
app.use("/mttbtn", mttBTN);
app.use("/mttco", mttCO);
app.use("/mtthj", mttHJ);
app.use("/mttlj", mttLJ);
app.use("/mttmp", mttMP);
app.use("/mttutg1", mttUTG1);
app.use("/mttutg", mttUTG);

// Handles browser refreshes
app.use('/{*splat}', (req,res) => {
  res.sendFile('index.html', { root: 'public' });
});

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);


// Start the Express server
app.listen(PORT, async () => {
  // Perform database connection when server starts
  try {
    // Attempt to establish a connection to the MongoDB server
    await client.connect();
    console.log("MongoDB connection successful");
  } catch (e) {
    // If an error occurs during connection, log the error message
    console.error(e);
  };
  console.log(`Server is running on port: ${PORT}`);
});

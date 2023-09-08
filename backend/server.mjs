import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";

import { config } from 'dotenv';
config({ path: './config.env' });

//Import databases
import dbCash from "./dbconn/connCash.mjs";
import dbMTT from "./dbconn/connMTT.mjs";

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

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

//I feel like there's a better way to do this.
//I just don't have an idea on what that could be, or how to approach it.

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

// Start the Express server
app.listen(PORT, () => {
  // Perform database connection when server starts
  dbCash.connectToServer(function (err) {
    if (err) console.error(err);
  });
  dbMTT.connectToServer(function (err) {
    if (err) console.error(err);
  })

  console.log(`Server is running on port: ${PORT}`);
});

import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";
import { config } from "dotenv";
import { rangeProfileQueries } from "../newDataAccess/rangeProfileData.mts";

config();

// Create a single supabase client for interacting with your database
// Needs to be rewritten to accept the DAO class
// Do I initialize the new DAO here or elsewhere?
const supabase = createClient<Database>(
  `${process.env.SUPABASE_DB_URL}`,
  `${process.env.SUPABASE_ANON_KEY}`
);

// Initializes a supabase client with range profile data queries imported
export const rangeProfileRepository = new rangeProfileQueries(supabase);

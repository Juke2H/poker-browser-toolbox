import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";
import { config } from "dotenv";

config();

// Create a single supabase client for interacting with your database
// Needs to be rewritten to accept the DAO class
// Do I initialize the new DAO here or elsewhere?
export const supabase = createClient<Database>(
  `${process.env.SUPABASE_DB_URL}`,
  `${process.env.SUPABASE_ANON_KEY}`
);
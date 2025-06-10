import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";
import { config } from "dotenv";
import { rangeProfileQueries } from "../newDataAccess/rangeProfileData.mts";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// This dance with url and path seems to be necessary if .env is in module directory
// Seems to be easier (import.meta.dirname) on newer node versions
config({ path: path.resolve(__dirname, '.env') });

// console.log('Current directory:', __dirname);
// console.log('Environment variables:', { 
//   SUPABASE_DB_URL: process.env.SUPABASE_DB_URL,
//   SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY 
// });

// Create a single supabase client for interacting with your database
// Asserted both assuming that .env is setup properly. That might need to be confirmed
const supabase = createClient<Database>(
  process.env.SUPABASE_DB_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Initializes a supabase client with range profile data queries imported
export const rangeProfileRepository = new rangeProfileQueries(supabase);

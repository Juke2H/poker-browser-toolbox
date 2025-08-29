import { createClient } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./supabase";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import { profileSelect } from "../newDataAccess/profileSelect.mts";
import { profileInsert } from "../newDataAccess/profileInsert.mts";
import { profileUpdate } from "../newDataAccess/profileUpdate.mts";
import { profileDelete } from "../newDataAccess/profileDelete.mts";

// fileURLToPath converts file url to path, and import.meta.url is the absolute file url of this module.
// dirname returns the directory name (and path to it) this module is in
const __dirname = dirname(fileURLToPath(import.meta.url));

// Seems to be easier (import.meta.dirname) on newer node versions
config({ path: path.resolve(__dirname, ".env") });

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

// I use a repository factory to store the different query classes
// It's not necessary for something this small but I don't have much experience with classes and getters so I want to get some practice in
class profileRepositoryFactory {
  constructor(private client: SupabaseClient) {} // Constructor initializes the client and the factory passes it along to the different query classes

  get select() {
    return new profileSelect(this.client); // The database client profileSelect wants is the same client the factory constructor initializes when called
  }

  get insert() {
    return new profileInsert(this.client);
  }

  get update() {
    return new profileUpdate(this.client);
  }

  get delete() {
    return new profileDelete(this.client);
  }
}

export const profileRepository = new profileRepositoryFactory(supabase);

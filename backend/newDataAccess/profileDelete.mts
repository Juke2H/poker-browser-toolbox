import { SupabaseClient } from "@supabase/supabase-js";
import {
  GameTypes,
  RangeProfileRow,
  RawProfileRange,
} from "./profileDataTypes.mts";

// Supabase provides an SQL to REST API Translator:
// https://supabase.com/docs/guides/api/sql-to-rest
export class profileDelete {
  constructor(private database: SupabaseClient) {}

  // Needs promise type
  // Receives a profile to be inserted into the templates (ie user is not logged in)
  async deleteTemplate(
    profile_id: String
  ): Promise<void> {

    let query = this.database
      .from("range_profiles")
      .delete()
      .eq("id", profile_id)
      .select() // Select is queried after to give me the data object for deleted profile

    const { data, error } = await query;

    if (error) throw error;
    if (data.length === 0) throw new Error("DELETE: No data returned");

    // Backticks to separate the console log
    console.log(`Deleted profile:
      ${JSON.stringify(data)}`);
  }

  // Fetch range profiles by owner_id (which will equal to userId later)
  // Can't test yet because user auth hasn't been implemented yet
  // async deleteById(
  //   ownerId: string | undefined,
  //   profileId: string
  // ): Promise<void> {
  //   let query = this.database.from("range_profiles");
  //   //. delete a profile by ownerid and something else

  //   const { data, error } = await query;

  //   if (error) {
  //     console.log(error);
  //     throw error;
  //   } else {
  //     console.log(data);
  //     return data;
  //   }
  // }
}

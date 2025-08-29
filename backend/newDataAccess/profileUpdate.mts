import { SupabaseClient } from "@supabase/supabase-js";
import {
  GameTypes,
  RangeProfileRow,
  RawProfileRange,
} from "./profileDataTypes.mts";

// Supabase provides an SQL to REST API Translator:
// https://supabase.com/docs/guides/api/sql-to-rest
export class profileUpdate {
  constructor(private database: SupabaseClient) {}

  // Needs promise type
  // Receives a profile to be inserted into the templates (ie user is not logged in)
  async updateTemplate(
    profile: RangeProfileRow,
    combos: Array<RawProfileRange>,
    profile_id: String
  ): Promise<any> {
    // Null check owner_id???

    //
    let query = this.database
      .from("range_profiles")
      .update([
        {
          profile_name: profile.profile_name,
          description: profile.description,
          range_type: profile.range_type,
          game_type: profile.game_type,
          stack_size: profile.stack_size,
          position: profile.position,
        },
      ])
      .eq("id", profile_id)
      .select() // Select is queried after to give me the data object for inserting ranges
      .single(); // Normally data is returned inside an array regardless of the number of rows. .single() turns the returned single row from [{...profile}] into {...profile}

    const { data, error } = await query;

    if (error) throw error;
    if (data.length === 0) throw new Error("No data returned");

    let comboDeleteQuery = this.database
      .from("profile_combos")
      .delete()
      .eq("profile_id", profile_id);

    const { error: deleteError } = await comboDeleteQuery;

    if (deleteError) throw new Error("Unable to delete previous combos");

    // After receiving the template's profile ID, map the combos array to add the profile ID
    const relatedCombos = combos.map((combo) => ({
      profile_id: profile_id,
      combo: combo.combo,
      play: combo.play,
    }));

    let comboQuery = this.database
      .from("profile_combos")
      .insert(relatedCombos)
      .select();

    const { data: comboData, error: comboError } = await comboQuery;

    if (comboError) throw error;

    // Backticks to separate the console log
    console.log(`Updated profile:
      ${JSON.stringify(data)}
      and combos:
      ${JSON.stringify(comboData)}`);
  }

  // Fetch range profiles by owner_id (which will equal to userId later)
  // Can't test yet because user auth hasn't been implemented yet
  // async updateById(
  //   ownerId: string | undefined,
  //   gameType: GameTypes
  // ): Promise<any> {
  //   let query = this.database.from("range_profiles");
  //   //. insert a profile by ownerid and something else

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

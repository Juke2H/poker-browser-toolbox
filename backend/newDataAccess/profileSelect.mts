// Query for data from DB and send it to the service

//Obviously change Promise<any> to corresponding type

import { SupabaseClient } from "@supabase/supabase-js";
import {
  GameTypes,
  RangeProfileRow,
  RawProfileRange,
} from "./profileDataTypes.mts";

// A class is used because it's easier to work with a database client when it's imported into the constructor

// Supabase provides an SQL to REST API Translator:
// https://supabase.com/docs/guides/api/sql-to-rest
export class profileSelect {
  constructor(private database: SupabaseClient) {}

  //.is(column, boolean/null)
  // Needs promise type
  async selectTemplates(gameType: GameTypes): Promise<any> {
    let query = this.database
      .from("range_profiles")
      .select(
        `
    id,
    profile_name,
    description,
    range_type,
    game_type,
    stack_size,
    position,
    profile_combos (
      combo,
      play
    )
    `
      )
      .is("is_template", true);

    // Add gameType filter to query if gameType is not all
    if (gameType != "all") {
      query = query.eq("game_type", gameType);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    } else {
      console.log(JSON.stringify(data));
      return data;
    }
  }

  // Fetch range profiles by owner_id (which will equal to userId later)
  // Can't test yet because user auth hasn't been implemented yet
  async selectById(
    ownerId: string | undefined,
    gameType: GameTypes
  ): Promise<any> {
    let query = this.database
      .from("range_profiles")
      .select(
        `
    id,
    profile_name,
    description,
    range_type,
    game_type,
    stack_size,
    position,
    profile_combos (
      combo,
      play
    )
    `
      )
      .eq("owner_id", ownerId);

    // Add gameType filter if gameType is not all
    if (gameType != "all") {
      query = query.eq("game_type", gameType);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return data;
    }
  }
}

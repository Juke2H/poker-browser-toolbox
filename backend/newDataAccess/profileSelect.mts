// Query for data from DB and send it to the service
// Receive data from service and store it into the db

//Note to self, this doesn't include game type (cash, mtt)
//The database doesn't differentiate either so I need to recreate the db at some point
//The raw data does have game types, however, so it shouldn't be too difficult

//Obviously change Promise<any> to corresponding type

import { SupabaseClient } from "@supabase/supabase-js";
import {
  GameTypes,
  NewRangeProfile,
  RangeProfileRow,
  RawProfileRange,
} from "./profileDataTypes.mts";

//A class for profile data access
//Class might need to Implement an interface

//A class is used because it's easier to work with a database client when it's imported into the constructor

// Supabase provides an SQL to REST API Translator:
// https://supabase.com/docs/guides/api/sql-to-rest
export class profileSelect {
  constructor(private database: SupabaseClient) {}

  //.is(column, boolean/null)
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
    is_template,
    owner_id,
    profile_combos (
      combo,
      play
    )
    `
      )
      .is("is_template", true);

    // Add gameType filter if gameType is not all
    if (gameType != "all") {
      query = query.eq("game_type", gameType);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    } else {
      console.log(data);
      return data;
    }
  }

  async selectCashTemplates(): Promise<any> {
    //
  }

  async selectMttTemplates(): Promise<any> {
    //
  }

  //FetchById and fetchProfileCombos are separate because there are A LOT of combos and plays
  //Profiles might also not have combos someday, or I don't need to refetch the combos if I want the rest etc.
  //Check if undefined?
  async selectById(profileId: string | undefined): Promise<any> {
    const { data, error } = await this.database
      .from("range_profiles")
      .select()
      .eq("id", profileId);
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return data;
    }
  }

  //Fetches profiles and combos
  //Return is an array with a single object that has a nested profile_combos object with hand and play
  async selectWithCombos(profileId: string | undefined): Promise<any> {
    const { data, error } = await this.database
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
    is_template,
    owner_id,
    profile_combos (
      combo,
      play
    )
    `
      )
      .eq("id", profileId);
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(JSON.stringify(data));
      return data;
    }
  }

  //Fetches only combos
  //This is likely wrong because PostgREST does not like spread operators in one-many and many-many
  async selectOnlyCombos(profileId: string): Promise<any> {
    const { data, error } = await this.database
      .from("profile_combos")
      .select(
        `
    combo,
    play,
    ...hand_combos!inner()
    `
      )
      .eq("profile_id", `${profileId}`);
    if (error) {
      throw error;
    } else {
      return data;
    }
  }
}

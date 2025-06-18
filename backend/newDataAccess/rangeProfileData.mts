// Query for data from DB and send it to the service
// Receive data from service and store it into the db

//Note to self, this doesn't include game type (cash, mtt)
//The database doesn't differentiate either so I need to recreate the db at some point
//The raw data does have game types, however, so it shouldn't be too difficult

//Obviously change Promise<any> to corresponding type

import { SupabaseClient } from "@supabase/supabase-js";
import {
  NewRangeProfile,
  RangeProfileRow,
  RawProfileRange,
} from "./rangeProfileInterface.mts";

//A class for profile data access
//Class might need to Implement an interface

//A class is used because it's easier to work with a database client when it's imported into the constructor

// Supabase provides an SQL to REST API Translator:
// https://supabase.com/docs/guides/api/sql-to-rest
export class rangeProfileQueries {
  constructor(private database: SupabaseClient) {}

  //.is(column, boolean/null)
  async fetchAllTemplates(): Promise<any> {
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
      .is("is_template", true);
    if (error) {
      throw error;
    } else {
      console.log(data);
      return data;
    }
  }

  //FetchById and fetchProfileCombos are separate because there are A LOT of combos and plays
  //Profiles might also not have combos someday, or I don't need to refetch the combos if I want the rest etc.
  //Check if undefined?
  async fetchById(profileId: string | undefined): Promise<any> {
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
  async fetchWithCombos(profileId: string | undefined): Promise<any> {
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
  async fetchOnlyCombos(profileId: string): Promise<any> {
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

  //Inserts a row of values from the profile object
  // Promise<RangeProfileRow>
  async insertProfile(profile: NewRangeProfile): Promise<any> {
    const { data, error } = await this.database
      .from("range_profiles")
      .insert([
        { profile_name: `${profile.profile_name}` },
        { description: `${profile.description}` },
        { range_type: `${profile.range_type}` },
        { game_type: `${profile.game_type}` },
        { stack_size: `${profile.stack_size}` },
        { position: `${profile.position}` },
        { is_template: `${profile.is_template}` },
        { owner_id: `${profile.owner_id}` },
      ])
      .select();
    if (error) {
      throw error;
    } else {
      return data;
    }
  }

  //Add combos and plays to profile
  async insertCombos(profileId: string): Promise<any> {
    //join profile_id to range_profiles.id, add combo, add play, join combo to hand_combos.combo_name to make sure the combo is right.
  }

  // Promise<RangeProfileRow>
  async updateProfile(
    profileId: string,
    changes: Partial<NewRangeProfile>
  ): Promise<any> {
    //
  }

  async updateCombos(profileId: string, changes: any): Promise<any> {
    //
  }

  async deleteProfile(profileId: string): Promise<void> {
    //
  }
}

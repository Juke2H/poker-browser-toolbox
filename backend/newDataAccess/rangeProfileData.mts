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
  RawProfileRow,
} from "./rangeProfileInterface.mts";

//A class for profile data access
//Class might need to Implement an interface
export class rangeProfileQueries {
  constructor(private database: SupabaseClient) {}

  //FetchById and fetchProfileCombos are separate because there are A LOT of combos and plays
  //Profiles might also not have combos someday, or I don't need to refetch the combos if I want the rest etc.
  async fetchById(profileId: string): Promise<any> {
    const { data, error } = await this.database
      .from("range_profiles")
      .select()
      .eq("id", `${profileId}`);
    if (error) {
      throw error;
    } else {
      return data;
    }
  }

  //Fetches profiles and combos
  async fetchWithCombos(profileId: string): Promise<any> {
    //
  }

  //Fetches only combos

  async fetchOnlyCombos(profileId: string): Promise<any> {
    //
  }

  //Profile interface
  async insertProfile(profile: NewRangeProfile): Promise<RangeProfileRow> {
    //
  }

  //Add combos and plays to profile
  async insertCombos(profileId: string): Promise<any> {
    //join profile_id to range_profiles.id, add combo, add play, join combo to hand_combos.combo_name to make sure the combo is right.
  }

  async updateProfile(
    profileId: string,
    changes: Partial<NewRangeProfile>
  ): Promise<RangeProfileRow> {
    //
  }

  async updateCombos(profileId: string, changes: any): Promise<any> {
    //
  }

  async deleteProfile(profileId: string): Promise<void> {
    //
  }
}

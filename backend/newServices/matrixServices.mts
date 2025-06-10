// The service class is supposed to be written in a way that I can use mock data to test the functions.
// Ie. receive data, return result
// This return can then be sent to the db or frontend depending.

//The frontend currently does CRUD operations with the following form structure:
//Initially this service layer should manipulate the data from this to something the db can receive, or from db into this.
/*  type Profile = {
    _id?: string;
    profilename: string;
    range: {
      call: string[];
      raise: string[];
    };
    description: string;
    type: string;
    stack: string;
  } */

import { rangeProfileRepository } from "../newConfig/dbClient.mts";
import { RawProfileRow } from "../newDataAccess/rangeProfileInterface.mts";

export type ProfileRanges = {
  call: Array<string>;
  raise: Array<string>;
};

export type ProfileTypes = {
  _id: string;
  profileName: string;
  description: string | null;
  rangeType: string;
  gameType: string;
  stackSize: string;
  position: string;
  isTemplate: boolean;
  ownerId: string | null;
  range?: ProfileRanges;
};

// No class needed because service functions do not maintain a state/instance/class/etc
export async function parseProfile(profileId: string): Promise<ProfileTypes> {
  const rows: Array<RawProfileRow> = await rangeProfileRepository.fetchById(
    profileId
  );

  //Check if profile was found
  if (rows.length === 0) {
    throw new Error("Profile not found");
  }

  //Takes the Raw Profile Row, destructures and assigns the keys to local variables in camelCase
  const {
    id: _id,
    profile_name: profileName,
    description,
    range_type: rangeType,
    game_type: gameType,
    stack_size: stackSize,
    position,
    is_template: isTemplate,
    owner_id: ownerId,
  } = rows[0];

  const parsedProfileRow: ProfileTypes = {
    _id,
    profileName,
    description,
    rangeType,
    gameType,
    stackSize,
    position,
    isTemplate,
    ownerId,
  };

  return parsedProfileRow;
}

// The return is an array with objects representing rows
// In this case probably a row (ie an object) per play
export async function parsedProfileWithRanges(
  profileId: string
): Promise<ProfileTypes> {
  const rows: Array<RawProfileRow> = await rangeProfileRepository.fetchById(
    profileId
  );

  //Check if profile was found
  if (rows.length === 0) {
    throw new Error("Profile not found");
  }
  //
}

export async function parseRanges(profileId: string): Promise<ProfileRanges> {
  //
}

// Should Insert/Update/Delete functions be here too?

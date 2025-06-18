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
import {
  RangeProfileRow,
  RawProfileRange,
} from "../newDataAccess/rangeProfileInterface.mts";

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
  const rows: Array<RangeProfileRow> = await rangeProfileRepository.fetchById(
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
// The return needs to be JSON.stringify'd
export async function parsedProfileWithRanges(
  profileId: string
): Promise<ProfileTypes> {
  const rows: Array<RangeProfileRow> =
    await rangeProfileRepository.fetchWithCombos(profileId);

  //Check if profile was found
  if (rows.length === 0) {
    throw new Error("Profile not found");
  }
  //
}

export async function parseRanges(profileId: string): Promise<ProfileRanges> {
  //
}

// Parses fetched templates
export async function parseTemplates(): Promise<Array<ProfileTypes>> {
  const templates: Array<RangeProfileRow> =
    await rangeProfileRepository.fetchAllTemplates();

  if (templates.length === 0) {
    throw new Error("Templates not found");
  }

  const parsedTemplates: Array<ProfileTypes> = templates.map((template) => {
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
    } = template;

    //If the profile doesn't have combos, skip the rest
    if (!template.profile_combos) {
      console.warn(`Missing combos for template ID: ${template.id}`);

      //Return written open both for readability and to transform Types
      return {
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
    }

    const parsedCombos: ProfileRanges = {
      call: [],
      raise: [],
    };

    // A destructured parameter assigns variables combo and play to the values that match those keys
    template.profile_combos.forEach(({ combo, play }) => {
      parsedCombos[play].push(combo);
    });

    // Written open to transform Types
    return {
      _id,
      profileName,
      description,
      rangeType,
      gameType,
      stackSize,
      position,
      isTemplate,
      ownerId,
      range: parsedCombos,
    };
  });
  console.log(parsedTemplates);
  return parsedTemplates;
}

// Should Insert/Update/Delete functions be here too?

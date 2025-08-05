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

import { profileSelectRepository } from "../newConfig/dbClient.mts";
import {
  RangeProfileRow,
  RawProfileRange,
  GameTypes,
} from "../newDataAccess/profileDataTypes.mts";

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
  isTemplate?: boolean;
  ownerId?: string | null;
  range?: ProfileRanges;
};

// Parses fetched templates
// No class needed because service functions do not maintain a state/instance/class/etc
export async function parseTemplates(
  templateFunc: (gameType: GameTypes) => Promise<Array<RangeProfileRow>>,
  gameType: GameTypes
): Promise<Array<ProfileTypes>> {
  const templates = await templateFunc(gameType);

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
      range: parsedCombos,
    };
  });
  console.log(parsedTemplates);
  return parsedTemplates;
}

export async function parseProfiles(
  profileFunc: (
    ownerId: string | undefined,
    gameType: GameTypes
  ) => Promise<Array<RangeProfileRow>>,
  gameType: GameTypes,
  ownerId: string | undefined
): Promise<Array<ProfileTypes>> {
  const profiles = await profileFunc(ownerId, gameType);

  if (profiles.length === 0) {
    throw new Error("Templates not found");
  }

  const parsedProfiles: Array<ProfileTypes> = profiles.map((profile) => {
    const {
      id: _id,
      profile_name: profileName,
      description,
      range_type: rangeType,
      game_type: gameType,
      stack_size: stackSize,
      position,
    } = profile;

    //If the profile doesn't have combos, skip the rest
    if (!profile.profile_combos) {
      console.warn(`Missing combos for template ID: ${profile.id}`);

      //Return written open both for readability and to transform Types
      return {
        _id,
        profileName,
        description,
        rangeType,
        gameType,
        stackSize,
        position,
      };
    }

    const parsedCombos: ProfileRanges = {
      call: [],
      raise: [],
    };

    // A destructured parameter assigns variables combo and play to the values that match those keys
    profile.profile_combos.forEach(({ combo, play }) => {
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
      range: parsedCombos,
    };
  });
  console.log(parsedProfiles);
  return parsedProfiles;
}

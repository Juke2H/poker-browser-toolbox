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

import {
  RangeProfileRow,
  RawProfileRange,
  GameTypes,
} from "../newDataAccess/profileDataTypes.mts";

import { ProfileRangeTypes, ProfileTypes } from "./matrixServiceTypes.mts";

// Receives and parses fetched templates
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
    // Destructuring to reassign (rename) variables
    const {
      id: _id,
      profile_name: profileName,
      description,
      range_type: rangeType,
      game_type: gameType,
      stack_size: stackSize,
      position,
      profile_combos: range,
    } = template;

    const templateCombos: Array<RawProfileRange> | undefined =
      template.profile_combos;

    const parsedCombos: ProfileRangeTypes = {
      call: [],
      raise: [],
    };

    if (templateCombos) {
      // A destructured parameter assigns variables combo and play to the values that match those keys
      templateCombos.forEach(({ combo, play }) => {
        parsedCombos[play].push(combo);
      });
    } else {
      console.warn(`Missing combos for template id: ${_id}`);
    }

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
      profile_combos: range,
    } = profile;

    const profileCombos: Array<RawProfileRange> | undefined =
      profile.profile_combos;

    const parsedCombos: ProfileRangeTypes = {
      call: [],
      raise: [],
    };

    if (profileCombos) {
      // A destructured parameter assigns variables combo and play to the values that match those keys
      profileCombos.forEach(({ combo, play }) => {
        parsedCombos[play].push(combo);
      });
    } else {
      console.warn(`Missing combos for profile id: ${_id}`);
    }

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

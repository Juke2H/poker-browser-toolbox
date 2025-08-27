
import {
  RangeProfileRow,
  RawProfileRange,
  GameTypes,
} from "../newDataAccess/profileDataTypes.mts";

import { ProfileTypes, ProfileRangeTypes } from "./matrixServiceTypes.mts";

export async function parseTemplateUpdate(
  templateUpdatefunc: (
    insertedProfile: RangeProfileRow,
    insertedCombos: Array<RawProfileRange>,
    profileId: String
  ) => Promise<void>,
  receivedProfile: ProfileTypes, profileId: String,
) {
  // Receive a profile, parse it into a form that can be inserted into the db, then call the data access method.
  // Make sure to filter out duplicate combos.
  const template = receivedProfile;

  //??? Check partial types?

  const parsedProfile: Partial<RangeProfileRow> = {
    profile_name: template.profileName,
    description: template.description,
    range_type: template.rangeType,
    game_type: template.gameType,
    stack_size: template.stackSize,
    position: template.position,
  };

  // Creates new sets to store unique values and then makes arrays from those sets
  if (template.range) {
    const uniqueCalls = Array.from(new Set(template.range.call));
    const uniqueRaises = Array.from(new Set(template.range.raise));

    const combinedRange: Array<RawProfileRange> = [];
    uniqueCalls.forEach((combo) => {
      combinedRange.push({ combo: combo, play: "call" });
    });

    uniqueRaises.forEach((combo) => {
      combinedRange.push({ combo: combo, play: "raise" });
    });

    console.log(`
      Parsed profile: ${JSON.stringify(parsedProfile)}
      Parsed range: ${JSON.stringify(combinedRange)}`);

    templateUpdatefunc(parsedProfile, combinedRange, profileId)
  }
}

export async function parseProfileInsert(
  profileInsertfunc: (insertedProfile: RangeProfileRow) => Promise<void>,
  receivedProfile: ProfileTypes,
  ownerId: string
) {
  //
}

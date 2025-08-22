// Combos need to be mapped to match RawProfileRange typing without the ID
// Meaning [{combo: x, play: y}, {...}, {...}]

import {
  RangeProfileRow,
  NewRangeProfile,
  RawProfileRange,
  GameTypes,
} from "../newDataAccess/profileDataTypes.mts";

import { ProfileTypes, ProfileRangeTypes } from "./matrixServiceTypes.mts";

export async function parseTemplateInsert(
  templateInsertfunc: (insertedProfile: NewRangeProfile) => Promise<void>,
  receivedProfile: ProfileTypes
) {
  //
}

export async function parseProfileInsert(
  profileInsertfunc: (insertedProfile: NewRangeProfile) => Promise<void>,
  receivedProfile: ProfileTypes,
  ownerId: string
) {
  //
}

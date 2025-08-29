import {
  RangeProfileRow,
  RawProfileRange,
  GameTypes,
} from "../newDataAccess/profileDataTypes.mts";

import { ProfileTypes, ProfileRangeTypes } from "./matrixServiceTypes.mts";

export async function parseTemplateDelete(
  templateDeletefunc: (profileId: String) => Promise<void>,
  profileId: String
) {
  // Receive a profileId, runs DELETE request

  // If there is logic to be ran before running DELETE function, it goes here
  
  templateDeletefunc(profileId);
}

export async function parseProfileDelete(
  profileDeletefunc: (ownerId, profileId) => Promise<void>,
  ownerId: string,
  profileId: string
) {
  //
}

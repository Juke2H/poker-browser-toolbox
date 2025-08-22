
export type ProfileRangeTypes = {
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
  range?: ProfileRangeTypes;
};
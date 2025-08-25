
export type ProfileRangeTypes = {
  call: Array<string>;
  raise: Array<string>;
};

// Maybe these types need to be separated for each CRUD operation if necessary.

// For example, INSERT statements have to receive ownerId and template information
// but SELECT statement returns don't need it because it's used as a condition
export type ProfileTypes = {
  _id?: string;
  profileName: string;
  description: string | null;
  rangeType: string;
  gameType: string;
  stackSize: string;
  position: string;
  isTemplate?: boolean;
  ownerId?: string | null;
  range: ProfileRangeTypes;
};
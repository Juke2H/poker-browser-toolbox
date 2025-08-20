// Needs interface for the Class maybe

// Types for rows:
// Types instead of interfaces to prevent multiple declarations merging
export type RangeProfileRow = {
  id: string;
  profile_name: string;
  description: string | null;
  range_type: string;
  game_type: string;
  stack_size: string;
  position: string;
  is_template: boolean;
  owner_id: string | null;
  created_at: string;
  profile_combos?: Array<RawProfileRange>;
};

// Type for inserting/updating
// Differences are that id and created_at are created during query
// profile_combos are in a different table that need the id for its foreign key
export type NewRangeProfile = {
  profile_name: string;
  description: string | null;
  range_type: string;
  game_type: string;
  stack_size: string;
  position: string;
  is_template: boolean;
  owner_id: string | null;
};

// Type for the combos
export type RawProfileRange = {
  profile_id?: string;
  combo: string;
  play: "call" | "raise";
};

// Type for functions reliant on game type
export type GameTypes = "all" | "cash" | "tournament";

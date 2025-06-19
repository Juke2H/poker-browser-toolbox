// Needs interface for the Class

// Types for rows:
// Types instead of interfaces to prevent multiple declarations merging
// as well as no need for optional values in db queries
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

export type RawProfileRange = {
  combo: string;
  play: "call" | "raise";
};

// Type for inserting/updating:
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

// Type for functions reliant on game type
export type GameTypes = "all" | "cash" | "tournament";

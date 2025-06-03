// Needs interface for the Class

// Types for rows:
export type RangeProfileRow = {
  id: string;
  profile_name: string;
  description: string | null;
  range_type: string;
  stack_size: string;
  position: string | null;
  is_template: boolean;
  owner_id: string;
  created_at: string;
};

export type RawProfileRow = RangeProfileRow & {
  combo: string | null;
  play: 'call' | 'raise' | null;
};

// Type for inserting/updating:
export type NewRangeProfile = {
  profile_name: string;
  description?: string;
  range_type: string;
  stack_size: string;
  position?: string;
  is_template?: boolean;
  owner_id: string;
};
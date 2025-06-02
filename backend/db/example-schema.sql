-- Table that can receive raw jsonb data --
CREATE TABLE raw_ranges (
    doc jsonb NOT NULL
);

-- When row security is enabled, normal row access by users must be permitted by a row security policy --
ALTER TABLE raw_ranges ENABLE ROW LEVEL SECURITY;

-- Table for user profiles for when I get to adding auth and profiles --
CREATE TABLE public.user_profiles (
    id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    profilename text,
    created_at timestamptz DEFAULT NOW(),

    PRIMARY KEY (id)
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Supabase bootstrap function --
-- inserts a row into public.user_profiles --
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.user_profiles (id, profilename)
  values (new.id, new.raw_user_meta_data ->> 'profilename');
  return new;
end;
$$;
-- trigger the function every time a user is created --
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- main table telling range type, stack, position, game type, description etc. --
CREATE TABLE range_profiles (
    id uuid DEFAULT gen_random_uuid(),
    profile_name text NOT NULL,
    description text,
    range_type text,
    stack_size text,
    position text, -- Should maybe be constrained, though maybe I also want to expand to 10 player tables, hmm
    is_template boolean DEFAULT FALSE,
    owner_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),

    PRIMARY KEY (id)
);

ALTER TABLE range_profiles ENABLE ROW LEVEL SECURITY;

-- Combo matrix table / master hand list --
CREATE TABLE hand_combos (
    combo_name text UNIQUE PRIMARY KEY
);

ALTER TABLE hand_combos ENABLE ROW LEVEL SECURITY;

-- The range table, references combos and adds play actions to them --
CREATE TABLE profile_combos (
    id SERIAL,
    profile_id uuid REFERENCES range_profiles(id) ON DELETE CASCADE,
    combo text REFERENCES hand_combos(combo_name),
    play text CONSTRAINT validity CHECK (play in ('call', 'raise')), -- Only call or raise

    PRIMARY KEY (id)
);

-- Add protection from duplicates --
ALTER TABLE profile_combos
ADD CONSTRAINT unique_profile_combo_play UNIQUE (profile_id, combo, play);

ALTER TABLE profile_combos ENABLE ROW LEVEL SECURITY;
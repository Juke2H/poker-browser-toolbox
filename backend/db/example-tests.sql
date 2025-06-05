-- Fail if any combos are missing from master table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM profile_combos pc
    LEFT JOIN hand_combos hc ON pc.combo = hc.combo_name
    WHERE hc.combo_name IS NULL
  ) THEN
    RAISE EXCEPTION 'Some combos in profile_combos are not in hand_combos';
  END IF;
END
$$;

-- More tests --
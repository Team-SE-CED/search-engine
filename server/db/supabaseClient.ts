import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hnlqwrezymvlijosqwrn.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubHF3cmV6eW12bGlqb3Nxd3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MDU4MTQsImV4cCI6MjA0MzE4MTgxNH0.PuJTp_7OX8D894OwA6xr797JGxw4jQIL0vlLDrir74I";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// DO NOT REMOVE -Jimar

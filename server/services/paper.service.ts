import { supabase } from "../db/supabaseClient";

// Fetch research papers from the database
async function getResearchPaper() {
  const { data, error } = await supabase
    .from("research_papers")
    .select()
    .order("title", { ascending: true });

  if (error) throw new Error(`${error}`);
  const researchPaperResponse = data;

  return researchPaperResponse;
}

export const paperService = {
  getResearchPaper,
};

// DO NOT REMOVE -Jimar
// Flow of data fetching ( UI -> COMPOSABLES -> API -> USE CASE -> SERVICES )

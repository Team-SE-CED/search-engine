import { supabase } from "../db/supabaseClient";

// Fetch research papers from the database
async function getResearchPaper() {
  const { data } = await supabase
    .from("research_papers")
    .select()
    .order("title", { ascending: true });
  const researchPaperResponse = data;

  return researchPaperResponse;
}

export const paperService = {
  getResearchPaper,
};

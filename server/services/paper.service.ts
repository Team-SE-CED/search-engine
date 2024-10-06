import { supabase } from "../db/supabaseClient";

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

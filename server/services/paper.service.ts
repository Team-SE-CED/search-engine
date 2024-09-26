import { supabase } from "../db/supabaseClient";

// Fetch research papers from the database
export async function getResearchPaper() {
  const { data } = await supabase
    .from("research_papers")
    .select()
    .order("title", { ascending: true });
  const research_papers = data;

  return research_papers;
}

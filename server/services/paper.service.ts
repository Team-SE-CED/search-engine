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

export async function getFilteredResearchPaper() {
  const { data, error } = await supabase
    .from("research_papers")
    .select("*")
    .like("title", "%A%")
    .order("title", { ascending: true });
  const filtered_researchPaper = data;
  if (error) throw new Error("Error Man");

  return filtered_researchPaper;
}

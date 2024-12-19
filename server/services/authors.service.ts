import { supabase } from "../db/supabaseClient";

async function getAuthors() {
  const { data, error } = await supabase
    .from("authors")
    .select()
    .order("author_name", { ascending: true });

  if (error) throw new Error(`${error}`);
  const authorResponse = data;

  return authorResponse;
}

export const authorService = {
  getAuthors,
};

import { Paper } from "~/server/types/research-paper-server";
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data } = await client
    .from("research_papers")
    .select()
    .order("title", { ascending: true });
  const response = data as Paper[];

  return response;
});

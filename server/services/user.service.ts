import { supabase } from "../db/supabaseClient";

async function getUser() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) throw new Error(`${error}`);
  const userDataResponse = data;

  return userDataResponse;
}

export const userDataService = {
    getUser,
};
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  // read email from request Body
  const body = await readBody(event);
  const { email } = body;

  if(!email) {
    return {exists: false, error: 'No email provided'};
  }
  
  const client = await serverSupabaseClient(event);

  // check if existing user already exists
  const { data, error } = await client
    .from('auth.users')
    .select('email')
    .eq('email', email )
    .single();
  
  if (error) {
    // if no record found, email does not exist
    return { exists: false };
  }
  // if email exists, return true
  return { exists: !!data };
})

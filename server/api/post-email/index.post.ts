import { serverSupabaseClient } from '#supabase/server';

interface EmailCheckResponse {
  exists: boolean;
  error?: string;
}

export default defineEventHandler(async (event): Promise<EmailCheckResponse> => {
  try {
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
    return { exists: true };
    
  } catch (error) {
    console.error('Error checking email:', error);
    return { exists: false, error: 'Server error occurred' };
  }
  
})

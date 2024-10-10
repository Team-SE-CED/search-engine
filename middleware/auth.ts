// middleware/auth.js
import { supabase } from '@/server/db/supabaseClient'; // Make sure your supabase client is set up


export default async function ({ redirect }: any) {
  const user = supabase.auth.getUser(); // Check if a user is logged in

  if (!user) {
    // If no user is found, redirect to login page
    return redirect('/login');
  }
}

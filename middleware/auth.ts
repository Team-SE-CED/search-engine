// middleware/auth.js
import { supabase } from '~/supabase'; // Make sure your supabase client is set up

export default async function ({ redirect }) {
  const user = supabase.auth.user(); // Check if a user is logged in

  if (!user) {
    // If no user is found, redirect to login page
    return redirect('/login');
  }
}

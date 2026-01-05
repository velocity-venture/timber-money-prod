import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xcwaokogeauojauccwjj.supabase.co';
const supabaseAnonKey = 'sb_publishable_bddJJPNVF_d9APTPChlHbQ_GDDjNLQT';

let supabase: SupabaseClient | null = null;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Supabase will be null, but app should still work
}

export { supabase };


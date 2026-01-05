import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xcwaokogeauojauccwjj.supabase.co';
const supabaseAnonKey = 'sb_publishable_bddJJPNVF_d9APTPChlHbQ_GDDjNLQT';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


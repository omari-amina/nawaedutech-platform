import { createClient } from '@supabase/supabase-js';

// Env-first (VITE_*), fallback vers constantes legacy pour compat locale.
const FALLBACK_URL = 'https://ratmxrzgwsrtswxitmui.supabase.co';
const FALLBACK_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdG14cnpnd3NydHN3eGl0bXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDEyMDEsImV4cCI6MjA3NzU3NzIwMX0.BHKEd2YUAWc9YMZF-QKHfKTGL1YMBKoRQKu1FyMTqcA';

const env = (import.meta as any).env ?? {};
const supabaseUrl: string = env.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey: string = env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON;

export const isSupabaseConfigured = () =>
  Boolean(env.VITE_SUPABASE_URL || env.VITE_SUPABASE_ANON_KEY || (FALLBACK_URL && FALLBACK_ANON));

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

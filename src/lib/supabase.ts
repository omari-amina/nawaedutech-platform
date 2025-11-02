import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ratmxrzgwsrtswxitmui.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdG14cnpnd3NydHN3eGl0bXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMDEyMDEsImV4cCI6MjA3NzU3NzIwMX0.BHKEd2YUAWc9YMZF-QKHfKTGL1YMBKoRQKu1FyMTqcA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://chucshkpvltvnqkxvwka.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNodWNzaGtwdmx0dm5xa3h2d2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTA0OTYsImV4cCI6MjA2MzU2NjQ5Nn0.sLVape63gA9MDSNXrEy8HyS6vA8TChH-0kwNa3xtl_A";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

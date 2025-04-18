
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://llbwgcleqcnwkymzdtne.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYndnY2xlcWNud2t5bXpkdG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1Nzk3OTEsImV4cCI6MjA1OTE1NTc5MX0.OkeN2K0kdLeQYi8TytAKf9qDXko6Gn8xEHwmWFTQsiQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        "Accept": "application/json",
      },
    },
  }
);

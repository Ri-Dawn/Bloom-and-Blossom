import { createClient } from '@supabase/supabase-js';

// Server-only client using the service role key. Never import this into a
// client component — it bypasses Row Level Security entirely.
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase env vars are missing. Check .env.local');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

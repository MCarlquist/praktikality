import { createClient as createBrowserClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Create a Supabase browser client configured with the publishable URL and key from environment variables.
 *
 * @returns A Supabase browser client instance configured with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
 */
export function createOnlyClient() {
  return createBrowserClient(url, anonKey);
}
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    'https://swqhluhrkwdgcqsewskk.supabase.co',
    'sb_publishable_yZsEtHRqSlo5WAyYC2i4TQ_OBA9tPY6',
  );
}

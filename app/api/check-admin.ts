import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/supabase/admin";

/**
 * Handle GET requests that respond with whether the authenticated user is an administrator.
 *
 * Responds with 405 if the method is not GET, 401 if the request is unauthenticated, and 500 on internal errors.
 *
 * @returns A JSON HTTP response. On success: `{ admin: boolean }`. On error: `{ admin: false, error: string }` with the corresponding HTTP status code (405, 401, or 500).
 */
export default async function handler(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.auth.getClaims();
    const userId = data?.claims?.sub;

    if (!userId) {
      return NextResponse.json({ admin: false, error: "Not authenticated" }, { status: 401 });
    }
    const { data: { user } } = await supabase.auth.getUser();
    console.log('User:', user);
    const admin = await isAdmin(user!.id);
    return NextResponse.json({ admin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ admin: false, error: "Internal server error" }, { status: 500 });
  }
}
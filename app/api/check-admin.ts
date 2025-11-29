import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/supabase/admin";

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
    const admin = await isAdmin(user!.id);
    return NextResponse.json({ admin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ admin: false, error: "Internal server error" }, { status: 500 });
  }
}
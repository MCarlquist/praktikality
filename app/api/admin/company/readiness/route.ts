import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  try {
    const { id, updatedCompany } = await request.json();
    

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("companies")
      .update({ ready_for_intern: updatedCompany.ready_for_intern })
      .eq("id", id)
      .select("id, ready_for_intern")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Company not found or update is not permitted" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, company: data });
  } catch (error) {
    console.error("Failed to update company readiness", error);
    return NextResponse.json(
      { success: false, error: "Failed to update company readiness" },
      { status: 500 },
    );
  }
}
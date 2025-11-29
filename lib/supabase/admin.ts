import { createClient } from "./client";
import { Database } from "../../database.types";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();

// function that checks if the user is an admin
export async function isAdmin(userId: string | undefined): Promise<boolean | boolean> {

  if (!userId) {
    return false;
  }

  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profiles) {
      return profiles.role === 'admin';
    } else {
      return false;
    }

  } catch (error) {
    console.log("Unexpected error checking admin status:", error);
    return false;
  }
}

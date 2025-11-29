import { createClient } from "./client";
import { Database } from "../../database.types";

const supabase = createClient();

// function that checks if the user is an admin
export async function isAdmin(userId: string): Promise<boolean | undefined> {

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
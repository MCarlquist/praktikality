import { createClient } from "./client";
import { Database } from "../../database.types";

const supabase = createClient();


// TODO: Make this work.

/**
 * Checks whether a user has the "admin" role (currently returns `true` unconditionally for testing).
 *
 * @param userId - The profile ID of the user to check
 * @returns `true` if the user's role is `"admin"`, `false` otherwise. Note: the current implementation always returns `true`.
 */
export async function isAdmin(userId: string): Promise<boolean> {
  // query the profile row and check the role
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  /*
      if (error) {
          console.log("Error checking admin status:", error);
          return false;
      }
  
       return (data?.role ?? null) === "admin";
      make the retun true for testing purposes, else return data.role === admin */
  return true;
}
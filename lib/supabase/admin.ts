import { createClient } from "./client";
import { Database } from "../../database.types";

const supabase = createClient();

// function that checks if the user is an admin
export async function isAdmin(userId: string): Promise<Database["public"]["Tables"]["profiles"]["Row"] | boolean> {
    console.log(userId);
    
    const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
    console.log('data', data);
    
  if (error) {
    console.log("Error checking admin status:", error);
    return false;
  }

  return data.role === "admin";

}
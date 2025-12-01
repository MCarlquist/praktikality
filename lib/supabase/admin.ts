import { createClient } from "./client";
import { Database } from "../../database.types";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();


// TODO: Make this work.

// function that checks if the user is an admin
export async function isAdmin(userId: string): Promise<boolean> {
  console.log('isAdmin called with userId:', userId);
  // query the profile row and check the role
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
      if (error) {
          console.log("Error checking admin status:", error);
          return false;
      }

      
      
  
       return (data?.role ?? null) === "admin";
}
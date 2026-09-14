import { createClient } from "./client";

const supabase = createClient();

export async function getInitials(userId: string): Promise<string> {
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("initials")
        .eq("id", userId)
        .single();
        
        return profile?.initials;
}
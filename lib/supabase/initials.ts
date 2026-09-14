import { createClient } from "./client";

const supabase = createClient();

/**
 * Retrieve the initials stored in the profile identified by `userId`.
 *
 * @param userId - The profile ID to query.
 * @returns The stored initials, or `"??"` if the query fails or the profile has no initials.
 */
export async function getInitials(userId: string): Promise<string> {
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("initials")
        .eq("id", userId)
        .single();
        if (error) {
            return "??";
        }

        return profile?.initials ?? "??";
}

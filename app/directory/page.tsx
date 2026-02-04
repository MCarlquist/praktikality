import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import { SeachBar } from "@/components/SearchBar";

/**
 * Fetches the current user's authentication claims from Supabase.
 *
 * If fetching fails or no claims are present, triggers a redirect to "/auth/login".
 *
 * @returns A pretty-printed JSON string of the user's claims (2-space indentation)
 */


export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 text-center justify-center">
          <InfoIcon size="16" strokeWidth={2} />
          Sök nedanför för att hitta ett företag som passar dig...
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center text-center">
        <h2 className="font-bold text-2xl mb-4 text-center">Sök Företag</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <SeachBar />
          
        </Suspense>
      </div>
    </div>
  );
}
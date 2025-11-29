import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/client";

/**
 * Renders the admin page layout with top navigation, main content area, and footer; displays an environment-variable warning when required vars are missing or authentication controls otherwise.
 *
 * @param children - Content rendered inside the layout's main area.
 * @returns The complete admin layout element.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Praktikality</Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {children}
        </div>

        <Footer />
      </div>
    </main>
  );
}
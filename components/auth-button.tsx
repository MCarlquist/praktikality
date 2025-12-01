import Link from "next/link";
import { Button } from "./ui/button";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { isAdmin } from "@/lib/supabase/admin";

/**
 * Render authentication UI based on the current user's presence and admin role.
 *
 * @returns A JSX element that displays a greeting with an optional "Admin" link and a logout control when a user is authenticated, or "Sign in" and "Sign up" buttons when no user is authenticated.
 */
export async function AuthButton() {
  const supabase = await createServerSupabaseClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  // check if Admin
  const admin = await isAdmin(user?.sub!);
  
  return user ? (
    <div className="flex items-center gap-4">
      Hey, { user.email }
      { admin && (
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
      ) }
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
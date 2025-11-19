import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { isAdmin } from "@/lib/supabase/admin";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  // check if Admin
  const admin = await isAdmin(user?.sub!);
  console.log(admin);
  
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

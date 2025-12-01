import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isAdmin } from "./admin";
import { createClient } from "./client";

const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Ensures the Supabase session is synchronized with the incoming Next.js request and enforces route access based on authentication and admin status.
 *
 * @param request - The incoming Next.js request used to read cookies, URL path, and evaluate the current Supabase session
 * @returns A NextResponse that has Supabase cookies synchronized with the request and may be a redirect:
 * - Redirects to "/auth/login" when the request path is not "/" and there is no authenticated session, excluding paths starting with "/login" or "/auth".
 * - Redirects to "/" when the request path starts with "/admin" and the current user is not an admin.
 * - Otherwise returns a response preserving the request with any cookies set by the Supabase client.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const person = data?.claims;

  const { data: { user } } = await supabase.auth.getUser();
  const okAdmin = await isAdmin(user!.id);
  console.log('isAdmin check in updateSession:', okAdmin);

  if (
    request.nextUrl.pathname !== "/" &&
    !person &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Check admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!okAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPanel = path === "/panel" || path.startsWith("/panel/");
  const isAuthPage = path === "/giris" || path === "/kayit";

  if (isPanel && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/giris";
    redirectUrl.searchParams.set("next", path);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  if (isAuthPage && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/panel";
    redirectUrl.search = "";
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|music/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp3)$).*)",
  ],
};

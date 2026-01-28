import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_EMAIL = "admin@gmail.com"; // Only this email can access /admin

export async function middleware(req) {
  const res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const path = req.nextUrl.pathname;

  // Get verified user from Supabase
  const { data: { user } } = await supabase.auth.getUser();

  // If route is /admin/*
  if (path.startsWith("/admin")) {
    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return res; // admin allowed
  }

  // If route is /profile or /opportunities → only students
  if (path.startsWith("/profile") || path.startsWith("/opportunities")) {
    if (!user || user.email === ADMIN_EMAIL) {
      // admin cannot access student routes
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return res; // student allowed
  }

  // For all other routes, allow
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

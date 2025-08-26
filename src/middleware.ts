// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log("🔍 Middleware is running for:", req.nextUrl.pathname);

  const token = req.cookies.get("token")?.value;
  const publicPaths = ["/signin", "/signup"];

  // Skip public routes
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If no token, redirect to signin
  if (!token) {
    console.log("❌ No token found, redirecting...");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    console.log("✅ Token valid, continuing...");
    return NextResponse.next();
  } catch (err) {
    console.log("❌ Invalid token:", err);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"], 
  // This protects ALL routes except:
  // - Next.js internals (_next/*, api/*, static/*, favicon.ico)
};

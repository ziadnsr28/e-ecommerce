import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Next.js 16 Proxy: intercepts requests to enforce authentication redirects for protected and guest-only routes.
export async function proxy(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const { pathname, search } = req.nextUrl;

    const isAuthPage = pathname === "/login" || pathname === "/register";

    // 1. If authenticated user tries to access login or register, redirect to home
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. If unauthenticated user tries to access protected pages, redirect to login with safe internal callbackUrl
    if (!token && !isAuthPage) {
        const redirectUrl = new URL("/login", req.url);
        // Only set callbackUrl for internal page routes
        const targetPath = pathname + search;
        redirectUrl.searchParams.set("callbackUrl", targetPath);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/brands/:path*",
        "/categories/:path*",
        "/checkout/:path*",
        "/allorders/:path*",
        "/profile/:path*",
        "/addresses/:path*",
        "/settings/:path*",
        "/login",
        "/register",
    ],
};
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// Extracts and decodes the NextAuth session token from server cookies to obtain the raw API token.
export async function getTokenServer(): Promise<string | null> {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieName = isProduction ? "__Secure-next-auth.session-token" : "next-auth.session-token";
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(cookieName)?.value;
    if (!sessionToken) return null; 
    try {
        const decodedToken = await decode({
            token: sessionToken,
            secret: process.env.AUTH_SECRET!,
        });
        if (!decodedToken) {
            return null;
        }
        return decodedToken.token as string;
    } catch (error) {
        console.error("مشكلة في قراءة التوكن:", error);
        return null;
    }
}
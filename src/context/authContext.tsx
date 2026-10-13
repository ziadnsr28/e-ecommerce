"use client"
import { SessionProvider } from "next-auth/react"

// Wraps the component tree with NextAuth's SessionProvider for client-side session access.
export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
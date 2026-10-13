import { postlogin } from "@/services/auth.service";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuration options for NextAuth authentication, session callbacks, and credentials provider.
const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    pages: {},
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            // Authenticates user credentials with the backend API and returns user data on success.
            authorize: async (credentials) => {
                if (!credentials) return null;
                const data = await postlogin({
                    email: credentials.email,
                    password: credentials.password,
                });
                if (data?.message === "success") {
                    return data;
                } else {
                    throw new Error(data?.message || "Invalid credentials");
                }
            },
        }),
    ],
    callbacks: {
        // Populates the JWT token with custom user details and authentication token.
        jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },
        // Forwards user details from JWT token to the active client session.
        session({ session, token }) {
            if (session) {
                session.user = token.user;
            }
            return session;
        },
    },
};

export default authOptions;
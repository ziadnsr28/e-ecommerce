"use client";

import Link from "next/link";
import { Phone, Mail, User, UserPlus, Truck, Sparkles, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

interface TopBarProps {
    className?: string;
}

// Renders the top promotional/contact bar visible only on large screens.
export default function TopBar({ className }: TopBarProps) {
    const {data:session, status } = useSession();

    return (
        <div className={cn("hidden text-black text-sm lg:block", className)}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5">
                        <Truck className="h-4 w-4 text-green-500" />
                        Free Shipping on Orders 500 EGP
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-green-500" />
                        New Arrivals Daily
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <a href="tel:+18001234567" className="flex items-center gap-1.5
                    ">
                        <Phone className="h-4 w-4" />
                        +1 (800) 123-4567
                    </a>
                    <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5
                    ">
                        <Mail className="h-4 w-4" />
                        support@freshcart.com
                    </a>
                    {status === "authenticated" ? (
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-1.5">
                                <User size={16} />
                                <span>{session?.user?.name}</span>
                            </div>

                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="flex items-center gap-1.5 hover:text-white"
                            >
                                <LogOut size={16} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="flex items-center gap-1.5">
                                <User className="h-4 w-4" />
                                Sign In
                            </Link>
                            <Link href="/register" className="flex items-center gap-1.5">
                                <UserPlus className="h-4 w-4" />
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="User menu"
          className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-hidden lg:flex"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <User className="h-3.5 w-3.5" />
          </div>
          <span className="max-w-[110px] truncate">{userName}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
      >
        {/* User Info Header matching screenshot */}
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <User className="h-5 w-5" />
          </div>
          <span className="truncate text-sm font-bold text-gray-900">
            {userName}
          </span>
        </div>

        <DropdownMenuSeparator className="my-1 bg-slate-100" />

        {/* Navigation Items */}
        <DropdownMenuGroup className="space-y-0.5">
          <Link href="/profile">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900">
              <User className="h-4 w-4 text-slate-400" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/allorders">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900">
              <Package className="h-4 w-4 text-slate-400" />
              <span>My Orders</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/wishlist">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900">
              <Heart className="h-4 w-4 text-slate-400" />
              <span>My Wishlist</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/profile/addresses">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>Addresses</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/profile/settings">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900">
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-slate-100" />

        {/* Sign Out Action */}
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="h-4 w-4 text-red-500" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

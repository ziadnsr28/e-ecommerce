"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Settings, ChevronRight } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "My Addresses",
    href: "/profile/addresses",
    icon: MapPin,
  },
  {
    label: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xs">
      <p className="px-3 pt-1.5 pb-2 text-xs font-semibold text-gray-400">
        My Account
      </p>

      <nav className="space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? "border border-emerald-200/60 bg-emerald-50 text-emerald-700 shadow-2xs font-semibold"
                  : "border border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={15}
                  className={isActive ? "text-emerald-600" : "text-gray-400"}
                />
                <span>{label}</span>
              </div>
              <ChevronRight
                size={14}
                className={isActive ? "text-emerald-600" : "text-gray-300"}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

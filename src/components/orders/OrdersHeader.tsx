"use client";

import React from "react";
import Link from "next/link";
import { Package } from "lucide-react";

interface OrdersHeaderProps {
  totalOrders: number;
}

// Renders breadcrumb, page title with icon badge, and history count indicator.
export function OrdersHeader({ totalOrders }: OrdersHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-900">My Orders</span>
      </nav>

      {/* Main Title Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-xs">
            <Package size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              My Orders
            </h1>
            <p className="text-xs text-gray-500">
              Track and manage your orders
            </p>
          </div>
        </div>

        {/* Right Status Badge matching screenshot */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {totalOrders} {totalOrders === 1 ? "Order" : "Orders"} Total
          </span>
        </div>
      </div>
    </div>
  );
}

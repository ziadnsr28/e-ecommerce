"use client";

import React from "react";
import Link from "next/link";
import { PackageOpen, ShoppingBag } from "lucide-react";

export function OrdersEmptyState() {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-xs">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
        <PackageOpen size={32} />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
      <p className="mt-1.5 max-w-sm text-xs text-gray-500">
        You haven&apos;t placed any orders yet. Discover our fresh groceries and start shopping today!
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors"
      >
        <ShoppingBag size={14} />
        Explore Products
      </Link>
    </div>
  );
}

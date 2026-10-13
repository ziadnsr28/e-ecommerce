"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { WishlistHeader } from "@/components/Wishlist/WishlistHeader";
import { WishlistTable } from "@/components/Wishlist/WishlistTable";
import { WishlistItem } from "@/components/Wishlist/WishlistItem";
import { useWishlist } from "@/context/wishlistContext";

// Skeleton loader for Wishlist while fetching data
function WishlistSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 rounded-lg bg-gray-200" />
      {/* Desktop skeleton */}
      <div className="hidden md:block rounded-xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-48 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-100" />
              </div>
            </div>
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-6 w-20 rounded-full bg-gray-100" />
            <div className="h-9 w-28 rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
      {/* Mobile skeleton */}
      <div className="space-y-3 md:hidden">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-lg bg-gray-200" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>
            </div>
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-9 w-full rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Renders the Wishlist page, composing the header, desktop table, mobile cards, and navigation link.
export default function WishlistPage() {
  const { status } = useSession();
  const { wishlistItems, isLoading, handleWishlist } = useWishlist();

  useEffect(() => {
    if (status === "authenticated") {
      handleWishlist();
    }
  }, [status, handleWishlist]);

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 text-slate-800">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Unauthenticated State */}
        {status === "unauthenticated" ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-xs">
              <Heart size={32} className="fill-red-500 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Sign In to View Your Wishlist
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Your wishlist is saved to your account. Sign in now to see all your saved favorites and access them anywhere.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 transition-colors"
              >
                <LogIn size={16} />
                Sign In
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : status === "loading" || (isLoading && wishlistItems.length === 0) ? (
          <WishlistSkeleton />
        ) : wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="space-y-6">
            <WishlistHeader totalItems={0} />

            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-xs">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                <Heart size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="mt-1.5 max-w-sm text-xs text-gray-500">
                Explore our catalog and save your favorite items so you can find them easily later.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors"
              >
                <ShoppingBag size={14} />
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items List */
          <>
            {/* Wishlist Header */}
            <WishlistHeader totalItems={wishlistItems.length} />

            {/* Desktop Layout: Table View */}
            <div className="mt-8 hidden md:block">
              <WishlistTable items={wishlistItems} />
            </div>

            {/* Mobile Layout: Stacked Cards View */}
            <div className="mt-6 space-y-4 md:hidden">
              {wishlistItems.map((item) => (
                <WishlistItem key={item._id} item={item} />
              ))}
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

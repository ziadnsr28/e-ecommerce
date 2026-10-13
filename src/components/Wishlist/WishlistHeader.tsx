import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

interface WishlistHeaderProps {
  totalItems: number;
}

// Renders the wishlist page header with breadcrumb navigation, heart icon badge, and saved items count.
export function WishlistHeader({ totalItems }: WishlistHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-900">Wishlist</span>
      </nav>

      {/* Title section with pink heart badge */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 shadow-xs">
          <Heart size={20} className="fill-current text-red-500" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            My Wishlist
          </h1>
          <p className="text-xs text-gray-500">
            {totalItems} items saved
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Daum } from "@/types/product";
import { AddToCart } from "@/components/product/addproduct";
import { useWishlist } from "@/context/wishlistContext";
import { Spinner } from "@/components/ui/spinner";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { playDeleteSuccessSound } from "@/lib/audio";

interface WishlistItemProps {
  item: Daum;
}

// Renders an individual mobile card representation of a wishlist item with responsive stacked layout.
export function WishlistItem({ item }: WishlistItemProps) {
  const { isLoading: isAddingCart, addProduct } = AddToCart(item._id);
  const { removeFromWishlist } = useWishlist();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const price = item.priceAfterDiscount ?? item.price;
  const oldPrice = item.priceAfterDiscount ? item.price : undefined;
  const inStock = item.quantity > 0;

  async function handleRemove() {
    setIsRemoving(true);
    try {
      const ok = await removeFromWishlist(item._id);
      if (ok) {
        playDeleteSuccessSound();
        setIsConfirmOpen(false);
      }
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xs space-y-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md hover:border-gray-200">
      {/* Top: Thumbnail, Title, and Category */}
      <div className="flex items-start gap-3">
        <Link
          href={`/products/${item._id}`}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white p-1 overflow-hidden"
        >
          <Image
            src={item.imageCover}
            alt={item.title}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            href={`/products/${item._id}`}
            className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug hover:text-green-600 transition-colors"
          >
            {item.title}
          </Link>
          <p className="mt-1 text-[11px] text-gray-400">
            {item.category?.name}
          </p>
        </div>
      </div>

      {/* Middle: Price */}
      <div className="flex items-baseline justify-between border-t border-gray-50 pt-2.5 text-xs">
        <span className="text-gray-500 font-medium">Price:</span>
        <div className="text-right">
          <span className="text-sm font-bold text-gray-900">
            {price.toLocaleString()} EGP
          </span>
          {oldPrice && (
            <span className="block text-[11px] text-gray-400 line-through">
              {oldPrice.toLocaleString()} EGP
            </span>
          )}
        </div>
      </div>

      {/* Middle: Stock status */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 font-medium">Status:</span>
        {inStock ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Out of Stock
          </span>
        )}
      </div>

      {/* Bottom: Action buttons (Add to cart full width + Trash) */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => addProduct(item._id)}
          disabled={isAddingCart || !inStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingCart ? (
            <Spinner className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ShoppingCart size={14} />
          )}
          Add to Cart
        </button>
        <button
          type="button"
          aria-label="Remove item"
          onClick={() => setIsConfirmOpen(true)}
          disabled={isRemoving}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all duration-150 hover:scale-105 active:scale-90 disabled:opacity-50"
        >
          {isRemoving ? (
            <Spinner className="h-3.5 w-3.5 animate-spin text-red-500" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>

      <DeleteConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleRemove}
        itemName={item.title}
        itemType="wishlist"
        isDeleting={isRemoving}
      />
    </div>
  );
}

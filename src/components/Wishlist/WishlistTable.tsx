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

interface WishlistTableProps {
  items: Daum[];
}

function WishlistTableRow({ item }: { item: Daum }) {
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
    <div className="grid grid-cols-12 items-center px-6 py-4 transition-colors hover:bg-gray-50/40">
      {/* Product Column (Thumbnail + Title + Category) */}
      <div className="col-span-6 flex items-center gap-4 pr-4">
        <Link
          href={`/products/${item._id}`}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white p-1.5 overflow-hidden"
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
            className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-green-600 transition-colors"
          >
            {item.title}
          </Link>
          <p className="mt-1 text-xs text-gray-400">
            {item.category?.name}
          </p>
        </div>
      </div>

      {/* Price Column */}
      <div className="col-span-2 text-center">
        <span className="text-sm font-bold text-gray-900">
          {price.toLocaleString()} EGP
        </span>
        {oldPrice && (
          <span className="block text-xs text-gray-400 line-through mt-0.5">
            {oldPrice.toLocaleString()} EGP
          </span>
        )}
      </div>

      {/* Status Column */}
      <div className="col-span-2 text-center">
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

      {/* Actions Column (Add to cart + Trash) */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => addProduct(item._id)}
          disabled={isAddingCart || !inStock}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
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

// Renders the desktop table view for wishlist items, including product info, pricing, status, and action buttons.
export function WishlistTable({ items }: WishlistTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center border-b border-gray-100 bg-gray-50/50 px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <WishlistTableRow key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

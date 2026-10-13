"use client"
import Image from "next/image";
import { Heart, Repeat, Eye, Star, Plus } from "lucide-react";
import { Daum } from "@/types/product";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { AddToCart } from "./addproduct";
import { useWishlist } from "@/context/wishlistContext";
import { useState } from "react";

// Renders a product card with image, price, discount badge, rating, and add-to-cart action.
export default function ProductCard({ product }: { product: Daum }) {
    const discountPercent = product.priceAfterDiscount
        ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
        : undefined;

    const { isLoading, addProduct } = AddToCart(product._id);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [isToggling, setIsToggling] = useState(false);
    const wishlisted = isInWishlist(product._id);

    return (
        <Link href={`/products/${product._id}`} className="block h-full w-full">
            <div className="group relative flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white sm:max-w-[220px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
                {/* Discount badge */}
                {discountPercent && (
                    <span className="absolute left-2 top-2 z-10 rounded bg-red-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
                        -{discountPercent}%
                    </span>
                )}

                {/* Action icons */}
                <div className="absolute right-2 top-2 z-10 flex flex-col gap-2">
                    <button
                        type="button"
                        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        disabled={isToggling}
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsToggling(true);
                            try {
                                await toggleWishlist(product._id);
                            } finally {
                                setIsToggling(false);
                            }
                        }}
                        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-150 hover:scale-110 active:scale-95 ${
                            wishlisted
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-400 hover:text-red-500"
                        } ${isToggling ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {isToggling ? (
                            <Spinner className="h-3 w-3 animate-spin text-red-500" />
                        ) : (
                            <Heart
                                className={`h-3.5 w-3.5 transition-colors ${
                                    wishlisted ? "fill-red-500 text-red-500" : ""
                                }`}
                            />
                        )}
                    </button>
                    <button
                        aria-label="Compare"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-all duration-150 hover:text-emerald-600 hover:scale-110 active:scale-95"
                    >
                        <Repeat className="h-3.5 w-3.5" />
                    </button>
                    <button
                        aria-label="Quick view"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-all duration-150 hover:text-emerald-600 hover:scale-110 active:scale-95"
                    >
                        <Eye className="h-3.5 w-3.5" />
                    </button>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col px-3 pb-4 pt-3">
                    <p className="min-h-4 text-xs text-gray-400">{product.brand?.name}</p>
                    <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900">
                        {product.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            {[0, 1, 2, 3, 4].map((star) => {
                                const isFilled = star < Math.floor(product.ratingsAverage);
                                return (
                                    <Star
                                        key={star}
                                        className={`h-3.5 w-3.5 ${isFilled
                                            ? "fill-amber-400 text-amber-400"
                                            : "fill-gray-200 text-gray-200"}`}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-xs text-gray-400">
                            {product.ratingsAverage} ({product.ratingsQuantity})
                        </span>
                    </div>

                    {/* Price + cart button pinned to the bottom */}
                    <div className="relative mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-bold text-emerald-600">
                                {product.priceAfterDiscount ?? product.price} EGP
                            </span>
                            {product.priceAfterDiscount && (
                                <span className="text-xs text-gray-400 line-through">
                                    {product.price} EGP
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addProduct(product._id);
                            }}
                            aria-label="Add to cart"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md transition-all duration-200 hover:bg-emerald-700 hover:scale-105 active:scale-90"
                        >
                            {isLoading ? (
                                <Spinner className="h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
"use client";
import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { useWishlist } from "@/context/wishlistContext";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface WishlistButtonProps {
    productId: string;
}

// Renders an interactive button to toggle wishlist status and a share action button.
export default function WishlistButton({ productId }: WishlistButtonProps) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [isLoading, setIsLoading] = useState(false);
    const isWishlisted = isInWishlist(productId);

    async function handleToggle() {
        if (!productId) return;
        setIsLoading(true);
        try {
            await toggleWishlist(productId);
        } finally {
            setIsLoading(false);
        }
    }

    function handleShare() {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            toast.success("تم نسخ رابط المنتج إلى الحافظة!");
        }
    }

    return (
        <div className="mb-6 flex items-center gap-3">
            <button
                type="button"
                onClick={handleToggle}
                disabled={isLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-70"
            >
                {isLoading ? (
                    <Spinner className="h-4 w-4 animate-spin" />
                ) : (
                    <Heart
                        className={`h-4 w-4 transition-colors ${
                            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                    />
                )}
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
            <button
                type="button"
                onClick={handleShare}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50"
                aria-label="Share"
            >
                <Share2 className="h-4 w-4" />
            </button>
        </div>
    );
}
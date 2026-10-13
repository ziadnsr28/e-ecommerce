"use client";
import { useState } from "react";
import { Iproduct } from "@/types/product";
import { Truck, RotateCcw, ShieldCheck, Check, Star } from "lucide-react";

// The three tab names
type Tab = "Product Details" | "Reviews" | "Shipping & Returns";
const TABS: Tab[] = ["Product Details", "Reviews", "Shipping & Returns"];
const SHIPPING_BENEFITS = [
    "Free shipping on orders over $50",
    "Standard delivery: 3-5 business days",
    "Express delivery available (1-2 business days)",
    "Track your order in real-time",
];
const RETURN_BENEFITS = [
    "30-day hassle-free returns",
    "Full refund or exchange available",
    "Free return shipping on defective items",
    "Easy online return process",
];
// Shows 5 stars. A star can be fully filled, partly filled (like 4.5), or empty.
function StarRating({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
    const stars = [];
    // Make star number 1, 2, 3, 4, and 5
    for (let starNumber = 1; starNumber <= 5; starNumber++) {
        // How much of this star should be yellow (0 to 100)
        let fillPercentage = 0;
        if (rating >= starNumber) {
            // The rating is high enough, so the whole star is yellow
            fillPercentage = 100;
        } else if (rating > starNumber - 1) {
            // The rating is only part of this star (example: 4.5 gives the 5th star 50%)
            fillPercentage = (rating - (starNumber - 1)) * 100;
        }
        stars.push(
            <div key={starNumber} className={`relative ${size}`}>
                <Star className={`absolute inset-0 ${size} text-gray-200 fill-gray-100`} />
                {fillPercentage > 0 && (
                    <div
                        className="absolute inset-y-0 left-0 overflow-hidden"
                        style={{ width: `${fillPercentage}%` }}
                    >
                        <Star className={`${size} text-yellow-400 fill-yellow-400`} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
            {stars}
        </div>
    );
}

// Renders selectable tabs to display product details, reviews, or shipping information.
export default function ProductTabs({ product }: { product: Iproduct }) {
    const [activeTab, setActiveTab] = useState<Tab>("Product Details");

    // ----- Reviews calculation -----

    // Use the reviews list, or an empty list if there are no reviews
    const reviews = product.reviews || [];

    // Total number of reviews
    let totalReviews = reviews.length;
    if (totalReviews === 0) {
        totalReviews = product.ratingsQuantity || 0;
    }

    // Start every counter at 0
    let fiveStars = 0;
    let fourStars = 0;
    let threeStars = 0;
    let twoStars = 0;
    let oneStar = 0;

    // Look at each review and add 1 to the matching counter
    for (const review of reviews) {
        // Round the rating to a whole number (example: 4.4 becomes 4)
        let roundedRating = Math.round(review.rating);

        // Keep the number between 1 and 5
        if (roundedRating < 1) {
            roundedRating = 1;
        }
        if (roundedRating > 5) {
            roundedRating = 5;
        }

        if (roundedRating === 5) {
            fiveStars = fiveStars + 1;
        } else if (roundedRating === 4) {
            fourStars = fourStars + 1;
        } else if (roundedRating === 3) {
            threeStars = threeStars + 1;
        } else if (roundedRating === 2) {
            twoStars = twoStars + 1;
        } else {
            oneStar = oneStar + 1;
        }
    }

    // Start every percentage at 0
    let fiveStarPercent = 0;
    let fourStarPercent = 0;
    let threeStarPercent = 0;
    let twoStarPercent = 0;
    let oneStarPercent = 0;

    // Only calculate percentages if there is at least 1 review (we can't divide by 0)
    if (totalReviews > 0) {
        fiveStarPercent = Math.round((fiveStars / totalReviews) * 100);
        fourStarPercent = Math.round((fourStars / totalReviews) * 100);
        threeStarPercent = Math.round((threeStars / totalReviews) * 100);
        twoStarPercent = Math.round((twoStars / totalReviews) * 100);
        oneStarPercent = Math.round((oneStar / totalReviews) * 100);
    }

    // Put the percentages in a list so we can show them with .map() below
    const ratingBreakdown = [
        { star: 5, percent: fiveStarPercent },
        { star: 4, percent: fourStarPercent },
        { star: 3, percent: threeStarPercent },
        { star: 2, percent: twoStarPercent },
        { star: 1, percent: oneStarPercent },
    ];

    return (
        <div className="mt-12">
            {/* Tab navigation headers */}
            <div className="mb-6 flex gap-8 border-b border-gray-200">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-all duration-200 ${
                            activeTab === tab
                                ? "border-green-600 text-green-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tab}
                        {tab === "Reviews" && totalReviews > 0 && (
                            <span className="ms-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                {totalReviews}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* TAB 1: Product Details */}
            {activeTab === "Product Details" && (
                <div className="rounded-2xl bg-gray-50 p-6 animate-fade-in-up">
                    <h2 className="mb-2 text-base font-bold text-gray-900">About this Product</h2>
                    <p className="mb-6 text-sm leading-relaxed text-gray-500">{product.description}</p>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        <div>
                            <h3 className="mb-3 text-sm font-bold text-gray-900">Product Information</h3>
                            <dl className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <dt className="text-gray-500">Category</dt>
                                    <dd className="font-medium text-gray-900">{product.category?.name}</dd>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <dt className="text-gray-500">Brand</dt>
                                    <dd className="font-medium text-gray-900">{product.brand?.name}</dd>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <dt className="text-gray-500">Item Code</dt>
                                    <dd className="font-medium text-gray-900">{product._id}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: Reviews */}
            {activeTab === "Reviews" && (
                <div className="space-y-8 animate-fade-in-up">
                    {/* Rating summary section */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
                        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
                            {/* Left side: Average score */}
                            <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left md:border-e md:border-gray-100 md:pe-12 shrink-0">
                                <div className="text-5xl font-extrabold tracking-tight text-gray-900">
                                    {(product.ratingsAverage ?? 0).toFixed(1)}
                                </div>
                                <div className="mt-2.5">
                                    <StarRating rating={product.ratingsAverage ?? 0} size="h-4 w-4" />
                                </div>
                                <span className="mt-2 text-xs font-normal text-gray-400">
                                    Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                                </span>
                            </div>

                            {/* Right side: Star percentage breakdown */}
                            <div className="flex-1 space-y-3.5 w-full">
                                {ratingBreakdown.map(({ star, percent }) => (
                                    <div key={star} className="flex items-center gap-3">
                                        <div className="flex flex-col text-[11px] leading-tight font-medium text-gray-500 w-7 shrink-0 text-left">
                                            <span>{star}</span>
                                            <span>star</span>
                                        </div>
                                        <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <span className="w-9 text-right text-xs font-medium text-gray-500 shrink-0">
                                            {percent}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Customer feedback list if reviews exist */}
                    {product.reviews && product.reviews.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-gray-900">Customer Feedback</h3>
                            <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white p-6">
                                {product.reviews.map((rev) => (
                                    <div key={rev._id} className="py-4 first:pt-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="font-semibold text-sm text-gray-900">
                                                {rev.user?.name || "Customer"}
                                            </span>
                                            <StarRating rating={rev.rating} size="h-3.5 w-3.5" />
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {rev.review || "No written review provided."}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 3: Shipping & Returns */}
            {activeTab === "Shipping & Returns" && (
                <div className="space-y-5 animate-fade-in-up">
                    {/* Top 2 side-by-side cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Shipping card */}
                        <div className="rounded-xl border border-green-100/60 bg-gradient-to-b from-[#ebfaef] to-[#f4fcf7] p-6">
                            <div className="flex items-center gap-3.5 mb-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Shipping Information</h3>
                            </div>
                            <ul className="space-y-3">
                                {SHIPPING_BENEFITS.map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Returns card */}
                        <div className="rounded-xl border border-green-100/60 bg-gradient-to-b from-[#ebfaef] to-[#f4fcf7] p-6">
                            <div className="flex items-center gap-3.5 mb-5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                    <RotateCcw className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Returns & Refunds</h3>
                            </div>
                            <ul className="space-y-3">
                                {RETURN_BENEFITS.map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Buyer Protection Guarantee strip */}
                    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200/80 text-gray-700">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Buyer Protection Guarantee</h4>
                            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                                Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described. We ensure your shopping experience is safe and secure.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
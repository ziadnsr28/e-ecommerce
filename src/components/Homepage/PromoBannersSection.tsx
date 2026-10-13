"use client";
import { ArrowRight } from "lucide-react";

interface PromoBanner {
    id: number;
    badge: string;
    badgeIcon: string;
    title: string;
    description: string;
    discount: string;
    code: string;
    buttonLabel: string;
    gradient: string;
    buttonText: string;
}

const promoBanners: PromoBanner[] = [
    {
        id: 1,
        badge: "Deal of the Day",
        badgeIcon: "🔥",
        title: "Fresh Organic Fruits",
        description: "Get up to 40% off on selected organic fruits",
        discount: "40% OFF",
        code: "ORGANIC40",
        buttonLabel: "Shop Now",
        gradient: "from-emerald-600 to-green-700",
        buttonText: "text-emerald-700",
    },
    {
        id: 2,
        badge: "New Arrivals",
        badgeIcon: "🥬",
        title: "Exotic Vegetables",
        description: "Discover our latest collection of premium vegetables",
        discount: "25% OFF",
        code: "FRESH25",
        buttonLabel: "Explore Now",
        gradient: "from-orange-500 to-pink-600",
        buttonText: "text-orange-600",
    },
];

// Renders promotional marketing banners highlighting special deals, discounts, and coupon codes.
export default function PromoBannersSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {promoBanners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.gradient} p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl`}
                    >
                        {/* Decorative circle */}
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125" />

                        <div className="relative z-10">
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                                <span>{banner.badgeIcon}</span>
                                {banner.badge}
                            </span>

                            <h3 className="mb-2 text-2xl font-bold text-white">
                                {banner.title}
                            </h3>
                            <p className="mb-4 text-sm text-white/90">
                                {banner.description}
                            </p>

                            <div className="mb-5 flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-white">
                                    {banner.discount}
                                </span>
                                <span className="text-sm text-white/80">
                                    Use code: <span className="font-bold">{banner.code}</span>
                                </span>
                            </div>

                            <button
                                className={`flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold ${banner.buttonText} transition-all duration-200 hover:scale-105 active:scale-95`}
                            >
                                {banner.buttonLabel}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
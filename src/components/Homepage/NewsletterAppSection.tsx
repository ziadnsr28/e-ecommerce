"use client";

import {
    Mail,
    Leaf,
    Truck,
    Tag,
    Smartphone,
    Star,
    Apple,
    PlayCircle,
} from "lucide-react";

// Renders the newsletter email subscription form and mobile app download promotional section.
export default function NewsletterAppSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid grid-cols-1 gap-6 rounded-3xl bg-emerald-50/60 p-6 md:grid-cols-[1fr_auto_1fr] md:p-10">
                {/* Newsletter */}
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                            <Mail size={20} />
                        </span>

                        <div>
                            <p className="text-xs font-semibold tracking-wide text-emerald-700">
                                NEWSLETTER
                            </p>
                            <p className="text-xs text-gray-500">
                                50,000+ subscribers
                            </p>
                        </div>
                    </div>

                    <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Get the Freshest Updates{" "}
                        <span className="text-emerald-600">
                            Delivered Free
                        </span>
                    </h2>

                    <p className="mb-5 text-gray-600">
                        Weekly recipes, seasonal offers & exclusive member perks.
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm text-gray-700">
                            <Leaf size={14} className="text-emerald-600" />
                            Fresh Picks Weekly
                        </span>

                        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm text-gray-700">
                            <Truck size={14} className="text-emerald-600" />
                            Free Delivery Codes
                        </span>

                        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm text-gray-700">
                            <Tag size={14} className="text-emerald-600" />
                            Members-Only Deals
                        </span>
                    </div>

                    <form className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-emerald-500 sm:flex-1"
                        />

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95"
                        >
                            Subscribe
                            <span aria-hidden>→</span>
                        </button>
                    </form>

                    <p className="mt-2 text-xs text-gray-400">
                        Unsubscribe anytime. No spam, ever.
                    </p>
                </div>

                {/* Divider */}
                <div className="hidden w-px bg-gray-200 md:block" />

                {/* Mobile app */}
                <div className="rounded-2xl bg-gray-900 p-6 text-white">
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-medium text-emerald-400">
                        <Smartphone size={12} />
                        MOBILE APP
                    </span>

                    <h3 className="mb-1.5 text-xl font-bold">
                        Shop Faster on Our App
                    </h3>

                    <p className="mb-5 text-sm text-gray-400">
                        Get app-exclusive deals & 15% off your first order.
                    </p>

                    <div className="mb-4 flex flex-col gap-2.5">
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 transition-all duration-200 hover:bg-white/15 hover:scale-[1.02] active:scale-95"
                        >
                            <Apple size={20} />

                            <span className="flex flex-col leading-tight">
                                <span className="text-[10px] text-gray-400">
                                    Download on the
                                </span>
                                <span className="text-sm font-semibold">
                                    App Store
                                </span>
                            </span>
                        </a>

                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 transition-all duration-200 hover:bg-white/15 hover:scale-[1.02] active:scale-95"
                        >
                            <PlayCircle size={20} />

                            <span className="flex flex-col leading-tight">
                                <span className="text-[10px] text-gray-400">
                                    Get it on
                                </span>
                                <span className="text-sm font-semibold">
                                    Google Play
                                </span>
                            </span>
                        </a>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="flex items-center text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill="currentColor"
                                    strokeWidth={0}
                                />
                            ))}
                        </span>

                        4.9 · 100K+ downloads
                    </div>
                </div>
            </div>
        </section>
    );
}
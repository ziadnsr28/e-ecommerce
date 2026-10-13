"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/home-slider-1.d79601a8.png";

// ---------- Data ----------

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    primaryVariant: "solid-purple" | "solid-white";
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Fast & Free Delivery",
        subtitle: "Same day delivery available",
        primaryLabel: "Order Now",
        secondaryLabel: "Delivery Info",
        primaryVariant: "solid-purple",
    },
    {
        id: 2,
        title: "Premium Quality Guaranteed",
        subtitle: "Fresh from farm to your table",
        primaryLabel: "Shop Now",
        secondaryLabel: "Learn More",
        primaryVariant: "solid-white",
    },
    {
        id: 3,
        title: "Fresh Products Delivered to your Door",
        subtitle: "Get 20% off your first order",
        primaryLabel: "Shop Now",
        secondaryLabel: "View Deals",
        primaryVariant: "solid-white",
    },
];

interface FeatureItem {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    iconBg: string;
    iconColor: string;
}

const features: FeatureItem[] = [
    {
        id: 1,
        icon: <Truck className="h-5 w-5" />,
        title: "Free Shipping",
        description: "On orders over 500 EGP",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        id: 2,
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Secure Payment",
        description: "100% secure transactions",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        id: 3,
        icon: <RotateCcw className="h-5 w-5" />,
        title: "Easy Returns",
        description: "14-day return policy",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
    },
    {
        id: 4,
        icon: <Headset className="h-5 w-5" />,
        title: "24/7 Support",
        description: "Dedicated support team",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
    },
];

// ---------- Hero Slider ----------

const AUTOPLAY_INTERVAL = 5000;

// Renders an interactive carousel slider displaying promotional banners and slide controls.
export function HeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
    }, []);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(goToNext, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [goToNext]);

    return (
        <div className="relative h-[420px] w-full overflow-hidden md:h-[480px]">
            {/* Background image */}
            <Image
                src={heroImage}
                alt="Slider Background"
                fill
                priority
                className="object-cover"
            />
            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/70 via-emerald-500/80 to-transparent" />
            {/* Slide content track with smooth transition */}
            <div
                className="relative z-10 flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="flex h-full w-full shrink-0 items-center px-8 md:px-16"
                    >
                        <div className="max-w-md">
                            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                                {slide.title}
                            </h1>
                            <p className="mt-3 text-base text-white/90">{slide.subtitle}</p>

                            <div className="mt-6 flex items-center gap-3">
                                <button
                                    className={cn(
                                        "rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95",
                                        slide.primaryVariant === "solid-purple"
                                            ? "bg-white text-violet-700 hover:bg-white/90"
                                            : "bg-white text-emerald-700 hover:bg-white/90"
                                    )}
                                >
                                    {slide.primaryLabel}
                                </button>
                                <button className="rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95">
                                    {slide.secondaryLabel}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={goToPrev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-700 shadow-md transition-all duration-200 hover:bg-white hover:scale-110 active:scale-90"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                onClick={goToNext}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-700 shadow-md transition-all duration-200 hover:bg-white hover:scale-110 active:scale-90"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={cn(
                            "h-2 rounded-full transition-all",
                            index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/50"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

// ---------- Feature Cards ----------

// Renders key store service highlights such as shipping, security, and support in a feature grid.
function FeatureCards() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div
                            className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                feature.iconBg,
                                feature.iconColor
                            )}
                        >
                            {feature.icon}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
                            <p className="text-xs text-gray-500">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------- Exported Section ----------

// Renders the hero banner section including the image carousel and store features.
export default function HeroSection() {
    return (
        <section>
            <HeroSlider />
            <FeatureCards />
        </section>
    );
}
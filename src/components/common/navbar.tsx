"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    Search,
    ChevronDown,
    Headset,
    Heart,
    ShoppingCart,
    Menu,
    X,
    Package,
    MapPin,
    Settings,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";
import { CartCountContext } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";

interface NavbarProps {
    className?: string;
}

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
];

   const categories = [
    { label: "All Categories", href: "/categories" },
    { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
    { label: "Women's Fashion", href: "/products?category=6439d58a0049ad0b52b9003f" },
    { label: "Men's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
    { label: "Beauty & Health", href: "/products?category=6439d30b67d9aa4ca97064b1" },
];

// Renders the main storefront navigation bar, search interface, categories flyout, and mobile drawer.
export default function Navbar({ className }: NavbarProps) {
    const router = useRouter();
    const [navSearch, setNavSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const { data: session, status } = useSession();
    const { countCart } = useContext(CartCountContext)!
    const { wishlistCount } = useWishlist();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (navSearch.trim()) {
            router.push(`/searsh?search=${encodeURIComponent(navSearch.trim())}`);
        } else {
            router.push("/searsh");
        }
    }

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        // Closes the categories dropdown menu when clicking outside its bounds.
        function handleClickOutside(event: MouseEvent) {
            if (
                categoriesRef.current &&
                !categoriesRef.current.contains(event.target as Node)
            ) {
                setIsCategoriesOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Main navbar */}
            <div className={cn("sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm", className)}>
                <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <span className="text-2xl">🛒</span>
                        <span className="text-xl font-bold text-gray-900 lg:text-2xl">FreshCart</span>
                    </Link>

                    {/* Search - desktop only */}
                    <form onSubmit={handleSearch} className="relative hidden max-w-xl flex-1 md:block">
                        <input
                            type="text"
                            value={navSearch}
                            onChange={(e) => setNavSearch(e.target.value)}
                            placeholder="Search for products, brands and more..."
                            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-5 pr-12 text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all duration-200"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white transition-all duration-200 hover:bg-green-700 active:scale-90"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                    </form>

                    {/* Nav links - desktop only */}
                    <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
                        <Link href="/" className="hover:text-green-600">Home</Link>
                        <Link href="/products" className="hover:text-green-600">Shop</Link>
                        <div ref={categoriesRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                                className={cn(
                                    "flex items-center gap-1 hover:text-green-600",
                                    isCategoriesOpen && "text-green-600"
                                )}
                            >
                                Categories
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        isCategoriesOpen && "rotate-180"
                                    )}
                                />
                            </button>

                            {isCategoriesOpen && (
                                <div className="absolute left-0 top-full z-40 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
                                    {categories.map(({ label, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            onClick={() => setIsCategoriesOpen(false)}
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link href="/brands" className="hover:text-green-600">Brands</Link>
                    </nav>

                    {/* Right actions */}
                    <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0 lg:gap-4">
                        <Link href="/contactus" className="hidden items-center gap-2 xl:flex">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                                <Headset className="h-4 w-4" />
                            </span>
                            <div className="leading-tight">
                                <p className="text-xs text-gray-400">Support</p>
                                <p className="text-xs font-semibold text-gray-700">24/7 Help</p>
                            </div>
                        </Link>

                        <Link
                            href="/wishlist"
                            aria-label="Wishlist"
                            className="relative hidden text-gray-600 hover:text-green-600 sm:block"
                        >
                            <Heart className="h-5 w-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-in zoom-in-50 duration-200">
                                    {wishlistCount > 9 ? "9+" : wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="relative hidden text-gray-600 hover:text-green-600 sm:block"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white animate-in zoom-in-50 duration-200">
                                {countCart}
                            </span>
                        </Link>

                        {/* Auth section - desktop */}
                        {status === "authenticated" ? (
                            <ProfileDropdown />
                        ) : (
                            <Link
                                href="/login"
                                className="hidden items-center gap-1.5 rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700 lg:flex"
                            >
                                <User className="h-4 w-4" />
                                Sign In
                            </Link>
                        )}

                        {/* Hamburger - mobile/tablet only */}
                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => setIsMenuOpen(true)}
                            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-150 active:scale-90 lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile drawer - full screen, no scroll */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-white lg:hidden">
                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2"
                        >
                            <span className="text-2xl">🛒</span>
                            <span className="text-xl font-bold text-gray-900">FreshCart</span>
                        </Link>
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content - fills remaining space, no scroll */}
                    <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden px-5 py-4">
                        <div>
                            {/* Search */}
                            <form
                                onSubmit={(e) => {
                                    handleSearch(e);
                                    setIsMenuOpen(false);
                                }}
                                className="relative mb-5"
                            >
                                <input
                                    type="text"
                                    value={navSearch}
                                    onChange={(e) => setNavSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-5 pr-12 text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <button
                                    type="submit"
                                    aria-label="Search"
                                    className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </form>

                            {/* Nav links */}
                            <nav className="mb-3 flex flex-col gap-1 text-base font-medium text-gray-700">
                                {navLinks.map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="rounded-lg px-3 py-2.5 hover:bg-green-50 hover:text-green-700"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            <hr className="mb-3 border-gray-100" />

                            {/* Wishlist / Cart */}
                            <div className="flex flex-col gap-1">
                                <Link
                                    href="/wishlist"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                                            <Heart className="h-4 w-4" />
                                        </span>
                                        Wishlist
                                    </div>
                                    {wishlistCount > 0 && (
                                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/cart"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600">
                                            <ShoppingCart className="h-4 w-4" />
                                        </span>
                                        Cart
                                    </div>
                                    {countCart > 0 && (
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                                            {countCart}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>

                        {/* Bottom section: auth buttons + help */}
                        <div className="shrink-0">
                            <hr className="mb-3 border-gray-100" />

                            <div className="mb-3 flex items-center gap-3">
                                {status === "authenticated" ? (
                                    <div className="w-full space-y-1">
                                        {/* User Info Header */}
                                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 mb-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <span className="truncate text-sm font-bold text-gray-900">
                                                {session.user?.name}
                                            </span>
                                        </div>

                                        {/* Menu Items matching screenshot */}
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                        >
                                            <User className="h-4 w-4 text-slate-400" />
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            href="/allorders"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                        >
                                            <Package className="h-4 w-4 text-slate-400" />
                                            <span>My Orders</span>
                                        </Link>
                                        <Link
                                            href="/wishlist"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                        >
                                            <Heart className="h-4 w-4 text-slate-400" />
                                            <span>My Wishlist</span>
                                        </Link>
                                        <Link
                                            href="/profile/addresses"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                        >
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span>Addresses</span>
                                        </Link>
                                        <Link
                                            href="/profile/settings"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                        >
                                            <Settings className="h-4 w-4 text-slate-400" />
                                            <span>Settings</span>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                signOut({ callbackUrl: "/login" });
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors pt-2"
                                        >
                                            <LogOut className="h-4 w-4 text-red-500" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex-1 rounded-full bg-green-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex-1 rounded-full border border-green-600 py-2.5 text-center text-sm font-semibold text-green-600 transition hover:bg-green-50"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                                    <Headset className="h-4 w-4" />
                                </span>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">Need Help?</p>
                                    <a href="tel:+18001234567" className="text-green-600 hover:underline">
                                        Contact Support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
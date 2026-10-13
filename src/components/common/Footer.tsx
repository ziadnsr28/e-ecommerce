import Link from "next/link";
import {
    Truck,
    RotateCcw,
    ShieldCheck,
    Headset,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * lucide-react no longer ships brand/social logos, so these are
 * small inline SVGs sized and colored to match the lucide icon API
 * (they accept a className and inherit currentColor).
 */
function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M13.5 21v-8.06h2.7l.4-3.14h-3.1V7.9c0-.91.25-1.53 1.56-1.53h1.66V3.56A22 22 0 0 0 14.3 3.4c-2.5 0-4.2 1.53-4.2 4.33v2.47H7.4v3.14h2.7V21h3.4z" />
        </svg>
    );
}

function TwitterIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18.9 3H21l-6.7 7.66L22.2 21h-6.2l-4.86-6.36L5.5 21H3.4l7.16-8.19L2.4 3h6.34l4.4 5.82L18.9 3zm-1.08 16.17h1.15L7.24 4.76H6l11.82 14.4z" />
        </svg>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
    );
}

function YoutubeIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8zM9.8 15.3V8.7L15.8 12z" />
        </svg>
    );
}

interface FreshCartFooterProps {
    className?: string;
}

const perks = [
    {
        icon: Truck,
        title: "Free Shipping",
        subtitle: "On orders over 500 EGP",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        subtitle: "14-day return policy",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        subtitle: "100% secure checkout",
    },
    {
        icon: Headset,
        title: "24/7 Support",
        subtitle: "Contact us anytime",
    },
];

const shopLinks = [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Men's Fashion", href: "/categories/mens-fashion" },
    { label: "Women's Fashion", href: "/categories/womens-fashion" },
];

const accountLinks = [
    { label: "My Account", href: "/account" },
    { label: "Order History", href: "/account/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/sign-in" },
    { label: "Create Account", href: "/sign-up" },
];

const supportLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping-info" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Track Order", href: "/track-order" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
];

const socialLinks = [
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

// Renders the store footer with perks banner, link sections, social media, and legal information.
export default function FreshCartFooter({ className }: FreshCartFooterProps) {
    return (
        <footer className={cn("w-full font-sans", className)}>
            {/* Perks bar */}
            <div className="bg-green-50/60 py-8">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
                    {perks.map(({ icon: Icon, title, subtitle }) => (
                        <div key={title} className="flex items-center gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <Icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="font-semibold text-gray-900">{title}</p>
                                <p className="text-sm text-gray-500">{subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main footer */}
            <div className="bg-gray-900 text-gray-300">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="mb-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2">
                            <span className="text-xl">🛒</span>
                            <span className="text-xl font-bold text-gray-900">FreshCart</span>
                        </Link>
                        <p className="mb-6 text-sm leading-relaxed text-gray-400">
                            FreshCart is your one-stop destination for quality products. From
                            fashion to electronics, we bring you the best brands at
                            competitive prices with a seamless shopping experience.
                        </p>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-500" />
                                <a href="tel:+18001234567" className="hover:text-white">
                                    +1 (800) 123-4567
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-green-500" />
                                <a href="mailto:support@freshcart.com" className="hover:text-white">
                                    support@freshcart.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                <span>123 Commerce Street, New York, NY 10001</span>
                            </li>
                        </ul>
                    </div>

                    {/* Shop column */}
                    <FooterColumn title="Shop" links={shopLinks} />

                    {/* Account column */}
                    <FooterColumn title="Account" links={accountLinks} />

                    {/* Support column */}
                    <FooterColumn title="Support" links={supportLinks} />

                    {/* Legal column */}
                    <FooterColumn title="Legal" links={legalLinks} />
                </div>

                {/* Social icons */}
                <div className="mx-auto max-w-7xl px-4 pb-10">
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={label}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-green-600 hover:text-white"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-500 sm:flex-row">
                        <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="rounded-md border border-gray-700 px-2 py-1 text-xs">Visa</span>
                            <span className="rounded-md border border-gray-700 px-2 py-1 text-xs">Mastercard</span>
                            <span className="rounded-md border border-gray-700 px-2 py-1 text-xs">PayPal</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
}) {
    return (
        <div>
            <h3 className="mb-4 font-semibold text-white">{title}</h3>
            <ul className="space-y-3 text-sm">
                {links.map(({ label, href }) => (
                    <li key={label}>
                        <a href={href} className="text-gray-400 hover:text-white">
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
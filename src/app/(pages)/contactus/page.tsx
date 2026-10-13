// Run once in your terminal:  npm install lucide-react react-icons
import PageHero from "@/components/heropages/hero";
import { Headset, Phone, Mail, MapPin, Clock, Send, HelpCircle } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800">
            {/* ===== GREEN HEADER ===== */}
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
                title="Contact Us"
                description="We'd love to hear from you. Get in touch with our team."
                icon={<Headset />}
            />
            {/* ===== PAGE CONTENT ===== */}
            <section className="mx-auto grid max-w-6xl gap-4 px-6 py-6 lg:grid-cols-[1fr_2fr]">
                {/* ----- LEFT COLUMN: info cards ----- */}
                <div className="flex flex-col gap-3">
                    {/* Phone */}
                    <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xs text-green-600">
                            <Phone className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold">Phone</h3>
                            <p className="text-[10px] text-gray-500">Mon-Fri from 8am to 6pm</p>
                            <p className="mt-1 text-xs text-green-600">+1 (800) 123-4567</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xs text-green-600">
                            <Mail className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold">Email</h3>
                            <p className="text-[10px] text-gray-500">We&apos;ll respond within 24 hours</p>
                            <p className="mt-1 text-xs text-green-600">support@freshcart.com</p>
                        </div>
                    </div>

                    {/* Office */}
                    <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xs text-green-600">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold">Office</h3>
                            <p className="text-[10px] leading-4 text-gray-500">
                                123 Commerce Street
                                <br />
                                New York, NY 10001
                                <br />
                                United States
                            </p>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xs text-green-600">
                            <Clock className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold">Business Hours</h3>
                            <p className="text-[10px] leading-4 text-gray-500">
                                Monday - Friday: 8am - 6pm
                                <br />
                                Saturday: 9am - 4pm
                                <br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <h3 className="text-xs font-semibold">Follow Us</h3>
                        <div className="mt-3 flex gap-2">
                            <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">
                                <FaFacebookF className="h-3.5 w-3.5" />
                            </a>
                            <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">
                                <FaTwitter className="h-3.5 w-3.5" />
                            </a>
                            <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">
                                <FaInstagram className="h-3.5 w-3.5" />
                            </a>
                            <a href="#" className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500">
                                <FaLinkedinIn className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* ----- RIGHT COLUMN: form + help box ----- */}
                <div className="flex flex-col gap-4">
                    {/* Form card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        {/* Form title */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-xs text-green-600">
                                <Headset className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold">Send us a Message</h2>
                                <p className="text-[10px] text-gray-500">
                                    Fill out the form and we&apos;ll get back to you
                                </p>
                            </div>
                        </div>

                        <form className="mt-5">
                            {/* Name + Email side by side */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-[10px] text-gray-600">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="h-8 w-full rounded-lg border border-gray-200 px-3 text-xs placeholder-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[10px] text-gray-600">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-8 w-full rounded-lg border border-gray-200 px-3 text-xs placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="mt-4">
                                <label className="mb-1 block text-[10px] text-gray-600">Subject</label>
                                <select className="h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs">
                                    <option>Select a subject</option>
                                    <option>Order</option>
                                    <option>Shipping</option>
                                    <option>Returns</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="mt-4">
                                <label className="mb-1 block text-[10px] text-gray-600">Message</label>
                                <textarea
                                    placeholder="How can we help you?"
                                    className="h-20 w-full resize-none rounded-lg border border-gray-200 p-3 text-xs placeholder-gray-400"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="button"
                                className="mt-4 flex h-9 items-center gap-2 rounded-lg bg-green-600 px-5 text-xs font-semibold text-white"
                            >
                                <Send className="h-4 w-4" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Help center box */}
                    <div className="flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs text-green-600">
                            <HelpCircle className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold">Looking for quick answers?</h3>
                            <p className="mt-1 text-[10px] text-gray-600">
                                Check out our Help Center for frequently asked questions about orders,
                                shipping, returns, and more.
                            </p>
                            <a href="#" className="mt-2 inline-block text-[10px] text-green-600">
                                Visit Help Center →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
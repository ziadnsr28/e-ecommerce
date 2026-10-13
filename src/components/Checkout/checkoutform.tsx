"use client";
import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Building2,
    Check,
    Info,
    MapPin,
    Phone,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "@/components/ui/field-error";
import { Icheckout, PaymentMethod } from "@/types/checkout";
import { checkoutFinaly } from "@/actions/checkout.sever";
import { checkoutSchematype, CheckoutSchemaType } from "@/lib/Schema/checkout.schema";
import { CartCountContext } from "@/context/cartContext";
import { toast } from "sonner";

function playSuccessSound() {
    try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
    } catch {
        // Safe fallback if audio playback is blocked by browser policy
    }
}

interface CheckoutFormProps {
    cartId: string;
    paymentMethod: PaymentMethod;
    isSubmitting: boolean;
    setIsSubmitting: (value: boolean) => void;
}

export default function CheckoutForm({
    cartId,
    paymentMethod,
    isSubmitting,
    setIsSubmitting,
}: CheckoutFormProps) {
    const router = useRouter();
    const { handleCart } = useContext(CartCountContext)!;
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const isSubmittingRef = useRef<boolean>(false);

    const { control, handleSubmit } = useForm<CheckoutSchemaType>({
        resolver: zodResolver(checkoutSchematype),
        mode: "all",
        defaultValues: {
            city: "",
            streetAddress: "",
            phoneNumber: "",
        },
    });

    async function onSubmit(formData: CheckoutSchemaType) {
        if (isSubmittingRef.current || isSubmitting) return;
        if (!cartId) {
            toast.error("السلة فارغة أو غير موجودة، يرجى إضافة منتجات أولاً.");
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);

        try {
            const shippingAddress: Icheckout = {
                details: formData.streetAddress,
                phone: formData.phoneNumber,
                city: formData.city,
            };
            const data = await checkoutFinaly(shippingAddress, cartId, paymentMethod);
            console.log("Checkout response:", data);

            if (data?.status === "success") {
                if (paymentMethod === "online" && data?.session?.url) {
                    toast.success("Redirecting to payment gateway...");
                    window.location.assign(data.session.url);
                    // Keep lock and isSubmitting true while navigating to Stripe
                } else if (paymentMethod === "cash") {
                    // 1. بدء تحديث السلة فوراً في الخلفية دون حظر واجهة النجاح
                    void (async () => {
                        try {
                            await handleCart();
                        } catch (cartErr) {
                            console.error("Cart refresh error after order success:", cartErr);
                        }
                    })();

                    // 2. إظهار المودال فوراً وتشغيل الصوت
                    playSuccessSound();
                    setIsSuccessModalOpen(true);

                    // 3. التوجيه إلى /allorders بعد ثانيتين تقريباً
                    setTimeout(() => {
                        router.push("/allorders");
                    }, 2000);
                    // Keep lock and isSubmitting true while redirecting
                } else {
                    toast.error("Failed to process order.");
                    isSubmittingRef.current = false;
                    setIsSubmitting(false);
                }
            } else {
                toast.error(data?.message || "Failed to place order. Please try again.");
                isSubmittingRef.current = false;
                setIsSubmitting(false);
            }
        } catch (err: unknown) {
            console.error(err);
            const errorMsg = err instanceof Error ? err.message : "Failed to place order. Please try again.";
            toast.error(errorMsg);
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    }

    return (
        <>
            {/* Centered Success Modal */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-white p-6 text-center shadow-2xl">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 animate-bounce">
                            <Check size={36} strokeWidth={3} />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                            Order Placed Successfully!
                        </h3>
                        <p className="mt-2 text-xs text-slate-500">
                            Thank you for your purchase. Redirecting you to your orders...
                        </p>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-600 animate-ping" />
                            Redirecting to All Orders...
                        </div>
                    </div>
                </div>
            )}

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="space-y-4 p-4 sm:p-5">
                    {/* Blue info box */}
                    <div className="flex items-center gap-2.5 rounded-lg border border-blue-100 bg-blue-50 p-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Info size={13} />
                        </span>
                        <div>
                            <p className="text-[11px] font-semibold text-blue-700">
                                Delivery Information
                            </p>
                            <p className="text-[10px] text-blue-500">
                                Please ensure your address is accurate for smooth delivery
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={(e) => {
                            handleSubmit((formData) => {
                                onSubmit(formData);
                            })(e);
                        }}
                        id="checkout-form"
                        className="space-y-4"
                    >
                        {/* City */}
                        <label className="block">
                            <span className="text-[11px] font-semibold text-slate-700">
                                City <span className="text-red-500">*</span>
                            </span>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500">
                                                <Building2 size={13} />
                                            </span>
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="e.g, Cairo, Alexandria, Giza"
                                                className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                                            />
                                        </div>
                                        {fieldState.error && <FieldError message={fieldState.error.message} />}
                                    </>
                                )}
                            />
                        </label>

                        {/* Street address */}
                        <label className="block">
                            <span className="text-[11px] font-semibold text-slate-700">
                                Street Address <span className="text-red-500">*</span>
                            </span>
                            <Controller
                                name="streetAddress"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="mt-1.5 flex items-start gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500">
                                                <MapPin size={13} />
                                            </span>
                                            <textarea
                                                {...field}
                                                rows={3}
                                                placeholder="Street name, building number, floor, apartment..."
                                                className="min-w-0 flex-1 resize-none bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                                            />
                                        </div>
                                        {fieldState.error && <FieldError message={fieldState.error.message} />}
                                    </>
                                )}
                            />
                        </label>

                        {/* Phone number */}
                        <label className="block">
                            <span className="text-[11px] font-semibold text-slate-700">
                                Phone Number <span className="text-red-500">*</span>
                            </span>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500">
                                                <Phone size={13} />
                                            </span>
                                            <input
                                                {...field}
                                                type="tel"
                                                placeholder="01xxxxxxxxx"
                                                className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                                            />
                                            <span className="shrink-0 whitespace-nowrap text-[10px] text-slate-400">
                                                Egyptian numbers only
                                            </span>
                                        </div>
                                        {fieldState.error && <FieldError message={fieldState.error.message} />}
                                    </>
                                )}
                            />
                        </label>
                    </form>
                </div>
            </section>
        </>
    );
}

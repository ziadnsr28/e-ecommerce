"use server"
import { getTokenServer } from "@/lib/auth";
import { cashCheckout, onlineCheckout } from "@/services/checkout.service";
import { Icheckout, PaymentMethod } from "@/types/checkout";

function requireToken(token: string | null): string {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً");
    }
    return token;
}

export async function checkoutFinaly(
    formData: Icheckout,
    cartId: string,
    paymentMethod: PaymentMethod = "cash"
) {
    const token = requireToken(await getTokenServer());
    if (paymentMethod === "online") {
        return await onlineCheckout(formData, token, cartId);
    }
    return await cashCheckout(formData, token, cartId);
}
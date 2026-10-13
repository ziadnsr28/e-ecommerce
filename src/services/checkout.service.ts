import { Icheckout } from "@/types/checkout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

export async function onlineCheckout(formData: Icheckout, token: string, cartId: string) {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
    }
    const returnUrl = process.env.NEXTAUTH_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
    const response = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`, {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: formData }),
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في إتمام الطلب: ${errorBody}`);
    }
    return await response.json();
}

export async function cashCheckout(formData: Icheckout, token: string, cartId: string) {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
    }
    const response = await fetch(`${BASE_URL}/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: formData }),
    });
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`خطأ في إتمام الطلب: ${errorBody}`);
    }
    return await response.json();
}
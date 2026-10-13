"use server"

import { getTokenServer } from "@/lib/auth";
import { addCart, addproductincart, removeAllPtroduc, removePtroduc, updateCartProductQuantity } from "@/services/cart.service";
import { Icart } from "@/types/cart";

// Validates that an authentication token is present, throwing an error if absent.
function requireToken(token: string | null): string {
    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً");
    }
    return token;
}

// Server action to add a product to the user's cart using their authenticated session token.
export async function addtocart(productid: string) {
    const token = requireToken(await getTokenServer());
    return await addCart(productid, token);
}

// Server action to fetch the current user's cart from the server.
export async function showaddproduct() {
    const token = requireToken(await getTokenServer());
    return await addproductincart(token);
}

// Server action to remove a specific product from the user's cart.
export async function removeProductfromcart(productId: string): Promise<Icart> {
    const token = requireToken(await getTokenServer());
    return await removePtroduc(productId, token);
}

// Server action to clear all products from the user's cart.
export async function removeAllProductfromcart() {
    const token = requireToken(await getTokenServer());
    return await removeAllPtroduc(token);
}

// Server action to update the quantity of a product in the user's cart.
export async function updateProductfromcart(productId: string, count: number) {
    const token = requireToken(await getTokenServer());
    return await updateCartProductQuantity(productId, token, count);
}

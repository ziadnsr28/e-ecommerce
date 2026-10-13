"use client"
import { addtocart } from "@/actions/cart.server";
import { CartCountContext } from "@/context/cartContext";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { toast } from "sonner";

// Custom hook providing add-to-cart functionality with loading state for both authenticated and guest users.
export function AddToCart(defaultProductId?: string) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { handleCart } = useContext(CartCountContext)!
    const { status } = useSession();
    console.log(status)

    // Handles adding a product to the server cart (authenticated) or localStorage cart (guest).
    async function addProduct(productId?: string) {
        const targetId = productId || defaultProductId;
        if (!targetId) return;
        try {
            if (status === "authenticated") {
                setIsLoading(true);
                const data = await addtocart(targetId);
                handleCart()
                console.log(data);
                toast.success("تمت إضافة المنتج للسلة بنجاح! 🛒");
            } else if (status === "unauthenticated") {
                const cart = localStorage.getItem("guestCart");
                const guestCart = cart ? JSON.parse(cart) : [];
                const product = guestCart.find(
                    (item: { productId: string; quantity: number }) =>  item.productId === targetId

                );
                if (product) {
                    product.quantity++;
                } else {
                    guestCart.push({
                        productId: targetId,
                        quantity: 1
                    });
                }
                // بنحفظ السلة في كشكول المتصفح
                localStorage.setItem(
                    "guestCart",
                    JSON.stringify(guestCart)
                );
                // بننادي المنبه عشان العداد اللي فوق في الـ Navbar يزيد فوراً
                handleCart();
                // بنطلع رسالة النجاح الخضراء
                toast.success("تمت إضافة المنتج للسلة بنجاح! 🛒");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء الإضافة");
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, addProduct };
}

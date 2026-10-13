"use client"
import { removeProductfromcart, updateProductfromcart } from "@/actions/cart.server";
import { IcartProduct } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext, useState, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { CartCountContext } from "@/context/cartContext";
import { useSession } from "next-auth/react";
import { formatEGP } from "@/lib/formatters";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { playDeleteSuccessSound } from "@/lib/audio";

// Renders an individual cart product row with image, price, quantity controls, and remove action.
export function CartItemCard({ product, setproduct }: { product: IcartProduct, setproduct: Dispatch<SetStateAction<IcartProduct[] | undefined>> }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const itemPrice = product.price ?? product.product?.price ?? 0;
    const { handleCart } = useContext(CartCountContext)!
    const { status } = useSession();

    // Removes this product from the cart (server or localStorage) and updates the UI.
    async function removeItem() {
        try {
            setIsDeleting(true);

            // If user is authenticated: remove on server
            if (status === "authenticated") {
                const data = await removeProductfromcart(product.product._id);
                handleCart();
                if (data?.data?.products) {
                    setproduct(data.data.products);
                    playDeleteSuccessSound();
                    toast.success("Item removed from cart");
                    setIsConfirmOpen(false);
                }
            }

            // If user is guest: remove from local storage and update state
            if (status === "unauthenticated") {
                const cart = localStorage.getItem("guestCart");
                const guestCart = cart ? JSON.parse(cart) : [];

                const updatedCart = [];
                if (Array.isArray(guestCart)) {
                    for (let i = 0; i < guestCart.length; i++) {
                        const item = guestCart[i];
                        if (item.productId !== product._id && item.productId !== product.product?._id) {
                            updatedCart.push(item);
                        }
                    }
                }

                localStorage.setItem("guestCart", JSON.stringify(updatedCart));

                setproduct((prevProducts) => {
                    if (!prevProducts) return [];
                    return prevProducts.filter((item) => item._id !== product._id);
                });

                handleCart();
                playDeleteSuccessSound();
                toast.success("Item removed from cart");
                setIsConfirmOpen(false);
            }
        } catch (error) {
            toast.error("Failed to remove item from cart");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    }

    // Updates the quantity of this product in the cart (server or localStorage).
    async function updateItem(count: number) {
        // لو الرقم قل عن 1 منعملش حاجة ومينفعش ينزل للصفر
        if (count < 1) {
            return;
        }

        try {
            setIsLoading(true);

            // لو المستخدم مسجل: كلم السيرفر زي الكود القديم بالظبط
            if (status === "authenticated") {
                const data = await updateProductfromcart(product.product._id, count);
                handleCart();
                if (data?.data?.products) {
                    setproduct(data.data.products);
                    toast.success("تم التحديث بنجاح");
                }
            }

            // لو المستخدم زائر: عدل في الكشكول وعلى الشاشة فوراً
            if (status === "unauthenticated") {
                // بنقرا الكشكول من المتصفح
                const cart = localStorage.getItem("guestCart");
                const guestCart = cart ? JSON.parse(cart) : [];

                // لفة بسيطة تدور على المنتج وتغير كميته للرقم الجديد
                for (let i = 0; i < guestCart.length; i++) {
                    if (guestCart[i].productId === product._id || guestCart[i].productId === product.product?._id) {
                        guestCart[i].quantity = count;
                    }
                }

                // بنحفظ الكشكول بعد التعديل
                localStorage.setItem("guestCart", JSON.stringify(guestCart));

                // بنغير الرقم في الشاشة قدام عين المستخدم وفي إجمالي السعر
                setproduct((prevProducts) => {
                    if (!prevProducts) return [];
                    return prevProducts.map((item) => {
                        if (item._id === product._id) {
                            return { ...item, count: count };
                        }
                        return item;
                    });
                });

                // بنحدث العداد في الـ Navbar فوق
                handleCart();

                toast.success("تم التحديث بنجاح");
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء التحديث");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        isLoading ? (
            <div className="flex p-8 w-full flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                    <Spinner className="h-8 w-8 animate-spin text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-500">Loading your cart...</p>
            </div>
        ) : (
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md hover:border-gray-200 sm:flex-row sm:items-center">
                {/* Product image */}
                <div className="flex flex-shrink-0 items-center gap-4">
                    <Image
                        src={product.product.imageCover}
                        alt={product.product.title}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-xl border border-gray-100 object-cover"
                    />
                    {/* Name + category + price (mobile) */}
                    <div className="flex flex-col gap-1 sm:hidden">
                        <span className="font-semibold text-gray-900">{product.product.title}</span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700">
                                {product.product.category?.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Name + category + price (desktop) */}
                <div className="hidden flex-1 flex-col gap-1 sm:flex">
                    <span className="font-semibold text-gray-900">{product.product.title}</span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700">
                            {product.product.category?.name}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-green-600">
                            {formatEGP(itemPrice)}
                        </span>
                        <span className="text-xs text-gray-400">per unit</span>
                    </div>
                </div>

                <div className="flex flex-shrink-0 flex-col items-start gap-2 sm:items-center">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 px-1 py-1">
                        <button
                            type="button"
                            disabled={product.count <= 1}
                            onClick={() => updateItem(product.count - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-all duration-150 active:scale-90 disabled:opacity-40"
                        >
                            <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold text-gray-900">
                            {product.count}
                        </span>
                        <button
                            type="button"
                            onClick={() => updateItem(product.count + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 transition-all duration-150 active:scale-90"
                        >
                            <Plus className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* Quantity stepper + stock badge */}


                {/* Line total + remove */}
                <div className="flex flex-shrink-0 items-center justify-between gap-4 sm:w-28 sm:flex-col sm:items-end sm:justify-center">
                    <div className="text-right ">
                        <div className="text-xs text-gray-400">Total</div>
                        <span className="text-sm font-semibold mt-5 block text-gray-900 sm:text-base">
                            {formatEGP(itemPrice * product.count)}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsConfirmOpen(true)}
                        type="button"
                        aria-label="Remove item"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150 hover:scale-110 active:scale-90"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>

                <DeleteConfirmDialog
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={removeItem}
                    itemName={product.product?.title}
                    itemType="cart"
                    isDeleting={isDeleting}
                />
            </div>
        )
    );
}
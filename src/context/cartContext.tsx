"use client"
import { addtocart, showaddproduct, updateProductfromcart } from "@/actions/cart.server"
import { Icart, IcartProduct } from "@/types/cart"
import { useSession } from "next-auth/react"
import { createContext, useEffect, useRef, useState } from "react"

type creatContextType = {
    countCart: number
    handleCart: () => void
    isSyncing: boolean
}

export const CartCountContext = createContext<creatContextType | null>(null)

// Provides global cart item count state, guest-to-authenticated cart sync, and cart refresh logic.
export default function ShowNumberItemProvider({ children }: { children: React.ReactNode }) {
    const [countCart, setCountCart] = useState<number>(0)
    const [isSyncing, setIsSyncing] = useState<boolean>(false)
    const { status } = useSession()

    const isSyncingRef = useRef<boolean>(false)

    // Refreshes the cart item count from the server (authenticated) or localStorage (guest).
    async function handleCart() {
        if (status === "loading") {
            return;
        }

        if (status === "authenticated") {
            try {
                const data: Icart = await showaddproduct()
                const products = data?.data?.products || []
                const totalitmes = products.reduce((accu, prod) => prod.count + accu, 0)
                setCountCart(totalitmes)
            } catch (error) {
                console.log(error)
                // نصفر العداد فقط لو السيرفر أكد رسمياً أن السلة فارغة وغير موجودة
                if (error instanceof Error && error.message.includes("No cart exist for this user")) {
                    setCountCart(0)
                }
            }
        }

        if (status === "unauthenticated") {
            try {
                const cart = localStorage.getItem("guestCart");
                const guestCart = cart ? JSON.parse(cart) : [];

                let total = 0;
                for (let i = 0; i < guestCart.length; i++) {
                    const item = guestCart[i];
                    if (item && item.quantity) {
                        total = total + item.quantity;
                    }
                }

                setCountCart(total);
            } catch (error) {
                console.log(error);
                setCountCart(0);
            }
        }
    }

    // دالة نقل منتجات الزائر إلى سلة المستخدم المسجل
    // Merges guest cart items from localStorage into the authenticated user's server cart.
    async function syncGuestCart() {
        // لو مفيش نافذة متصفح، أو النقل شغال حالياً، متعملش حاجة
        if (typeof window === "undefined" || isSyncingRef.current) {
            return;
        }

        const cart = localStorage.getItem("guestCart");
        const guestCart = cart ? JSON.parse(cart) : [];

        // لو الكشكول فاضي ومفيهوش منتجات، اخرج
        if (!Array.isArray(guestCart) || guestCart.length === 0) {
            return;
        }

        // 1. نقفل القفل الداخلي ونفعل حالة النقل عشان صفحة السلة تستنى
        isSyncingRef.current = true;
        setIsSyncing(true);

        try {
            // 2. بنجيب سلة المستخدم الأصلية من السيرفر عشان نعرف إيه اللي عنده قبل ما ننقل
            let userProducts: IcartProduct[] = [];

            try {
                const userCartData: Icart = await showaddproduct();
                userProducts = userCartData?.data?.products || [];
            } catch (error) {
                console.log("Unable to read the current user cart. Sync stopped:", error);

                // لو فشل جلب السلة، بنوقف العملية فوراً ومنمسحش كشكول الزائر للأمان
                return;
            }

            // مصفوفة هنحط فيها المنتجات اللي تفشل فقط (لو حصل عطل في الشبكة مثلاً)
            const failedItems = [];

            for (let i = 0; i < guestCart.length; i++) {
                const item = guestCart[i];
                // علامة بنعرف بيها هل خطوة addtocart نجحت ولا لأ
                let addedToServer = false;

                try {
                    // 3. بنشوف هل المنتج ده موجود أصلاً في سلة المستخدم؟
                    const existingProduct = userProducts.find(function (p) {
                        return p.product?._id === item.productId || p._id === item.productId;
                    });

                    if (existingProduct) {
                        // الحالة الأولى: المنتج موجود مسبقاً -> بنجمع الكمية القديمة + كمية الزائر
                        const totalQuantity = existingProduct.count + item.quantity;
                        await updateProductfromcart(item.productId, totalQuantity);
                    } else {
                        // الحالة الثانية: منتج جديد خالص -> بنضيفه للسيرفر
                        await addtocart(item.productId);
                        // addtocart نجحت، يبقى في قطعة واحدة اتضافت للسيرفر خلاص
                        addedToServer = true;

                        // لو الزائر مختار أكتر من قطعة واحدة، بنحدث الكمية للرقم المطلوب
                        if (item.quantity > 1) {
                            await updateProductfromcart(item.productId, item.quantity);
                        }
                    }
                } catch (error) {
                    console.log("Failed to sync product:", item.productId, error);

                    // لو addtocart نجحت لكن تحديث باقي الكمية فشل:
                    // السيرفر أخذ قطعة واحدة خلاص، فنسيب في الكشكول فقط القطع المتبقية
                    if (addedToServer && item.quantity > 1) {
                        failedItems.push({
                            ...item,
                            quantity: item.quantity - 1,
                        });
                    } else {
                        // لو addtocart نفسه فشل أو المنتج كان موجود مسبقاً، نحفظ كامل الكمية كما هي
                        failedItems.push(item);
                    }
                }
            }

            // لو كل المنتجات اتنقلت بنجاح، امسح كشكول guestCart
            if (failedItems.length === 0) {
                localStorage.removeItem("guestCart");
            } else {
                // لو في منتج فشل، سيبه في الكشكول عشان نحاول بعدين
                localStorage.setItem("guestCart", JSON.stringify(failedItems));
            }
        } catch (error) {
            console.log("Unexpected error during sync:", error);
        } finally {
            // نفتح القفل وننهي حالة النقل دائماً مهما حصل
            isSyncingRef.current = false;
            setIsSyncing(false);
        }

        // نحدث العداد في الـ Navbar بعد ما المنتجات اتنقلت
        await handleCart();
    }

    // المنبه: بيشتغل أول ما نعرف حالة المستخدم (زائر ولا مسجل)
    useEffect(() => {
        if (status === "loading") {
            return;
        }

        const runCartLogic = async () => {
            // لو المستخدم مسجل دخوله، انقل سلة الزائر الأول وبعدها حدث العداد
            if (status === "authenticated") {
                await syncGuestCart();
            }
            await handleCart();
        };

        void runCartLogic();
    }, [status])

    return (
        <CartCountContext.Provider value={{ countCart, handleCart, isSyncing }}>
            {children}
        </CartCountContext.Provider>
    )
}
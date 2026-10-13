"use client"
import Link from "next/link";
import {
  ShoppingCart,
  ChevronRight,
  Package,
  ArrowRight,

} from "lucide-react";
import { removeAllProductfromcart, showaddproduct } from "@/actions/cart.server";
import { useContext, useEffect, useState } from "react";
import { Icart, IcartProduct } from "@/types/cart";
import { OrderSummary } from "@/components/cart/Ordersummary";
import { CartItemCard } from "@/components/cart/itemcart";
import { CartSkeleton } from "./loding";
import { CartCountContext } from "@/context/cartContext";
import { useSession } from "next-auth/react";
import { getSingleProduct } from "@/services/allproduct.service";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { playDeleteSuccessSound } from "@/lib/audio";
import { toast } from "sonner";




// Renders the cart page displaying cart items, order summary, and cart management controls.
export default function CartPage() {
  const [product, setproduct] = useState<IcartProduct[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState<boolean>(false);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const { countCart, handleCart, isSyncing } = useContext(CartCountContext)!
  const { status } = useSession();
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (isSyncing) {
      return;
    }
    if (status === "authenticated") {
      const cart = typeof window !== "undefined" ? localStorage.getItem("guestCart") : null;
      const guestCart = cart ? JSON.parse(cart) : [];
      if (Array.isArray(guestCart) && guestCart.length > 0) {
        return;
      }
    }

    // Fetches cart items from the server or local storage based on authentication status.
    async function addproduct() {
      try {
        setIsLoading(true);

        // If user is authenticated: fetch from server
        if (status === "authenticated") {
          try {
            const data: Icart = await showaddproduct();
            setproduct(data?.data?.products || []);
            handleCart();
          } catch (error) {
            if (error instanceof Error && error.message.includes("No cart exist for this user")) {
              setproduct([]);
            } else {
              console.log(error);
            }
          }
        }

        // If user is guest: fetch from localStorage
        if (status === "unauthenticated") {
          const cart = localStorage.getItem("guestCart");
          const parsed = cart ? JSON.parse(cart) : [];

          let guestCart = [];
          if (Array.isArray(parsed)) {
            guestCart = parsed.filter(function (item) {
              return item && typeof item === "object" && typeof item.productId === "string";
            });
          }

          const products = await Promise.all(
            guestCart.map(async function (item: { productId: string; quantity: number }) {
              try {
                const data = await getSingleProduct(item.productId);
                if (!data || !data.data) {
                  return null;
                }
                return {
                  _id: item.productId,
                  count: item.quantity,
                  price: data.data.price,
                  product: data.data,
                };
              } catch {
                return null;
              }
            })
          );

          const validProducts = products.filter(function (p): p is IcartProduct {
            return p !== null;
          });

          setproduct(validProducts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    addproduct();
  }, [status, isSyncing]);

  // Handles clearing all items from the cart for both authenticated and guest users.
  async function handleClearAll() {
    try {
      setIsClearing(true);

      if (status === "authenticated") {
        await removeAllProductfromcart();
        setproduct([]);
        handleCart();
        playDeleteSuccessSound();
        toast.success("Cart cleared successfully");
        setIsClearConfirmOpen(false);
      }

      if (status === "unauthenticated") {
        localStorage.removeItem("guestCart");
        setproduct([]);
        handleCart();
        playDeleteSuccessSound();
        toast.success("Cart cleared successfully");
        setIsClearConfirmOpen(false);
      }
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error(error);
    } finally {
      setIsClearing(false);
    }
  }

  const itemCount = product?.reduce((sum, item) => sum + item.count, 0) ?? 0;
  const subtotal =
    product?.reduce((sum, item) => sum + item.price * item.count, 0) ?? 0;
  const shipping = 0;
  if (isLoading || isSyncing) {
    return <>
      <CartSkeleton />
    </>
  }
  if (product?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-10 w-10 text-gray-300" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Your cart is empty
        </h2>

        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Looks like you haven&apos;t added anything to your cart yet. Start
          exploring our products!
        </p>

        <Link
          href="/products"
          className="mt-6 flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  };
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700">Shopping Cart</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
          <ShoppingCart className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500">
            {/* You have {itemCount} items in your cart */}
          </p>
        </div>
      </div>
      <span className="text-2xl mb-5 block text-gray-500 ">
        You have <span className="font-semibold text-green-600">{countCart} item</span>{" "} in your cart
      </span>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-gray-200 flex flex-col gap-5 bg-white">
            {product?.map((prod) => (
              <CartItemCard key={prod._id} product={prod} setproduct={setproduct} />
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <Link
              href="/products"
              className="font-medium text-gray-500 hover:text-gray-700"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={() => setIsClearConfirmOpen(true)}
              type="button"
              className="font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Clear all items
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            itemCount={itemCount}
            subtotal={subtotal}
            shipping={shipping}
            cartdata={product}
            showimg={false}
          />
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={handleClearAll}
        itemType="all-cart"
        isDeleting={isClearing}
      />
    </div>
  );
}
import { IcartProduct } from "@/types/cart";
import { ArrowLeft, Lock, ShieldCheck, ShoppingBag, Tag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderSummaryProps = {
  itemCount: number;
  subtotal: number;
  shipping: number;
  cartdata: IcartProduct[] | undefined;
  showimg: boolean;
  isSubmitting?: boolean;
};

// Renders the cart order summary panel with subtotal, shipping, total, and trust badges.
export function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  cartdata,
  showimg,
  isSubmitting = false,
}: OrderSummaryProps) {
  const total = subtotal + shipping;

  return (
    <aside className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-5">
      {/* Green header */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 px-4 py-3.5 text-white">
        <div className="flex items-center gap-2">
          <ShoppingBag size={16} />
          <h2 className="text-sm font-bold">Order Summary</h2>
        </div>
        <p className="mt-0.5 text-[11px] text-green-50">
          {itemCount} items in your cart
        </p>
      </div>

      <div className="p-4">
        {/* Free shipping banner (visual only) */}
        {showimg ? (
          <>
            <div className="max-h-[140px] space-y-3 overflow-y-auto pr-1">
              {cartdata?.map((prod) => (
                <div key={prod._id} className="flex h-16 bg-gray-100 rounded-3xl p-3 items-center gap-3">
                  <Image
                    width={100}
                    height={100}
                    src={prod.product.imageCover}
                    alt={prod.product.title}
                    className="h-10 w-10 shrink-0 rounded-full object-contain"
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium text-slate-800">
                      {prod.count} x {prod.price}
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      {prod.count * prod.price} EGP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-500 text-white">
                <Truck size={13} />
              </span>
              <p className="text-xs text-slate-700">Add 53 EGP for free shipping</p>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-orange-100">
              <div className="h-full w-[89%] rounded-full bg-orange-400" />
            </div>
          </div>
        )}

        {/* Subtotal, Shipping */}
        <div className="mt-5 space-y-3 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-slate-800">{subtotal} EGP</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span className="font-medium text-slate-800">{shipping} EGP</span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-sm font-bold text-slate-900">Total</span>
          <span className="text-xl font-extrabold text-slate-900">
            {total} <span className="text-[10px] font-medium text-slate-400">EGP</span>
          </span>
        </div>

        {/* Promo code button (visual only) */}
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2.5 text-xs font-medium text-slate-600"
        >
          <Tag size={12} className="text-slate-500" />
          Apply Promo Code
        </button>

        {/* Secure checkout button */}
        {showimg ? (
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-4 py-3.5 text-xs font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        ) : (
          <Link
            href="/checkout"
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-4 py-3.5 text-xs font-bold text-white"
          >
            Checkout
            <Lock size={14} />
          </Link>
        )}

        {/* Small badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-green-600" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <Truck size={11} className="text-blue-600" />
            Fast Delivery
          </span>
        </div>

        {/* Continue shopping link (visual only) */}
        <button
          type="button"
          className="mx-auto mt-4 flex items-center gap-1.5 text-[11px] font-medium text-green-600"
        >
          <ArrowLeft size={12} />
          Continue Shopping
        </button>
      </div>
    </aside>
  );
}
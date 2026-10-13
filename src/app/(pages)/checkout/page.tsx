"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Banknote,
  Check,
  CreditCard,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { OrderSummary } from "@/components/cart/Ordersummary";
import CheckoutForm from "@/components/Checkout/checkoutform";
import { Icart, IcartProduct } from "@/types/cart";
import { PaymentMethod } from "@/types/checkout";
import { showaddproduct } from "@/actions/cart.server";
interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

// The green bar at the top of every card
function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 px-4 py-3 text-white sm:px-5">
      <div className="flex items-center gap-2">
        <Icon size={14} />
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
      <p className="mt-1 text-[11px] text-green-50">{subtitle}</p>
    </div>
  );
}

interface PaymentSectionProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

function PaymentSection({ paymentMethod, setPaymentMethod }: PaymentSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <SectionTitle
        icon={CreditCard}
        title="Payment Method"
        subtitle="Choose how you'd like to pay"
      />

      <div className="space-y-3 p-4 sm:p-5">
        {/* Cash on Delivery */}
        <button
          type="button"
          onClick={() => setPaymentMethod("cash")}
          className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left ${paymentMethod === "cash"
            ? "border-green-500 bg-green-50"
            : "border-slate-200 bg-white"
            }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${paymentMethod === "cash"
              ? "bg-green-600 text-white"
              : "bg-slate-100 text-slate-500"
              }`}
          >
            <Banknote size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span
              className={`block text-xs font-bold ${paymentMethod === "cash" ? "text-green-800" : "text-slate-800"
                }`}
            >
              Cash on Delivery
            </span>
            <span className="mt-1 block text-[11px] text-slate-500">
              Pay when your order arrives at your doorstep
            </span>
          </span>
          {paymentMethod === "cash" ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
              <Check size={12} />
            </span>
          ) : (
            <span className="h-5 w-5 shrink-0 rounded-full border border-slate-300" />
          )}
        </button>

        {/* Pay Online */}
        <button
          type="button"
          onClick={() => setPaymentMethod("online")}
          className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left ${paymentMethod === "online"
            ? "border-green-500 bg-green-50"
            : "border-slate-200 bg-white"
            }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${paymentMethod === "online"
              ? "bg-green-600 text-white"
              : "bg-slate-100 text-slate-500"
              }`}
          >
            <CreditCard size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span
              className={`block text-xs font-bold ${paymentMethod === "online" ? "text-green-800" : "text-slate-800"
                }`}
            >
              Pay Online
            </span>
            <span className="mt-1 block text-[11px] text-slate-500">
              Secure payment with Credit/Debit Card via Stripe
            </span>
            {/* Small card logos */}
            <span className="mt-1.5 flex gap-1">
              <span className="h-2.5 w-4 rounded-sm bg-blue-600" />
              <span className="h-2.5 w-4 rounded-sm bg-orange-500" />
              <span className="h-2.5 w-4 rounded-sm bg-blue-500" />
            </span>
          </span>
          {paymentMethod === "online" ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
              <Check size={12} />
            </span>
          ) : (
            <span className="h-5 w-5 shrink-0 rounded-full border border-slate-300" />
          )}
        </button>

        {/* Secure & Encrypted box */}
        <div className="flex items-center gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
            <ShieldCheck size={13} />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-green-800">
              Secure &amp; Encrypted
            </p>
            <p className="text-[10px] text-green-600">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Checkout() {
  const [products, setProducts] = useState<IcartProduct[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const data: Icart = await showaddproduct();
        setProducts(data?.data?.products || []);
        setCartId(data?.cartId || data?.data?._id || "");
        console.log("Cart data loaded:", products);
      } catch (error) {
        console.error(error);
      }
    }
    loadCart();
  }, []);

  const itemCount = products.reduce((sum, item) => sum + item.count, 0);
  const subtotal = products.reduce((sum, item) => sum + item.price * item.count, 0);
  const shipping = 0;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* Breadcrumb */}
        <p className="text-[11px] text-slate-500">
          Home <span className="mx-1">/</span> Cart <span className="mx-1">/</span>
          <span className="font-semibold text-slate-800">Checkout</span>
        </p>

        {/* Page title + Back to Cart */}
        <div className="mb-5 mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white">
                <FileText size={18} />
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                Complete Your Order
              </h1>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Review your items and complete your purchase
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-semibold text-green-600"
          >
            <ArrowLeft size={14} />
            Back to Cart
          </a>
        </div>

        {/* Two columns on large screens, stacked on small ones */}
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="space-y-5">
            <CheckoutForm
              cartId={cartId}
              paymentMethod={paymentMethod}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
            <PaymentSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          </div>
          <div>
            <OrderSummary
              itemCount={itemCount}
              subtotal={subtotal}
              shipping={shipping}
              cartdata={products}
              showimg={true}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
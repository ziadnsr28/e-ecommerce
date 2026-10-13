"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LogIn, Package } from "lucide-react";
import { useSession } from "next-auth/react";
import { getUserOrdersAction } from "@/actions/orders.server";
import { IOrder } from "@/types/order";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrdersSkeleton } from "@/components/orders/OrdersSkeleton";
import { OrdersEmptyState } from "@/components/orders/OrdersEmptyState";

export default function AllOrdersPage() {
  const { status } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (status !== "authenticated") {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getUserOrdersAction();
        if (res.success && res.data) {
          setOrders(res.data);
          // By default, expand the first order to match the reference screenshot layout
          if (res.data.length > 0) {
            setExpandedOrderId(res.data[0].id || res.data[0]._id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (status !== "loading") {
      fetchOrders();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 text-slate-800">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Unauthenticated View */}
        {status === "unauthenticated" ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 shadow-xs">
              <Package size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Sign In to View Your Orders
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Please sign in with your account to view your past purchases, track active shipments, and manage your orders.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 transition-colors"
              >
                <LogIn size={16} />
                Sign In
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : status === "loading" || isLoading ? (
          <div className="space-y-6">
            <OrdersHeader totalOrders={0} />
            <OrdersSkeleton />
          </div>
        ) : orders.length === 0 ? (
          <div className="space-y-6">
            <OrdersHeader totalOrders={0} />
            <OrdersEmptyState />
          </div>
        ) : (
          /* Orders List matching screenshot */
          <div className="space-y-6">
            <OrdersHeader totalOrders={orders.length} />

            <div className="space-y-4">
              {orders.map((order) => {
                const orderKey = order.id || order._id;
                const isExpanded = expandedOrderId === orderKey;

                return (
                  <OrderCard
                    key={order._id || order.id}
                    order={order}
                    isExpanded={isExpanded}
                    onToggle={() =>
                      setExpandedOrderId(isExpanded ? null : orderKey)
                    }
                  />
                );
              })}
            </div>

            {/* Back to Shop link */}
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

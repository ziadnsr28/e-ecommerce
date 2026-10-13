"use client";

import React from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Package,
  Phone,
  Receipt,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { IOrder } from "@/types/order";

interface OrderCardProps {
  order: IOrder;
  isExpanded: boolean;
  onToggle: () => void;
}

export function OrderCard({ order, isExpanded, onToggle }: OrderCardProps) {
  // Format creation date
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Calculate total items count
  const totalItemCount = order.cartItems?.reduce(
    (sum, item) => sum + (item.count || 1),
    0
  ) || 0;

  // Determine status details
  let statusBadge = {
    label: "Processing",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200/60",
    dotBg: "bg-amber-500",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200/60",
    iconText: "text-amber-600",
    Icon: Clock,
  };

  if (order.isDelivered) {
    statusBadge = {
      label: "Delivered",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      dotBg: "bg-emerald-500",
      iconBg: "bg-emerald-50",
      iconBorder: "border-emerald-200/60",
      iconText: "text-emerald-600",
      Icon: Truck,
    };
  } else if (order.isPaid) {
    statusBadge = {
      label: "Paid",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200/60",
      dotBg: "bg-blue-500",
      iconBg: "bg-blue-50",
      iconBorder: "border-blue-200/60",
      iconText: "text-blue-600",
      Icon: ShieldCheck,
    };
  }

  const StatusIcon = statusBadge.Icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-200 hover:border-gray-200">
      {/* Top Card Summary Row */}
      <div
        onClick={onToggle}
        className="flex cursor-pointer flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 hover:bg-gray-50/40 transition-colors"
      >
        {/* Left Side: Status Icon Badge + Order Meta */}
        <div className="flex items-start gap-3.5 sm:items-center">
          {/* Shield/Status Icon Badge */}
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${statusBadge.iconBg} ${statusBadge.iconBorder} ${statusBadge.iconText} shadow-2xs`}
          >
            <StatusIcon size={20} className="stroke-[2.2]" />
          </div>

          <div className="min-w-0 space-y-1">
            {/* Status Pill + Order ID */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${statusBadge.badgeBg}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dotBg}`} />
                {statusBadge.label}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-gray-900">
                # {order.id || (order._id ? order._id.slice(-5) : "00000")}
              </span>
            </div>

            {/* Meta details: Date, Item count, City */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1">
                <Calendar size={13} className="text-gray-400" />
                {orderDate}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Package size={13} className="text-gray-400" />
                {totalItemCount} {totalItemCount === 1 ? "Item" : "Items"}
              </span>
              {order.shippingAddress?.city && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-gray-400" />
                    {order.shippingAddress.city}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Total Price + Details Toggle Button */}
        <div className="flex items-center justify-between gap-4 border-t border-gray-50 pt-3 sm:border-0 sm:pt-0 sm:justify-end">
          <div className="text-left sm:text-right">
            <span className="text-base sm:text-lg font-black text-gray-900">
              {order.totalOrderPrice.toLocaleString()} EGP
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-150 active:scale-95 shadow-xs ${
              isExpanded
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>{isExpanded ? "Hide Details" : "Details"}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded Order Content */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/20 p-4 sm:p-6 space-y-6 animate-in fade-in-50 slide-in-from-top-1 duration-200">
          {/* Section 1: Order Items List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Order Items
            </div>

            <div className="rounded-xl border border-gray-100 bg-white divide-y divide-gray-50 shadow-xs">
              {order.cartItems?.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="flex items-center justify-between gap-3 p-3.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white p-1">
                      {item.product?.imageCover ? (
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title || "Product"}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-300">
                          <Package size={20} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.product?.title || "Product"}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {item.count} × {item.price.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">
                    {(item.price * item.count).toLocaleString()} EGP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Shipping Address & Order Summary side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Box: Shipping Address */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wide">
                <MapPin size={14} className="text-blue-500" />
                Shipping Address
              </div>
              <div className="pt-1">
                <p className="text-xs font-bold text-gray-900">
                  {order.shippingAddress?.city || "Cairo"}
                </p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  {order.shippingAddress?.details || "Street Address"}
                </p>
                {order.shippingAddress?.phone && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-600">
                    <Phone size={12} className="text-gray-400" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Box: Order Summary (Warm amber card matching screenshot) */}
            <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide">
                <Receipt size={14} className="text-amber-600" />
                Order Summary
              </div>
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex items-center justify-between text-amber-900/80">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-amber-950">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex items-center justify-between text-amber-900/80">
                  <span>Shipping:</span>
                  <span className="font-semibold text-emerald-700">Free</span>
                </div>
                <div className="border-t border-amber-200/70 pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">Total:</span>
                  <span className="text-sm sm:text-base font-extrabold text-amber-950">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

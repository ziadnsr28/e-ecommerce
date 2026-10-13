"use client";

import React, { useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  addressSchema,
  AddressSchemaType,
} from "@/lib/Schema/address.schema";
import { addAddressAction } from "@/actions/address.server";
import { FieldError } from "@/components/ui/field-error";
import { Spinner } from "@/components/ui/spinner";
import { IAddress } from "@/types/address";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressAdded: (updatedAddresses?: IAddress[]) => void;
}

export default function AddAddressModal({
  isOpen,
  onClose,
  onAddressAdded,
}: AddAddressModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      city: "",
      phone: "",
      details: "",
    },
  });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: AddressSchemaType) => {
    try {
      const res = await addAddressAction(data);
      if (res.success) {
        toast.success(res.message || "Address added successfully");
        reset();
        onClose();
        onAddressAdded(res.data);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to add address. Please try again.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <MapPin size={16} />
            </div>
            <div>
              <h3
                id="modal-title"
                className="text-xs sm:text-sm font-bold text-gray-900"
              >
                Add New Address
              </h3>
              <p className="text-[11px] text-gray-400">
                Enter your delivery address details
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3.5">
          {/* Address Name / Label */}
          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              Address Label
            </label>
            <input
              type="text"
              placeholder="e.g. Home, Work, Office"
              disabled={isSubmitting}
              {...register("name")}
              className={`w-full rounded-xl border ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50`}
            />
            <FieldError message={errors.name?.message} />
          </div>

          {/* City */}
          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="e.g. Cairo, Giza, Alexandria"
              disabled={isSubmitting}
              {...register("city")}
              className={`w-full rounded-xl border ${
                errors.city
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50`}
            />
            <FieldError message={errors.city?.message} />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="01xxxxxxxxx"
              disabled={isSubmitting}
              {...register("phone")}
              className={`w-full rounded-xl border ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50`}
            />
            <FieldError message={errors.phone?.message} />
          </div>

          {/* Details */}
          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              Street / Building / Details
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 15 El-Tahrir St, Building 4, Apt 8"
              disabled={isSubmitting}
              {...register("details")}
              className={`w-full rounded-xl border ${
                errors.details
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50 resize-none`}
            />
            <FieldError message={errors.details?.message} />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="size-3.5 text-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Address</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

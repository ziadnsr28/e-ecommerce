"use client";

import React, { useState } from "react";
import { MapPin, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { IAddress } from "@/types/address";
import { deleteAddressAction } from "@/actions/address.server";
import { Spinner } from "@/components/ui/spinner";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { playDeleteSuccessSound } from "@/lib/audio";

interface AddressCardProps {
  address: IAddress;
  onAddressDeleted: (addressId: string, updatedAddresses?: IAddress[]) => void;
}

export default function AddressCard({
  address,
  onAddressDeleted,
}: AddressCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteAddressAction(address._id);
      if (res.success) {
        playDeleteSuccessSound();
        toast.success(res.message || "Address removed successfully");
        setIsConfirmOpen(false);
        onAddressDeleted(address._id, res.data);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to delete address. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-xs space-y-3 transition-all hover:shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <MapPin size={16} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              {address.name || "Delivery Address"}
            </h3>
            <p className="text-[11px] text-gray-400">{address.city}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            disabled={isDeleting}
            aria-label="Delete address"
            className="rounded-lg p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {isDeleting ? <Spinner className="size-3 text-red-500" /> : <Trash2 size={13} />}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-50 pt-2.5 space-y-1 text-xs text-gray-500">
        {address.phone && (
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-gray-400 shrink-0" />
            <span className="truncate">{address.phone}</span>
          </div>
        )}
        {address.details && (
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-gray-400 shrink-0" />
            <span className="truncate">{address.details}</span>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        itemName={address.name || "Delivery Address"}
        itemType="address"
        isDeleting={isDeleting}
      />
    </div>
  );
}

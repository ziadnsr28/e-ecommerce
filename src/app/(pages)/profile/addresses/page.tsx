"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Plus, MapPin, AlertCircle, RefreshCw } from "lucide-react";
import { IAddress } from "@/types/address";
import { getAddressesAction } from "@/actions/address.server";
import AddressCard from "@/components/profile/AddressCard";
import AddAddressModal from "@/components/profile/AddAddressModal";

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadAddresses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAddressesAction();
      if (res.success) {
        setAddresses(res.data);
      } else {
        setError(res.message);
      }
    } catch {
      setError("Failed to load delivery addresses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getAddressesAction();
        if (isMounted) {
          if (res.success) {
            setAddresses(res.data);
          } else {
            setError(res.message);
          }
        }
      } catch {
        if (isMounted) {
          setError("Failed to load delivery addresses. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddressAdded = (updatedAddresses?: IAddress[]) => {
    if (updatedAddresses && Array.isArray(updatedAddresses) && updatedAddresses.length > 0) {
      setAddresses(updatedAddresses);
    } else {
      loadAddresses();
    }
  };

  const handleAddressDeleted = (deletedId: string, updatedAddresses?: IAddress[]) => {
    if (updatedAddresses && Array.isArray(updatedAddresses)) {
      setAddresses(updatedAddresses);
    } else {
      setAddresses((prev) => prev.filter((a) => a._id !== deletedId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section matching design */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
            My Addresses
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors"
        >
          <Plus size={14} />
          Add Address
        </button>
      </div>

      {/* Content Area */}
      {isLoading ? (
        /* Loading Skeleton */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-xs space-y-3 animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-gray-100" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-24 bg-gray-100 rounded" />
                    <div className="h-2.5 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-5 w-5 bg-gray-100 rounded" />
              </div>
              <div className="border-t border-gray-50 pt-2.5 space-y-1.5">
                <div className="h-3 w-28 bg-gray-100 rounded" />
                <div className="h-3 w-40 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error && addresses.length === 0 ? (
        /* Error State */
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center shadow-xs space-y-3">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Failed to load addresses
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{error}</p>
          </div>
          <button
            type="button"
            onClick={loadAddresses}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={12} />
            Try Again
          </button>
        </div>
      ) : addresses.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-xs space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <MapPin size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900">
              No saved addresses yet
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              You haven&apos;t added any delivery addresses. Add an address to make your checkout fast and seamless.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors"
            >
              <Plus size={14} />
              Add Your First Address
            </button>
          </div>
        </div>
      ) : (
        /* Address Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onAddressDeleted={handleAddressDeleted}
            />
          ))}
        </div>
      )}

      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddressAdded={handleAddressAdded}
      />
    </div>
  );
}

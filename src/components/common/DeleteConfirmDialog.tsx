"use client";

import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export type DeleteItemType = "cart" | "wishlist" | "address" | "all-cart" | "generic";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  itemName?: string;
  itemType?: DeleteItemType;
  customMessage?: string;
  title?: string;
  isDeleting?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "generic",
  customMessage,
  title = "Confirm Deletion",
  isDeleting = false,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
}: DeleteConfirmDialogProps) {
  // Dismiss on Escape key when not actively deleting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;

  // Build the English confirmation message
  const renderMessage = () => {
    if (customMessage) {
      return customMessage;
    }

    const safeName = itemName?.trim();

    if (itemType === "cart") {
      return safeName ? (
        <>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">&lsquo;{safeName}&rsquo;</span>{" "}
          from your cart?
        </>
      ) : (
        "Are you sure you want to delete this product from your cart?"
      );
    }

    if (itemType === "wishlist") {
      return safeName ? (
        <>
          Are you sure you want to remove{" "}
          <span className="font-semibold text-gray-900">&lsquo;{safeName}&rsquo;</span>{" "}
          from your wishlist?
        </>
      ) : (
        "Are you sure you want to remove this product from your wishlist?"
      );
    }

    if (itemType === "address") {
      return safeName ? (
        <>
          Are you sure you want to delete the saved address{" "}
          <span className="font-semibold text-gray-900">&lsquo;{safeName}&rsquo;</span>?
        </>
      ) : (
        "Are you sure you want to delete this saved address?"
      );
    }

    if (itemType === "all-cart") {
      return "Are you sure you want to remove all items from your cart?";
    }

    return safeName ? (
      <>
        Are you sure you want to delete{" "}
        <span className="font-semibold text-gray-900">&lsquo;{safeName}&rsquo;</span>?
      </>
    ) : (
      "Are you sure you want to delete this item?"
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-title"
      aria-describedby="delete-confirm-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-2xs transition-all duration-150 animate-in fade-in"
      onClick={(e) => {
        // Click outside backdrop cancels when not deleting
        if (e.target === e.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-sm sm:max-w-md rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 slide-in-from-bottom-2 duration-150">
        {/* Delete-related icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <Trash2 size={24} />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h3
            id="delete-confirm-title"
            className="text-base sm:text-lg font-bold text-gray-900"
          >
            {title}
          </h3>
          <p
            id="delete-confirm-description"
            className="text-xs sm:text-sm text-gray-500 leading-relaxed px-2"
          >
            {renderMessage()}
          </p>
        </div>

        {/* Action buttons: Cancel and Yes, Delete */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full sm:w-auto flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-all duration-150 active:scale-[0.98] disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Spinner className="size-3.5 text-white" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

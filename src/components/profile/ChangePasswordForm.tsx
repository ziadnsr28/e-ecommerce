"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/lib/Schema/changePassword.schema";
import { changePasswordAction } from "@/actions/user.server";
import { FieldError } from "@/components/ui/field-error";
import { Spinner } from "@/components/ui/spinner";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    setIsSubmitting(true);
    try {
      const res = await changePasswordAction(data);
      if (res.success) {
        toast.success(
          "Password changed successfully! Please log in with your new password."
        );
        reset();
        // Route Misr invalidates old tokens upon password change.
        // Sign out and redirect to login after a brief pause so user sees the success message.
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 1500);
      } else {
        toast.error(res.message);
        if (
          res.message.toLowerCase().includes("current password") ||
          res.message.includes("Incorrect")
        ) {
          setError("currentPassword", { message: res.message });
        }
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header matching design */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Lock size={18} />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900">
            Change Password
          </h3>
          <p className="text-[11px] text-gray-400">
            Update your account password
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 max-w-xl">
        {/* Current Password Field */}
        <div>
          <label className="block text-[11px] font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter your current password"
              disabled={isSubmitting}
              {...register("currentPassword")}
              className={`w-full rounded-xl border ${
                errors.currentPassword
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 pr-9 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50 disabled:opacity-70`}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              tabIndex={-1}
              aria-label={showCurrent ? "Hide current password" : "Show current password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <FieldError message={errors.currentPassword?.message} />
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-[11px] font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter your new password"
              disabled={isSubmitting}
              {...register("password")}
              className={`w-full rounded-xl border ${
                errors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 pr-9 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50 disabled:opacity-70`}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              tabIndex={-1}
              aria-label={showNew ? "Hide new password" : "Show new password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
          {!errors.password && (
            <p className="mt-1 text-[10px] text-gray-400">
              Must be at least 6 characters
            </p>
          )}
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label className="block text-[11px] font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your new password"
              disabled={isSubmitting}
              {...register("rePassword")}
              className={`w-full rounded-xl border ${
                errors.rePassword
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-600"
              } bg-white px-3.5 py-2 pr-9 text-xs text-gray-800 shadow-2xs focus:outline-hidden disabled:bg-gray-50 disabled:opacity-70`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <FieldError message={errors.rePassword?.message} />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-3.5 text-white" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Change Password</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

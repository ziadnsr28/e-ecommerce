import React from "react";
import { User } from "lucide-react";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header matching Screenshot 1 */}
      <div>
        <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
          Account Settings
        </h2>
        <p className="mt-0.5 text-xs text-gray-500">
          Update your profile information and change your password
        </p>
      </div>

      {/* Card 1: Profile Information */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <User size={18} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Profile Information
            </h3>
            <p className="text-[11px] text-gray-400">
              Update your personal details
            </p>
          </div>
        </div>

        <div className="space-y-3.5 max-w-xl">
          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Usama"
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:border-green-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:border-green-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="01xxxxxxxxx"
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-800 shadow-2xs focus:border-green-600 focus:outline-hidden"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>

        {/* Account Info Details */}
        <div className="border-t border-gray-100 pt-4 max-w-xl space-y-2">
          <h4 className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
            Account Information
          </h4>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>User ID</span>
            <span className="font-mono text-gray-400">—</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Role</span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
              User
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Change Password */}
      <ChangePasswordForm />
    </div>
  );
}

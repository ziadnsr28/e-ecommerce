import React from "react";
import { User } from "lucide-react";
import PageHero from "@/components/heropages/hero";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 text-slate-800">
      {/* Green Header Banner matching reference screenshot */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Account" },
        ]}
        title="My Account"
        description="Manage your addresses and account settings"
        icon={<User className="h-6 w-6" />}
        theme="green"
      />

      {/* Main Two-Column Container */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <aside>
            <ProfileSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

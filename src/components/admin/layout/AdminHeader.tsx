"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu } from "lucide-react";
import MayaLogo from "@/components/MayaLogo";
import { adminApi } from "@/lib/admin/api";

interface AdminHeaderProps {
  email: string;
  onToggleSidebar: () => void;
}

export function AdminHeader({ email, onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await adminApi.logout();
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/admin" aria-label="Admin dashboard">
            <MayaLogo size="sm" priority />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/products"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
          >
            View storefront
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <div className="hidden sm:block text-xs text-slate-500 max-w-[180px] truncate">{email}</div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg disabled:opacity-60"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}

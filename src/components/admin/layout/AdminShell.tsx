"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import type { AdminUser } from "@/lib/admin/types";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    adminApi
      .me()
      .then((data) => {
        if (!isCancelled) {
          setAdmin(data.admin);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isCancelled) return;
        // Intercept 401 unauthorized or session check failure and redirect to login
        const targetNext =
          pathname && pathname !== "/admin/login"
            ? `?next=${encodeURIComponent(pathname)}`
            : "";

        router.replace(`/admin/login${targetNext}`);
      });

    return () => {
      isCancelled = true;
    };
  }, [pathname, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading || !admin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-500 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Checking admin session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <AdminHeader
        email={admin.email}
        onToggleSidebar={() => setMobileOpen((open) => !open)}
      />
      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

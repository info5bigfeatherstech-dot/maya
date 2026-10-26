"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import type { AdminUser } from "@/lib/admin/types";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    adminApi
      .me()
      .then((data) => {
        if (!cancelled) {
          setAdmin(data.admin);
          setReady(true);
        }
      })
      .catch((error) => {
        if (cancelled) return;
        if (error instanceof AdminApiError && (error.status === 401 || error.status === 0)) {
          const next = pathname && pathname !== "/admin/login" ? `?next=${encodeURIComponent(pathname)}` : "";
          router.replace(`/admin/login${next}`);
          return;
        }
        router.replace("/admin/login");
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!ready || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-500 text-sm">
        Checking admin session...
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

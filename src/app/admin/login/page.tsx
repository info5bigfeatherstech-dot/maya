import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { LoginForm } from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Maya Exports",
  description: "Sign in to access the Maya Exports administration portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-500 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading login...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

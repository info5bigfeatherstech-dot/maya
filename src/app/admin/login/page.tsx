import React, { Suspense } from "react";
import { LoginForm } from "@/components/admin/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
          Loading login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

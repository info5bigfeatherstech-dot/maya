"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import MayaLogo from "@/components/MayaLogo";

function safeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/admin") || raw.startsWith("//")) {
    return "/admin";
  }
  return raw;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    adminApi
      .me()
      .then(() => router.replace(safeNextPath(searchParams.get("next"))))
      .catch(() => undefined);
  }, [router, searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await adminApi.login(email.trim(), password);
      router.replace(safeNextPath(searchParams.get("next")));
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to log in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <MayaLogo size="sm" priority />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Admin login</h1>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to manage categories and products.
            </p>
          </div>
        </div>

        <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-slate-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-slate-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

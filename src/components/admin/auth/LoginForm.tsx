"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import MayaLogo from "@/components/MayaLogo";

/**
 * Sanitizes the 'next' query parameter to prevent open redirection attacks.
 * Only allows relative paths starting with /admin (excluding /admin/login).
 */
function getSafeRedirectUrl(raw: string | null): string {
  if (!raw || !raw.startsWith("/admin") || raw.startsWith("//") || raw === "/admin/login") {
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
  const [checkingSession, setCheckingSession] = useState(true);

  // Auto-redirect if already authenticated
  useEffect(() => {
    let isCancelled = false;

    adminApi
      .me()
      .then(() => {
        if (!isCancelled) {
          const destination = getSafeRedirectUrl(searchParams.get("next"));
          router.replace(destination);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setCheckingSession(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [router, searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your admin email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setSubmitting(true);
    try {
      await adminApi.login(trimmedEmail, password);
      const destination = getSafeRedirectUrl(searchParams.get("next"));
      router.replace(destination);
    } catch (err) {
      if (err instanceof AdminApiError) {
        setError(err.message || "Invalid email or password.");
      } else {
        setError("Unable to authenticate. Please check your credentials and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-500 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Checking admin session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <MayaLogo size="sm" priority />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Admin Portal Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign in with your admin credentials to access the portal
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{error}</div>
          </div>
        ) : null}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold text-slate-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mayaexports.com"
                required
                autoComplete="email"
                disabled={submitting}
                className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={submitting}
                className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Protected area. Authorized admin sessions only.
          </p>
        </div>
      </div>
    </div>
  );
}

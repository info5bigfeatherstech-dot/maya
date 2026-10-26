import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maya Exports Admin",
  description: "Manage catalog categories and products.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {children}
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maya Garments & Apparel — ERP Admin Portal",
  description:
    "Enterprise garment product management, tech pack specifications, factory codes, FOB pricing, and ready stock inventory control.",
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

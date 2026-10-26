import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}

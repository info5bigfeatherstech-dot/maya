"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, FolderTree, LayoutDashboard, Package, Users, X } from "lucide-react";

const catalogLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/categories", label: "Categories", icon: FolderTree, exact: false },
  { href: "/admin/products", label: "Products", icon: Package, exact: false },
];

const masterLinks = [
  { href: "/admin/factories", label: "Factories", icon: Building2, exact: false },
  { href: "/admin/customers", label: "Customers", icon: Users, exact: false },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function NavLinks({
  links,
  pathname,
}: {
  links: typeof catalogLinks;
  pathname: string;
}) {
  return (
    <>
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(`${link.href}/`);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
              active
                ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-20 bg-slate-900/30"
          aria-label="Close menu"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`${
          mobileOpen ? "flex" : "hidden"
        } lg:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0 z-30 fixed lg:static inset-y-0 left-0`}
      >
        <div className="lg:hidden flex justify-end p-3">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Catalog
          </div>
          <NavLinks links={catalogLinks} pathname={pathname} />
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2 mt-4">
            Masters
          </div>
          <NavLinks links={masterLinks} pathname={pathname} />
        </nav>
      </aside>
    </>
  );
}

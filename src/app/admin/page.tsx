"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, FolderTree, Package, Plus, Users } from "lucide-react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { flattenCategories } from "@/lib/admin/categories";
import { adminApi } from "@/lib/admin/api";

export default function AdminDashboardPage() {
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [factoryCount, setFactoryCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      adminApi.listCategories(),
      adminApi.listProducts({ includeInactive: true }),
      adminApi.listFactories(),
      adminApi.listCustomers(),
    ])
      .then(([categories, products, factories, customers]) => {
        if (cancelled) return;
        setCategoryCount(flattenCategories(categories).length);
        setProductCount(products.length);
        setFactoryCount(factories.length);
        setCustomerCount(customers.length);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load dashboard");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Catalog dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create a category first, add subcategories if needed, then add products with up to 5 images.
          </p>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</span>
              <FolderTree className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{categoryCount}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Products</span>
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{productCount}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Factories</span>
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{factoryCount}</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customers</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{customerCount}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Manage categories
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
          >
            Add product
          </Link>
          <Link
            href="/admin/factories"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
          >
            Factories
          </Link>
          <Link
            href="/admin/customers"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
          >
            Customers
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}

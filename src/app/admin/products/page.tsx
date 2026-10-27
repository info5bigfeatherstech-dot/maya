"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { flattenCategories } from "@/lib/admin/categories";
import { adminApi } from "@/lib/admin/api";
import type { Category, Product } from "@/lib/admin/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (nextCategory: string, nextSearch: string) => {
    const [productRows, categoryRows] = await Promise.all([
      adminApi.listProducts({
        category: nextCategory !== "all" ? nextCategory : undefined,
        search: nextSearch.trim() || undefined,
        includeInactive: true,
      }),
      adminApi.listCategories(),
    ]);
    setProducts(productRows);
    setCategories(categoryRows);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true);
      load(category, search)
        .catch((err) => setError(err instanceof Error ? err.message : "Unable to load products"))
        .finally(() => setLoading(false));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [category, search, load]);

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete product "${product.productCode}"?`)) return;
    try {
      await adminApi.deleteProduct(product.id);
      await load(category, search);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete product");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
            <p className="text-sm text-slate-500 mt-1">
              Public catalog uses website category. Inactive products stay admin-only. Expand a row to see variants.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products/import"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
            >
              <Upload className="w-3.5 h-3.5" />
              Bulk import
            </Link>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              Add product
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search product code, name or title"
            className="h-9 w-full sm:w-64 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All categories</option>
            {flattenCategories(categories).map((item) => (
              <option key={item.id} value={item.id}>
                {item.path || item.name}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
        ) : null}

        {loading ? (
          <div className="text-sm text-slate-500">Loading products...</div>
        ) : (
          <ProductTable products={products} onDelete={(product) => void handleDelete(product)} />
        )}
      </div>
    </AdminShell>
  );
}

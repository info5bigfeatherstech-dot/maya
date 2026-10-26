"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminBackLink } from "@/components/admin/layout/AdminBackLink";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { ProductForm } from "@/components/admin/products/ProductForm";
import type { ImageDraft } from "@/components/admin/products/ImageUploader";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import { buildProductFormData } from "@/lib/admin/productFormData";
import type { Category, ProductFormValues } from "@/lib/admin/types";

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    adminApi
      .listCategories()
      .then(setCategories)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load categories"))
      .finally(() => setReady(true));
  }, []);

  const handleSubmit = async (values: ProductFormValues, images: ImageDraft[]) => {
    setSubmitting(true);
    setError("");
    const form = buildProductFormData(values, images, "create");

    try {
      await adminApi.createProduct(form);
      router.replace("/admin/products");
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to create product");
      setSubmitting(false);
    }
  };

  return (
    <AdminShell>
      <div className="max-w-6xl space-y-5">
        <div className="space-y-3">
          <AdminBackLink href="/admin/products" label="Back to products" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Create product</h1>
            <p className="text-sm text-slate-500 mt-1">
              Website category controls the public menu. ERP fields are optional and stay off the public cards.
            </p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          {ready ? (
            <ProductForm
              categories={categories}
              submitting={submitting}
              error={error}
              onSubmit={handleSubmit}
            />
          ) : (
            <p className="text-sm text-slate-500">Loading form...</p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

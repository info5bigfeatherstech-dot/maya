"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminBackLink } from "@/components/admin/layout/AdminBackLink";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { ProductForm } from "@/components/admin/products/ProductForm";
import type { ImageDraft } from "@/components/admin/products/ImageUploader";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import { buildProductFormData } from "@/lib/admin/productFormData";
import type { Category, Product, ProductFormValues } from "@/lib/admin/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    Promise.all([adminApi.getProduct(params.id), adminApi.listCategories()])
      .then(([nextProduct, nextCategories]) => {
        setProduct(nextProduct);
        setCategories(nextCategories);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load product"))
      .finally(() => setReady(true));
  }, [params.id]);

  const handleSubmit = async (values: ProductFormValues, images: ImageDraft[]) => {
    if (!params.id) return;
    setSubmitting(true);
    setError("");
    const form = buildProductFormData(values, images, "update");

    try {
      await adminApi.updateProduct(params.id, form);
      router.replace("/admin/products");
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Unable to update product");
      setSubmitting(false);
    }
  };

  return (
    <AdminShell>
      <div className="max-w-6xl space-y-5">
        <div className="space-y-3">
          <AdminBackLink href="/admin/products" label="Back to products" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Edit product</h1>
            <p className="text-sm text-slate-500 mt-1">
              Update catalog details, ERP fields, variants, and images (max 5).
            </p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          {!ready ? (
            <p className="text-sm text-slate-500">Loading product...</p>
          ) : product ? (
            <ProductForm
              categories={categories}
              initial={product}
              submitting={submitting}
              error={error}
              onSubmit={handleSubmit}
            />
          ) : (
            <p className="text-sm text-red-600">{error || "Product not found"}</p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

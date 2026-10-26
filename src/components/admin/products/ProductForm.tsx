"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ImageUploader, type ImageDraft } from "./ImageUploader";
import { InfoSectionsFields } from "./InfoSectionsFields";
import { ErpFields } from "./ErpFields";
import { flattenCategories } from "@/lib/admin/categories";
import { adminApi } from "@/lib/admin/api";
import { productToErpForm, validateErpForm } from "@/lib/admin/erp";
import type { Category, Customer, Factory, Product, ProductAttribute, ProductFormValues } from "@/lib/admin/types";
import { compactInfoSections, mergeInfoSections } from "@/lib/catalog/infoSections";
import { Plus, Trash2 } from "lucide-react";

const DEFAULT_LISTING_ATTRIBUTES: ProductAttribute[] = [
  { key: "Production Time", value: "" },
  { key: "Sample Turnaround", value: "" },
];

function listingAttributes(existing?: ProductAttribute[]): ProductAttribute[] {
  const current = (existing || []).map((item) => ({ key: item.key, value: item.value }));
  const seen = new Set(current.map((item) => item.key.trim().toLowerCase()));
  const missing = DEFAULT_LISTING_ATTRIBUTES.filter((item) => !seen.has(item.key.toLowerCase()));
  const merged = [...missing, ...current];
  return merged.length ? merged : [{ key: "", value: "" }];
}

interface ProductFormProps {
  categories: Category[];
  initial?: Product | null;
  submitting: boolean;
  error?: string;
  onSubmit: (values: ProductFormValues, images: ImageDraft[]) => Promise<void>;
}

export function ProductForm({
  categories,
  initial,
  submitting,
  error,
  onSubmit,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>({
    productCode: initial?.productCode || "",
    name: initial?.name || "",
    title: initial?.title || "",
    description: initial?.description || "",
    category: initial?.category.id || "",
    attributes: listingAttributes(initial?.attributes),
    infoSections: mergeInfoSections(initial?.infoSections),
    erp: productToErpForm(initial),
  });
  const [images, setImages] = useState<ImageDraft[]>(
    (initial?.images || []).map((url) => ({ kind: "existing" as const, url }))
  );
  const [factories, setFactories] = useState<Factory[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([adminApi.listFactories(), adminApi.listCustomers()])
      .then(([nextFactories, nextCustomers]) => {
        if (cancelled) return;
        setFactories(nextFactories);
        setCustomers(nextCustomers);
      })
      .catch(() => {
        /* Product can still be saved without factory/customer assignment. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setField = (field: Exclude<keyof ProductFormValues, "attributes" | "infoSections" | "erp">, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.category) {
      setLocalError("Create and select a category first");
      return;
    }
    if (images.length > 5) {
      setLocalError("A product can have a maximum of 5 images");
      return;
    }
    const attributes = values.attributes
      .map((item) => ({ key: item.key.trim(), value: item.value.trim() }))
      .filter((item) => item.key && item.value);
    const erpError = validateErpForm(values.erp);
    if (erpError) {
      setLocalError(erpError);
      return;
    }
    setLocalError("");
    await onSubmit({ ...values, attributes, infoSections: compactInfoSections(values.infoSections) }, images);
  };

  const setAttribute = (index: number, field: keyof ProductAttribute, value: string) => {
    setValues((current) => ({
      ...current,
      attributes: current.attributes.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-sm text-slate-600 space-y-3">
        <p>Create a category first, then add products inside that category or subcategory.</p>
        <Link
          href="/admin/categories"
          className="inline-flex px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Go to categories
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-slate-600">Product code</span>
          <input
            value={values.productCode}
            onChange={(event) => setField("productCode", event.target.value)}
            required
            maxLength={60}
            className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="MG-25725-01"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-slate-600">Category</span>
          <select
            value={values.category}
            onChange={(event) => setField("category", event.target.value)}
            required
            className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select category</option>
            {flattenCategories(categories).map((category) => (
              <option key={category.id} value={category.id} disabled={category.childCount > 0}>
                {category.path || category.name}
                {category.childCount > 0 ? " (open a subcategory)" : ""}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-slate-500">
            Pick the exact menu item, for example Garments / Men / Men's Jackets.
          </span>
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-slate-600">Name</span>
          <input
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            required
            maxLength={120}
            className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Varsity Baseball Jacket"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-slate-600">Title</span>
          <input
            value={values.title}
            onChange={(event) => setField("title", event.target.value)}
            required
            maxLength={160}
            className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Premium leather varsity jacket"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold text-slate-600">Description</span>
        <textarea
          value={values.description}
          onChange={(event) => setField("description", event.target.value)}
          required
          maxLength={4000}
          rows={5}
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Short description for the product page. Optional: put each manufacturing spec on its own extra line."
        />
        <span className="text-[11px] text-slate-500">
          First line is the public description. Extra lines become Manufacturing & Design Specifications on the
          product page.
        </span>
      </label>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">Website listing details</span>
          <button
            type="button"
            onClick={() =>
              setValues((current) => ({
                ...current,
                attributes: [...current.attributes, { key: "", value: "" }],
              }))
            }
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-3.5 h-3.5" />
            Add attribute
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          These show on the public product page after listing, same as the original catalog cards. Production
          Time and Sample Turnaround fill the three metric boxes. MOQ, fabric, sizes, colors, and FOB port also
          come from the product master below. Factory prices stay admin-only.
        </p>
        <div className="space-y-2">
          {values.attributes.map((item, index) => (
            <div key={`attr-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                value={item.key}
                onChange={(event) => setAttribute(index, "key", event.target.value)}
                placeholder={index === 0 ? "Production Time" : index === 1 ? "Sample Turnaround" : "Key"}
                className="h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <input
                value={item.value}
                onChange={(event) => setAttribute(index, "value", event.target.value)}
                placeholder={index === 0 ? "35-45 days" : index === 1 ? "7-10 Days" : "Value"}
                className="h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    attributes:
                      current.attributes.length > 1
                        ? current.attributes.filter((_, currentIndex) => currentIndex !== index)
                        : [{ key: "", value: "" }],
                  }))
                }
                className="h-10 w-10 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center"
                aria-label="Remove attribute"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <ErpFields
        productCode={values.productCode}
        values={values.erp}
        factories={factories}
        customers={customers}
        onChange={(erp) => setValues((current) => ({ ...current, erp }))}
      />

      <InfoSectionsFields
        sections={values.infoSections}
        onChange={(infoSections) => setValues((current) => ({ ...current, infoSections }))}
      />

      <ImageUploader images={images} onChange={setImages} />

      {localError || error ? (
        <p className="text-sm text-red-600">{localError || error}</p>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        <Link
          href="/admin/products"
          className="px-3 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60"
        >
          {submitting ? "Saving..." : initial ? "Update product" : "Create product"}
        </button>
      </div>
    </form>
  );
}

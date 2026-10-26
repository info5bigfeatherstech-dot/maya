"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatAdminDateParts } from "@/lib/admin/dates";
import type { Product } from "@/lib/admin/types";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

function DateCell({ value }: { value?: string }) {
  const parts = formatAdminDateParts(value);
  if (!parts) return <span className="text-slate-400">—</span>;
  return (
    <div className="leading-tight whitespace-nowrap">
      <div className="text-[13px] text-slate-700 tabular-nums">{parts.date}</div>
      <div className="text-[11px] text-slate-400 tabular-nums">{parts.time}</div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const inactive = status === "Inactive";
  return (
    <span
      className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full ${
        inactive ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {inactive ? "Inactive" : "Active"}
    </span>
  );
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
        No products found. Create a category first, then add a product.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[1280px]">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-3 font-semibold w-8" />
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Product code</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Type / Gender</th>
              <th className="px-4 py-3 font-semibold">Factory</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const open = openId === product.id;
              const variants = product.variant === "Yes" ? product.variantDetails || [] : [];
              return (
                <React.Fragment key={product.id}>
                  <tr className="hover:bg-slate-50/70">
                    <td className="px-3 py-3">
                      {variants.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : product.id)}
                          className="p-1 text-slate-500 hover:bg-slate-100 rounded"
                          aria-label={open ? "Hide variants" : "Show variants"}
                        >
                          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                          {product.images[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-100" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{product.title}</div>
                          {variants.length > 0 ? (
                            <div className="text-[11px] text-blue-700 mt-0.5">{variants.length} variants</div>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="font-mono">{product.productCode}</div>
                      <div className="text-xs text-slate-400 font-mono">{product.sku || `${product.productCode}-1`}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {product.category.path || product.category.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{product.productType || "—"}</div>
                      <div className="text-xs text-slate-400">
                        {[product.gender, product.ageGroup].filter(Boolean).join(" / ") || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {product.factory ? (
                        <>
                          <div>{product.factory.name}</div>
                          <div className="text-xs text-slate-400">{product.factory.code}</div>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {(() => {
                        const links =
                          product.customers?.length
                            ? product.customers
                            : product.customer
                              ? [
                                  {
                                    ...product.customer,
                                    styleCode: product.customerStyleCode || "",
                                  },
                                ]
                              : [];
                        if (!links.length) return "—";
                        return (
                          <div className="space-y-1">
                            {links.slice(0, 3).map((item) => (
                              <div key={item.id}>
                                <div>{item.name}</div>
                                <div className="text-xs text-slate-400">{item.styleCode || item.code}</div>
                              </div>
                            ))}
                            {links.length > 3 ? (
                              <div className="text-[11px] text-slate-400">+{links.length - 3} more</div>
                            ) : null}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.productStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <DateCell value={product.createdAt} />
                    </td>
                    <td className="px-4 py-3">
                      <DateCell value={product.updatedAt} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDelete(product)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {open ? (
                    <tr className="bg-slate-50/80">
                      <td colSpan={11} className="px-6 py-3">
                        <table className="w-full text-xs">
                          <thead className="text-slate-500 uppercase">
                            <tr>
                              <th className="text-left py-1.5">Product code</th>
                              <th className="text-left py-1.5">Title</th>
                              <th className="text-left py-1.5">Fields</th>
                              <th className="text-right py-1.5">Images</th>
                              <th className="text-right py-1.5">Stock</th>
                              <th className="text-right py-1.5">Price adj.</th>
                              <th className="text-left py-1.5">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-slate-200">
                              <td className="py-1.5 font-mono">{product.sku || `${product.productCode}-1`}</td>
                              <td className="py-1.5">{product.title || "Primary"}</td>
                              <td className="py-1.5">Primary variant</td>
                              <td className="py-1.5 text-right">{product.images?.length ?? 0}</td>
                              <td className="py-1.5 text-right">—</td>
                              <td className="py-1.5 text-right">—</td>
                              <td className="py-1.5">Primary</td>
                            </tr>
                            {variants.map((row, index) => (
                              <tr key={`${row.sku}-${index}`} className="border-t border-slate-200">
                                <td className="py-1.5 font-mono">{row.sku}</td>
                                <td className="py-1.5">{row.title || "—"}</td>
                                <td className="py-1.5">
                                  {[
                                    row.color ? `Color: ${row.color}` : "",
                                    row.size ? `Size: ${row.size}` : "",
                                    ...(row.attributes || [])
                                      .filter((item) => item.key && item.value)
                                      .map((item) => `${item.key}: ${item.value}`),
                                  ]
                                    .filter(Boolean)
                                    .join(" · ") || "—"}
                                </td>
                                <td className="py-1.5 text-right">{row.images?.length ?? 0}</td>
                                <td className="py-1.5 text-right">{row.stockQty ?? 0}</td>
                                <td className="py-1.5 text-right">{row.priceAdjustment ?? 0}</td>
                                <td className="py-1.5">{row.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

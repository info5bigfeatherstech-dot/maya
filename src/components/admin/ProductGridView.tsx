"use client";

import React from "react";
import { AdminProduct } from "@/types/adminProduct";
import {
  Eye,
  Edit2,
  Trash2,
  Copy,
  Sparkles,
  ShoppingBag,
  Layers,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ProductGridViewProps {
  products: AdminProduct[];
  onView: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
  onDuplicate: (product: AdminProduct) => void;
  onDelete: (id: string) => void;
}

export function ProductGridView({
  products,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductGridViewProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
        <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-300" />
        No products found matching criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => {
        const hasReadyStock =
          p.readyStockAvailability === "Yes" &&
          parseInt(p.readyStockQuantity.replace(/[^0-9]/g, "")) > 0;

        return (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition duration-200 flex flex-col overflow-hidden group"
          >
            {/* Card Image Area */}
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              {p.productImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.productImage}
                  alt={p.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                  <ShoppingBag className="w-8 h-8 mb-1 stroke-1" />
                  No Image
                </div>
              )}

              {/* Badges on Image */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white/95 text-blue-700 shadow-xs backdrop-blur-xs">
                  {p.productCode}
                </span>
                {p.featuredProduct === "Yes" && (
                  <span className="p-1 rounded-md bg-amber-500 text-white shadow-xs" title="Featured">
                    <Sparkles className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="absolute top-2.5 right-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium shadow-xs backdrop-blur-xs ${
                    p.productStatus === "Active"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-slate-700/80 text-white"
                  }`}
                >
                  {p.productStatus}
                </span>
              </div>

              {/* Ready Stock Ribbon */}
              {hasReadyStock && (
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-medium backdrop-blur-xs flex items-center justify-between">
                  <span>Ready Stock</span>
                  <span className="font-bold">
                    {p.readyStockQuantity} {p.readyStockQuantityUnit || p.quantityUnit}
                  </span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                  <span>{p.category} &bull; {p.subcategory}</span>
                  <span className="font-mono text-slate-600">SKU: {p.sku}</span>
                </div>

                <h3
                  onClick={() => onView(p)}
                  className="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer line-clamp-1"
                  title={p.productName}
                >
                  {p.productName}
                </h3>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {p.fabricComposition || p.fabric} &bull; {p.pattern} &bull; {p.color}
                </p>

                {/* Sourcing / Buyer Tag */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-600 flex items-center gap-1 truncate max-w-[140px]">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{p.factoryName}</span>
                  </div>
                  <div className="font-mono text-blue-700 font-semibold">
                    {p.factoryCode}
                  </div>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-600 font-medium">Sale Price</div>
                  <div className="text-base font-bold text-slate-900">
                    {p.salePrice || "—"}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onView(p)}
                    type="button"
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="View Tech Pack"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(p)}
                    type="button"
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Product"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicate(p)}
                    type="button"
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    type="button"
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { AdminProduct } from "@/types/adminProduct";
import {
  Eye,
  Edit2,
  Trash2,
  Copy,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/admin-dropdown-menu";

interface ProductTableProps {
  products: AdminProduct[];
  onView: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
  onDuplicate: (product: AdminProduct) => void;
  onDelete: (id: string) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
}

export function ProductTable({
  products,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
  selectedIds,
  onToggleSelect,
  onSelectAll,
}: ProductTableProps) {
  const isAllSelected =
    products.length > 0 && selectedIds.length === products.length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="py-3 px-3">Garment Style</th>
              <th className="py-3 px-3">Product / SKU</th>
              <th className="py-3 px-3">Category & Fabric</th>
              <th className="py-3 px-3">Factory & Port</th>
              <th className="py-3 px-3">Customer (Buyer)</th>
              <th className="py-3 px-3">FOB / Sale Price</th>
              <th className="py-3 px-3">Ready Stock</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No products found matching your current filter criteria.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const isChecked = selectedIds.includes(p.id);
                const hasReadyStock =
                  p.readyStockAvailability === "Yes" &&
                  parseInt(p.readyStockQuantity.replace(/[^0-9]/g, "")) > 0;

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-blue-50/30 transition group ${
                      isChecked ? "bg-blue-50/50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSelect(p.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* Image & Style Code */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => onView(p)}
                          className="w-11 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer relative group-hover:shadow-xs transition"
                        >
                          {p.productImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.productImage}
                              alt={p.productName}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
                              N/A
                            </div>
                          )}
                          {p.featuredProduct === "Yes" && (
                            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              onClick={() => onView(p)}
                              className="font-mono font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                            >
                              {p.productCode}
                            </span>
                            {p.variant === "Yes" && (
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                                {p.variantDetails?.length || "Var"}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-600 font-mono block">
                            Pur: {p.purchaseCode}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Product Name & SKU */}
                    <td className="py-3 px-3 max-w-[200px]">
                      <div
                        onClick={() => onView(p)}
                        className="font-semibold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                        title={p.productName}
                      >
                        {p.productName}
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                        SKU: <span className="text-slate-700">{p.sku}</span>
                      </div>
                    </td>

                    {/* Category & Fabric */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">
                        {p.category} &bull;{" "}
                        <span className="text-slate-600">{p.subcategory}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate max-w-[150px]">
                        {p.fabricComposition || p.fabric} {p.gsm && `(${p.gsm} GSM)`}
                      </div>
                    </td>

                    {/* Factory & Port */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <span className="text-blue-600 font-mono text-[11px]">
                          {p.factoryCode}
                        </span>
                        <span className="truncate max-w-[120px]">{p.factoryName}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Port: {p.fobPort} &bull; MOQ: {p.moq}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-900 truncate max-w-[130px]">
                        {p.customerName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-600">
                        Style: {p.customerStyleCode}
                      </div>
                    </td>

                    {/* Prices */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">
                        {p.salePrice || "—"}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        FOB: {p.fobPrice || "—"} &bull; EXW: {p.factoryPriceEXW || "—"}
                      </div>
                    </td>

                    {/* Ready Stock */}
                    <td className="py-3 px-3">
                      {hasReadyStock ? (
                        <div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {p.readyStockQuantity} {p.readyStockQuantityUnit || p.quantityUnit}
                          </span>
                          <span className="block text-[10px] text-slate-600 mt-0.5">
                            Available Now
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-600 text-[11px]">
                          Made to Order
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          p.productStatus === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {p.productStatus === "Active" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-slate-400" />
                        )}
                        {p.productStatus}
                      </span>
                    </td>

                    {/* Actions with Shadcn DropdownMenu & quick buttons */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onView(p)}
                          type="button"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                          title="View Spec Sheet"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEdit(p)}
                          type="button"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Shadcn DropdownMenu for extended actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition outline-none">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel>Style Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onView(p)} className="cursor-pointer gap-2">
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>View Tech Spec</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(p)} className="cursor-pointer gap-2">
                              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                              <span>Edit Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDuplicate(p)} className="cursor-pointer gap-2">
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Duplicate Style</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onDelete(p.id)}
                              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Product</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

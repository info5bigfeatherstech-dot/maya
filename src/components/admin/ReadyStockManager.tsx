"use client";

import React, { useState } from "react";
import { AdminProduct } from "@/types/adminProduct";
import {
  Package,
  Plus,
  Minus,
  Check,
  Search,
  ArrowUpDown,
  Download,
  AlertTriangle,
} from "lucide-react";

interface ReadyStockManagerProps {
  products: AdminProduct[];
  onUpdateStock: (id: string, newQty: string, availability: "Yes" | "No") => void;
  onViewProduct: (product: AdminProduct) => void;
}

export function ReadyStockManager({
  products,
  onUpdateStock,
  onViewProduct,
}: ReadyStockManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailability, setFilterAvailability] = useState<"All" | "Yes" | "No">("All");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchAvail =
      filterAvailability === "All" || p.readyStockAvailability === filterAvailability;

    return matchSearch && matchAvail;
  });

  // Calculate totals
  const totalUnits = products
    .filter((p) => p.readyStockAvailability === "Yes")
    .reduce((acc, p) => acc + (parseInt(p.readyStockQuantity.replace(/[^0-9]/g, "")) || 0), 0);

  const readyStylesCount = products.filter(
    (p) => p.readyStockAvailability === "Yes"
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Stat Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Ready Stock Units
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">
            {totalUnits.toLocaleString()} Pcs
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Ready for instant dispatch & export clearance
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Ready Styles
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-1">
            {readyStylesCount} Styles
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Out of {products.length} total registered catalog styles
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average MOQ Threshold
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            500 Pcs
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Standard export shipping package unit
          </p>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ready stock by Style, Code or SKU..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filter:</span>
          <select
            value={filterAvailability}
            onChange={(e) =>
              setFilterAvailability(e.target.value as "All" | "Yes" | "No")
            }
            className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700"
          >
            <option value="All">All Items</option>
            <option value="Yes">Ready Stock Only (Yes)</option>
            <option value="No">Made-to-Order Only (No)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Style & Code</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Factory & Port</th>
                <th className="py-3 px-4 text-center">Ready Status</th>
                <th className="py-3 px-4 text-center">Available Stock Qty</th>
                <th className="py-3 px-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((p) => {
                const currentQty =
                  parseInt(p.readyStockQuantity.replace(/[^0-9]/g, "")) || 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-blue-700">
                        {p.productCode}
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono">
                        {p.sku}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div
                        onClick={() => onViewProduct(p)}
                        className="font-semibold text-slate-900 hover:text-blue-600 cursor-pointer"
                      >
                        {p.productName}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {p.category} &bull; {p.fabric}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">
                        {p.factoryName}
                      </div>
                      <div className="text-[11px] text-slate-600 font-mono">
                        {p.factoryCode} &bull; Port: {p.fobPort}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStock(
                            p.id,
                            p.readyStockQuantity,
                            p.readyStockAvailability === "Yes" ? "No" : "Yes"
                          )
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          p.readyStockAvailability === "Yes"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {p.readyStockAvailability === "Yes" ? "Ready (Yes)" : "Made to Order (No)"}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <input
                          type="number"
                          value={currentQty}
                          onChange={(e) =>
                            onUpdateStock(
                              p.id,
                              e.target.value,
                              parseInt(e.target.value) > 0 ? "Yes" : "No"
                            )
                          }
                          className="w-24 text-center px-2 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-xs text-slate-600 font-medium">
                          {p.readyStockQuantityUnit || p.quantityUnit}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const newQty = Math.max(0, currentQty - 100);
                            onUpdateStock(
                              p.id,
                              String(newQty),
                              newQty > 0 ? "Yes" : "No"
                            )
                          }}
                          className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                          title="Reduce 100 pcs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newQty = currentQty + 100;
                            onUpdateStock(p.id, String(newQty), "Yes");
                          }}
                          className="p-1.5 text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-md transition"
                          title="Add 100 pcs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

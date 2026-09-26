"use client";

import React from "react";
import { AdminProduct } from "@/types/adminProduct";
import {
  X,
  Printer,
  Calendar,
  Layers,
  DollarSign,
  Building2,
  User,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Tag,
  Ship,
  Sparkles,
} from "lucide-react";

interface ProductDetailModalProps {
  product: AdminProduct | null;
  onClose: () => void;
  onEdit: (product: AdminProduct) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onEdit,
}: ProductDetailModalProps) {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  // Calculate gross margin % if prices exist
  const saleNum = parseFloat(product.salePrice.replace(/[^0-9.]/g, "")) || 0;
  const fobNum = parseFloat(product.fobPrice.replace(/[^0-9.]/g, "")) || 0;
  const marginPct =
    saleNum > 0 && fobNum > 0
      ? (((saleNum - fobNum) / saleNum) * 100).toFixed(1)
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              {product.productCode}
            </span>
            <span className="text-slate-400 font-mono text-sm">/</span>
            <span className="font-mono text-xs text-slate-500">
              SKU: {product.sku}
            </span>
            {product.featuredProduct === "Yes" && (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-500" /> Featured
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              title="Print Tech Pack"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Print Spec
            </button>
            <button
              onClick={() => onEdit(product)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-xs"
            >
              Edit Product
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Main Hero Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Preview */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2 text-center">
              <div className="aspect-3/4 rounded-lg overflow-hidden bg-slate-100 relative flex items-center justify-center border border-slate-100">
                {product.productImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 text-xs flex flex-col items-center">
                    <ShoppingBag className="w-10 h-10 mb-2 stroke-1" />
                    No image provided
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.productStatus === "Active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {product.productStatus === "Active" ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <XCircle className="w-3 h-3 text-slate-400" />
                  )}
                  {product.productStatus}
                </span>
                <span className="text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                  {product.productType}
                </span>
              </div>
            </div>

            {/* Title & Key Highlights */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-blue-600 mb-1">
                  {product.category} &bull; {product.subcategory} &bull; {product.gender} ({product.ageGroup})
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {product.productName}
                </h2>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  {product.description || "No description provided."}
                </p>
              </div>

              {/* Price & Commercial Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                  <div className="text-xs text-blue-700 font-medium">Sale Price</div>
                  <div className="text-lg font-bold text-slate-900">{product.salePrice || "—"}</div>
                  <div className="text-[11px] text-slate-600">Per {product.quantityUnit}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-600 font-medium">FOB Price</div>
                  <div className="text-lg font-bold text-slate-800">{product.fobPrice || "—"}</div>
                  <div className="text-[11px] text-slate-600">Port: {product.fobPort || "—"}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-600 font-medium">Factory EXW</div>
                  <div className="text-lg font-bold text-slate-800">{product.factoryPriceEXW || "—"}</div>
                  <div className="text-[11px] text-slate-600">{product.factoryCode}</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <div className="text-xs text-emerald-700 font-medium">Gross Margin</div>
                  <div className="text-lg font-bold text-emerald-800">
                    {marginPct ? `${marginPct}%` : "—"}
                  </div>
                  <div className="text-[11px] text-emerald-600">MOQ: {product.moq} {product.quantityUnit}</div>
                </div>
              </div>

              {/* Ready Stock Highlight */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${product.readyStockAvailability === "Yes" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                  <div>
                    <div className="text-xs text-slate-600 uppercase font-bold tracking-wider">
                      Ready Stock Status
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {product.readyStockAvailability === "Yes" ? "Immediate Shipment Available" : "Made to Order Only"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-600 font-medium">Available Inventory</div>
                  <div className="text-base font-bold text-blue-600">
                    {product.readyStockQuantity || "0"} {product.readyStockQuantityUnit || product.quantityUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Structured Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Box 1: Fabric & Textile Specifications */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-slate-800 font-semibold text-sm">
                <Layers className="w-4 h-4 text-blue-600" />
                Fabric & Textile Specifications
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <div>
                  <dt className="text-slate-600">Fabric Type</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.fabric || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Fabric Composition</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.fabricComposition || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Weight (GSM)</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.gsm ? `${product.gsm} GSM` : "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Pattern</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.pattern || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Base Color</dt>
                  <dd className="font-medium text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-slate-300 inline-block" />
                    {product.color || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-600">Size Range</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.sizeRange || "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-600 mb-1">Available Colors</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {product.availableColors && product.availableColors.length > 0 ? (
                      product.availableColors.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {c}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600 font-medium">None specified</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Box 2: Sourcing, Factory & Buyer Details */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-slate-800 font-semibold text-sm">
                <Building2 className="w-4 h-4 text-blue-600" />
                Factory Sourcing & Buyer Info
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <div>
                  <dt className="text-slate-600">Factory Code</dt>
                  <dd className="font-mono font-semibold text-blue-700 mt-0.5">
                    {product.factoryCode}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-600">Factory Name</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.factoryName || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Customer Name</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{product.customerName || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">Customer Style Code</dt>
                  <dd className="font-mono font-semibold text-slate-800 mt-0.5">
                    {product.customerStyleCode || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-600">Repeat Order</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">
                    {product.repeatOrder} {product.repeatOrder === "Yes" && `(${product.repeatOrderNumber})`}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-600">Purchase Code</dt>
                  <dd className="font-mono text-slate-700 mt-0.5">{product.purchaseCode || "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-600 mb-1">Target Markets</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {product.marketSuitability && product.marketSuitability.length > 0 ? (
                      product.marketSuitability.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {m}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600">Global</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Timeline & Season Schedule */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 text-slate-800 font-semibold text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              Calendar & Timeline Schedule
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-600 block">Season / Collection</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {product.season} &bull; {product.collection}
                </span>
              </div>
              <div>
                <span className="text-slate-600 block">Development Date</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {product.developmentDate.month} {product.developmentDate.year}
                </span>
              </div>
              <div>
                <span className="text-slate-600 block">Shipment Date</span>
                <span className="font-semibold text-blue-700 text-sm mt-0.5 block">
                  {product.shipmentDate.month} {product.shipmentDate.year}
                </span>
              </div>
              <div>
                <span className="text-slate-600 block">Created / Record Date</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {product.createdAtDate.month} {product.createdAtDate.year}
                </span>
              </div>
            </div>
            {product.updatedAtDate && (
              <div className="mt-3 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-600">Last Update Note: </span>
                {product.updatedAtDate}
              </div>
            )}
          </div>

          {/* Variant Matrix Table */}
          {product.variant === "Yes" && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                  <Tag className="w-4 h-4 text-blue-600" />
                  Product Variant Matrix (Color &times; Size SKUs)
                </div>
                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  {product.variantDetails?.length || 0} Generated Variants
                </span>
              </div>

              {product.variantDetails && product.variantDetails.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Variant SKU</th>
                        <th className="py-2.5 px-3">Color</th>
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Barcode</th>
                        <th className="py-2.5 px-3 text-right">Stock Qty</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {product.variantDetails.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-mono text-slate-900 font-medium">
                            {v.sku}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{v.color}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                              {v.size}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">{v.barcode || "—"}</td>
                          <td className="py-2.5 px-3 text-right font-medium text-slate-900">
                            {v.stockQty}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                              {v.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-xs text-slate-600 py-3">
                  Variant enabled, but no specific matrix combinations configured.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Maya Vertical ERP &bull; Tech Spec Documentation &bull; Record ID: {product.id}
          </div>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
}

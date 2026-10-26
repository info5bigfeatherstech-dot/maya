"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import {
  AGE_GROUPS,
  COLLECTION_PRESETS,
  GARMENT_CATEGORIES,
  GENDERS,
  MARKETS,
  MAX_VARIANTS,
  MONTHS,
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  QUANTITY_UNITS,
  REPEAT_NUMBERS,
  SEASON_PRESETS,
  SIZE_PRESETS,
  VARIANT_STATUSES,
  buildVariantSku,
  generateVariantMatrix,
  parseColors,
  yearOptions,
} from "@/lib/admin/erp";
import type { Customer, ErpFormValues, Factory, ProductVariant } from "@/lib/admin/types";

const YEAR_OPTIONS = yearOptions();
const inputClass =
  "w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "block space-y-1.5";
const labelText = "text-xs font-semibold text-slate-600";

interface ErpFieldsProps {
  productCode: string;
  values: ErpFormValues;
  factories: Factory[];
  customers: Customer[];
  onChange: (values: ErpFormValues) => void;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={labelClass}>
      <span className={labelText}>{label}</span>
      {children}
      {hint ? <span className="text-[11px] text-slate-500">{hint}</span> : null}
    </label>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="text-[11px] text-slate-500 mt-1">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function ErpFields({ productCode, values, factories, customers, onChange }: ErpFieldsProps) {
  const [customMarket, setCustomMarket] = useState("");
  const set = <K extends keyof ErpFormValues>(field: K, value: ErpFormValues[K]) => {
    onChange({ ...values, [field]: value });
  };

  const activeSizeRange = values.sizeRange === "Custom" ? values.sizeRangeCustom : values.sizeRange;
  const colors = parseColors(values.availableColorsInput);
  const baseSku = values.sku.trim() || productCode.trim() || "SKU";

  const updateVariant = (index: number, patch: Partial<ProductVariant>) => {
    set(
      "variantDetails",
      values.variantDetails.map((row, current) => (current === index ? { ...row, ...patch } : row))
    );
  };

  const addVariant = () => {
    if (values.variantDetails.length >= MAX_VARIANTS) return;
    const color = values.color.trim() || colors[0] || "Default";
    const size = parseColors(activeSizeRange)[0] || "M";
    set("variantDetails", [
      ...values.variantDetails,
      {
        color,
        size,
        sku: buildVariantSku(baseSku, color, size),
        barcode: "",
        stockQty: 0,
        priceAdjustment: 0,
        status: "In Stock",
      },
    ]);
  };

  const generateMatrix = () => {
    const generated = generateVariantMatrix(baseSku, colors, activeSizeRange);
    if (generated.length === 0) return;
    set("variantDetails", generated);
  };

  const toggleMarket = (market: string) => {
    set(
      "marketSuitability",
      values.marketSuitability.includes(market)
        ? values.marketSuitability.filter((item) => item !== market)
        : [...values.marketSuitability, market].slice(0, 20)
    );
  };

  const addCustomMarket = () => {
    const next = customMarket.trim();
    if (!next || values.marketSuitability.includes(next)) return;
    set("marketSuitability", [...values.marketSuitability, next].slice(0, 20));
    setCustomMarket("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">ERP product master</h2>
        <p className="text-[11px] text-slate-500 mt-1">
          Internal inventory record. Factory prices, customer codes, SKUs, and stock stay admin-only. MOQ,
          fabric, sizes, colors, and FOB port can appear on the public product page.
        </p>
      </div>

      <Section title="1. Identification & status" description="SKU, purchase code, live status, and featured flag.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="SKU" hint="Defaults to the product code if left blank.">
            <input value={values.sku} onChange={(event) => set("sku", event.target.value)} maxLength={60} className={inputClass} placeholder={productCode || "MG-001"} />
          </Field>
          <Field label="Purchase code">
            <input value={values.purchaseCode} onChange={(event) => set("purchaseCode", event.target.value)} maxLength={60} className={inputClass} />
          </Field>
          <Field label="Product status">
            <select value={values.productStatus} onChange={(event) => set("productStatus", event.target.value as ErpFormValues["productStatus"])} className={inputClass}>
              {PRODUCT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Featured product">
            <select value={values.featuredProduct} onChange={(event) => set("featuredProduct", event.target.value as ErpFormValues["featuredProduct"])} className={inputClass}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section title="2. Classification" description="ERP classification is extra. Website category above still controls the public menu.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Product type">
            <select value={values.productType} onChange={(event) => set("productType", event.target.value)} className={inputClass}>
              <option value="">Select type</option>
              {PRODUCT_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="Custom">Custom</option>
            </select>
          </Field>
          {values.productType === "Custom" ? (
            <Field label="Custom product type">
              <input value={values.productTypeCustom} onChange={(event) => set("productTypeCustom", event.target.value)} maxLength={80} className={inputClass} />
            </Field>
          ) : null}
          <Field label="Gender">
            <select value={values.gender} onChange={(event) => set("gender", event.target.value)} className={inputClass}>
              <option value="">Select gender</option>
              {GENDERS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Age group">
            <select value={values.ageGroup} onChange={(event) => set("ageGroup", event.target.value)} className={inputClass}>
              <option value="">Select age group</option>
              {AGE_GROUPS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Garment category">
            <select value={values.garmentCategory} onChange={(event) => set("garmentCategory", event.target.value)} className={inputClass}>
              <option value="">Select garment category</option>
              {GARMENT_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subcategory">
            <input value={values.subcategory} onChange={(event) => set("subcategory", event.target.value)} maxLength={80} className={inputClass} placeholder="Maxi Dress / T-Shirt" />
          </Field>
          <Field label="Collection">
            <select value={values.collection} onChange={(event) => set("collection", event.target.value)} className={inputClass}>
              <option value="">Select collection</option>
              {COLLECTION_PRESETS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="Custom">Custom</option>
            </select>
          </Field>
          {values.collection === "Custom" ? (
            <Field label="Custom collection">
              <input value={values.collectionCustom} onChange={(event) => set("collectionCustom", event.target.value)} maxLength={80} className={inputClass} />
            </Field>
          ) : null}
          <Field label="Season">
            <select value={values.season} onChange={(event) => set("season", event.target.value)} className={inputClass}>
              <option value="">Select season</option>
              {SEASON_PRESETS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="Custom">Custom</option>
            </select>
          </Field>
          {values.season === "Custom" ? (
            <Field label="Custom season">
              <input value={values.seasonCustom} onChange={(event) => set("seasonCustom", event.target.value)} maxLength={40} className={inputClass} />
            </Field>
          ) : null}
        </div>
      </Section>

      <Section title="3. Dates" description="Development and shipment month / year.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="Development month">
            <select value={values.developmentMonth} onChange={(event) => set("developmentMonth", event.target.value)} className={inputClass}>
              <option value="">Month</option>
              {MONTHS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Development year">
            <select value={values.developmentYear} onChange={(event) => set("developmentYear", event.target.value)} className={inputClass}>
              <option value="">Year</option>
              {YEAR_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Shipment month">
            <select value={values.shipmentMonth} onChange={(event) => set("shipmentMonth", event.target.value)} className={inputClass}>
              <option value="">Month</option>
              {MONTHS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Shipment year">
            <select value={values.shipmentYear} onChange={(event) => set("shipmentYear", event.target.value)} className={inputClass}>
              <option value="">Year</option>
              {YEAR_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="4. Fabric & sizes" description="These catalog specs can show on the public product page as Fabric / Material, Available Sizing, and Stock / Lab-Dips.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Fabric">
            <input value={values.fabric} onChange={(event) => set("fabric", event.target.value)} maxLength={80} className={inputClass} placeholder="Cotton / Viscose / Linen" />
          </Field>
          <Field label="Fabric composition">
            <input value={values.fabricComposition} onChange={(event) => set("fabricComposition", event.target.value)} maxLength={120} className={inputClass} placeholder="100% Cotton" />
          </Field>
          <Field label="GSM">
            <input value={values.gsm} onChange={(event) => set("gsm", event.target.value)} maxLength={20} className={inputClass} placeholder="120" />
          </Field>
          <Field label="Pattern">
            <input value={values.pattern} onChange={(event) => set("pattern", event.target.value)} maxLength={80} className={inputClass} placeholder="Solid / Printed / Floral" />
          </Field>
          <Field label="Primary color">
            <input value={values.color} onChange={(event) => set("color", event.target.value)} maxLength={40} className={inputClass} placeholder="Blue" />
          </Field>
          <Field label="Size range">
            <select value={values.sizeRange} onChange={(event) => set("sizeRange", event.target.value)} className={inputClass}>
              <option value="">Select size range</option>
              {SIZE_PRESETS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="Custom">Custom</option>
            </select>
          </Field>
          {values.sizeRange === "Custom" ? (
            <Field label="Custom size range" hint="Comma-separated, for example 2, 4, 6, 8.">
              <input value={values.sizeRangeCustom} onChange={(event) => set("sizeRangeCustom", event.target.value)} maxLength={120} className={inputClass} />
            </Field>
          ) : null}
          <div className="md:col-span-2">
            <Field label="Available colors" hint="Comma-separated. Used to auto-generate the variant matrix.">
              <input value={values.availableColorsInput} onChange={(event) => set("availableColorsInput", event.target.value)} className={inputClass} placeholder="Blue, Pink, Green" />
            </Field>
            {colors.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {colors.map((color) => (
                  <span key={color} className="px-2 py-0.5 text-[11px] rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {color}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <Section title="5. Variants" description="One parent product, many color × size SKUs. Maximum 200 rows.">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Field label="Enable variants">
            <select value={values.variant} onChange={(event) => set("variant", event.target.value as ErpFormValues["variant"])} className={`${inputClass} w-48`}>
              <option value="No">No (single SKU)</option>
              <option value="Yes">Yes (color × size)</option>
            </select>
          </Field>
        </div>
        {values.variant === "Yes" ? (
          <div className="space-y-3">
            <p className="text-[11px] text-slate-500">
              Generate SKUs from available colors and size range, then edit stock, barcode, and price adjustment.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={generateMatrix}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Auto-generate matrix
              </button>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                Add variant
              </button>
            </div>
            {values.variantDetails.length > 0 ? (
              <div className="border border-slate-200 rounded-xl overflow-auto bg-white max-h-80">
                <table className="w-full text-left text-xs min-w-[760px]">
                  <thead className="bg-slate-50 text-slate-500 uppercase sticky top-0">
                    <tr>
                      <th className="px-3 py-2">SKU</th>
                      <th className="px-3 py-2">Color</th>
                      <th className="px-3 py-2">Size</th>
                      <th className="px-3 py-2">Barcode</th>
                      <th className="px-3 py-2">Stock</th>
                      <th className="px-3 py-2">Price adj.</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {values.variantDetails.map((row, index) => (
                      <tr key={`${row.sku}-${index}`}>
                        <td className="px-2 py-1.5">
                          <input value={row.sku} onChange={(event) => updateVariant(index, { sku: event.target.value })} className="h-8 w-36 px-2 rounded border border-slate-200" />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={row.color} onChange={(event) => updateVariant(index, { color: event.target.value })} className="h-8 w-24 px-2 rounded border border-slate-200" />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={row.size} onChange={(event) => updateVariant(index, { size: event.target.value })} className="h-8 w-16 px-2 rounded border border-slate-200" />
                        </td>
                        <td className="px-2 py-1.5">
                          <input value={row.barcode} onChange={(event) => updateVariant(index, { barcode: event.target.value })} className="h-8 w-28 px-2 rounded border border-slate-200" />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            min={0}
                            value={row.stockQty}
                            onChange={(event) => updateVariant(index, { stockQty: Number(event.target.value) || 0 })}
                            className="h-8 w-20 px-2 rounded border border-slate-200"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            value={row.priceAdjustment}
                            onChange={(event) => updateVariant(index, { priceAdjustment: Number(event.target.value) || 0 })}
                            className="h-8 w-20 px-2 rounded border border-slate-200"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <select
                            value={row.status}
                            onChange={(event) => updateVariant(index, { status: event.target.value as ProductVariant["status"] })}
                            className="h-8 px-2 rounded border border-slate-200 bg-white"
                          >
                            {VARIANT_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-1.5">
                          <button
                            type="button"
                            onClick={() => set("variantDetails", values.variantDetails.filter((_, current) => current !== index))}
                            className="h-8 w-8 text-slate-400 hover:text-red-600 rounded flex items-center justify-center"
                            aria-label="Remove variant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No variants yet. Generate from colors and sizes, or add one row.</p>
            )}
          </div>
        ) : null}
      </Section>

      <Section title="6. Factory & pricing" description="Prices, factory, and customer stay admin-only. MOQ and FOB port can show on the public product page.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Factory"
            hint={
              factories.length === 0
                ? "Add a factory first if you want to assign one."
                : "Code is generated automatically when you create a factory."
            }
          >
            <select value={values.factoryId} onChange={(event) => set("factoryId", event.target.value)} className={inputClass}>
              <option value="">No factory</option>
              {factories.map((factory) => (
                <option key={factory.id} value={factory.id}>
                  {factory.code} — {factory.name}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex items-end">
            <Link href="/admin/factories" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 pb-2">
              Manage factories
            </Link>
          </div>
          <Field label="Factory price EXW">
            <input value={values.factoryPriceEXW} onChange={(event) => set("factoryPriceEXW", event.target.value)} maxLength={40} className={inputClass} placeholder="7.20" />
          </Field>
          <Field label="Sale price">
            <input value={values.salePrice} onChange={(event) => set("salePrice", event.target.value)} maxLength={40} className={inputClass} placeholder="8.50" />
          </Field>
          <Field label="FOB price">
            <input value={values.fobPrice} onChange={(event) => set("fobPrice", event.target.value)} maxLength={40} className={inputClass} placeholder="8.00" />
          </Field>
          <Field label="FOB port">
            <input value={values.fobPort} onChange={(event) => set("fobPort", event.target.value)} maxLength={80} className={inputClass} placeholder="Karachi / Shanghai" />
          </Field>
          <Field label="MOQ">
            <input value={values.moq} onChange={(event) => set("moq", event.target.value)} maxLength={40} className={inputClass} placeholder="500" />
          </Field>
          <Field label="Quantity unit">
            <select value={values.quantityUnit} onChange={(event) => set("quantityUnit", event.target.value)} className={inputClass}>
              {QUANTITY_UNITS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="7. Ready stock" description="Optional inventory snapshot for this parent style.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Ready stock available">
            <select
              value={values.readyStockAvailability}
              onChange={(event) => set("readyStockAvailability", event.target.value as ErpFormValues["readyStockAvailability"])}
              className={inputClass}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </Field>
          {values.readyStockAvailability === "Yes" ? (
            <>
              <Field label="Ready stock quantity">
                <input value={values.readyStockQuantity} onChange={(event) => set("readyStockQuantity", event.target.value)} maxLength={40} className={inputClass} />
              </Field>
              <Field label="Ready stock unit">
                <select value={values.readyStockQuantityUnit} onChange={(event) => set("readyStockQuantityUnit", event.target.value)} className={inputClass}>
                  {QUANTITY_UNITS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          ) : null}
        </div>
      </Section>

      <Section title="8. Customer" description="Buyer assignment. Style code is auto-generated on save if a customer is selected and the field is empty.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Customer">
            <select value={values.customerId} onChange={(event) => set("customerId", event.target.value)} className={inputClass}>
              <option value="">No customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.code} — {customer.name}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex items-end">
            <Link href="/admin/customers" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 pb-2">
              Manage customers
            </Link>
          </div>
          <Field label="Customer style code" hint="Leave blank to auto-generate CYY-000 when a customer is assigned.">
            <input value={values.customerStyleCode} onChange={(event) => set("customerStyleCode", event.target.value)} maxLength={40} className={inputClass} placeholder="C26-001" />
          </Field>
          <Field label="Repeat order">
            <select value={values.repeatOrder} onChange={(event) => set("repeatOrder", event.target.value as ErpFormValues["repeatOrder"])} className={inputClass}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </Field>
          {values.repeatOrder === "Yes" ? (
            <Field label="Repeat number">
              <select
                value={values.repeatOrderNumber}
                onChange={(event) => set("repeatOrderNumber", event.target.value as ErpFormValues["repeatOrderNumber"])}
                className={inputClass}
              >
                {REPEAT_NUMBERS.filter((item) => item !== "None").map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}
        </div>
      </Section>

      <Section title="9. Market suitability" description="Where this style is intended to sell.">
        <div className="flex flex-wrap gap-2">
          {MARKETS.map((market) => (
            <button
              key={market}
              type="button"
              onClick={() => toggleMarket(market)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                values.marketSuitability.includes(market)
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {market}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={customMarket}
            onChange={(event) => setCustomMarket(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomMarket();
              }
            }}
            className={`${inputClass} max-w-xs`}
            placeholder="Add another market"
          />
          <button type="button" onClick={addCustomMarket} className="px-3 py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">
            Add market
          </button>
        </div>
        {values.marketSuitability.filter((item) => !(MARKETS as readonly string[]).includes(item)).length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {values.marketSuitability
              .filter((item) => !(MARKETS as readonly string[]).includes(item))
              .map((market) => (
                <button
                  key={market}
                  type="button"
                  onClick={() => toggleMarket(market)}
                  className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {market} ×
                </button>
              ))}
          </div>
        ) : null}
      </Section>
    </div>
  );
}

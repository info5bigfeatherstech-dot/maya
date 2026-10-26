"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import {
  AGE_GROUPS,
  COLLECTION_PRESETS,
  GENDERS,
  MARKETS,
  MAX_CUSTOMERS,
  MONTHS,
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
  QUANTITY_UNITS,
  REPEAT_NUMBERS,
  SEASON_PRESETS,
  SIZE_PRESETS,
  emptyCustomerLink,
  parseColors,
  yearOptions,
} from "@/lib/admin/erp";
import type { Customer, ErpFormValues, Factory } from "@/lib/admin/types";

const YEAR_OPTIONS = yearOptions();
const inputClass =
  "w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "block space-y-1.5";
const labelText = "text-xs font-semibold text-slate-600";

interface ErpFieldsProps {
  values: ErpFormValues;
  factories: Factory[];
  customers: Customer[];
  onChange: (patch: Partial<ErpFormValues>) => void;
  variantSlot?: React.ReactNode;
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
    <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="text-[11px] text-slate-500 mt-1">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function ErpFields({ values, factories, customers, onChange, variantSlot }: ErpFieldsProps) {
  const [customMarket, setCustomMarket] = useState("");
  const set = <K extends keyof ErpFormValues>(field: K, value: ErpFormValues[K]) => {
    onChange({ [field]: value } as Partial<ErpFormValues>);
  };

  const colors = parseColors(values.availableColorsInput);

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
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Inventory</p>
        <h2 className="text-sm font-semibold text-slate-900 mt-0.5">ERP product master</h2>
        <p className="text-[11px] text-slate-500 mt-1">
          Internal inventory record. Fabric, colors, and sizes below apply to the whole product. Extra
          variants come after that block so they can copy those values. Factory prices, customer codes,
          and stock stay admin-only.
        </p>
      </div>

      <Section title="1. Identification & status" description="Purchase code and live status. The parent product code is set at the top of this form.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </Section>

      <Section title="2. Classification" description="Website Category at the top is the public menu. These fields are extra inventory labels only.">
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
          <Field label="Primary color" hint="This color represents the whole product, not one extra variant.">
            <input value={values.color} onChange={(event) => set("color", event.target.value)} maxLength={40} className={inputClass} placeholder="Blue" />
          </Field>
          <Field label="Size range" hint="Available sizing for the whole product. Extra variants can override.">
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
            <Field label="Available colors" hint="Comma-separated catalog colors for the whole product. Extra variants can pick from this list.">
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

      {variantSlot}

      <Section title="5. Factory & pricing" description="Prices, factory, and customer stay admin-only. MOQ and FOB port can show on the public product page.">
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

      <Section title="6. Ready stock" description="Optional inventory snapshot for this parent style.">
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

      <Section
        title="7. Customers"
        description="Optional. One product can be linked to several buyers. Style code and repeat order are optional and are not auto-generated."
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link href="/admin/customers" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
            Manage customers
          </Link>
          <button
            type="button"
            onClick={() => {
              if (values.customers.length >= MAX_CUSTOMERS) return;
              set("customers", [...values.customers, emptyCustomerLink()]);
            }}
            disabled={values.customers.length >= MAX_CUSTOMERS}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            Add customer
          </button>
        </div>
        {values.customers.length === 0 ? (
          <p className="text-[11px] text-slate-500">No customers linked. This is fine — customer details are optional.</p>
        ) : (
          <div className="space-y-3">
            {values.customers.map((row, index) => {
              const taken = new Set(
                values.customers
                  .map((item, current) => (current === index ? "" : item.customerId))
                  .filter(Boolean)
              );
              return (
                <div key={`customer-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label={`Customer ${index + 1}`}>
                    <select
                      value={row.customerId}
                      onChange={(event) =>
                        set(
                          "customers",
                          values.customers.map((item, current) =>
                            current === index ? { ...item, customerId: event.target.value } : item
                          )
                        )
                      }
                      className={inputClass}
                    >
                      <option value="">Select customer (optional)</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id} disabled={taken.has(customer.id)}>
                          {customer.code} — {customer.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "customers",
                          values.customers.filter((_, current) => current !== index)
                        )
                      }
                      className="h-10 w-10 text-slate-400 hover:text-red-600 rounded-lg flex items-center justify-center"
                      aria-label={`Remove customer ${index + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Field label="Customer style code" hint="Optional. Leave blank if this buyer has no style code yet.">
                    <input
                      value={row.styleCode}
                      onChange={(event) =>
                        set(
                          "customers",
                          values.customers.map((item, current) =>
                            current === index ? { ...item, styleCode: event.target.value } : item
                          )
                        )
                      }
                      maxLength={40}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </Field>
                  <Field label="Repeat order">
                    <select
                      value={row.repeatOrder}
                      onChange={(event) =>
                        set(
                          "customers",
                          values.customers.map((item, current) =>
                            current === index
                              ? {
                                  ...item,
                                  repeatOrder: event.target.value as ErpFormValues["repeatOrder"],
                                  repeatOrderNumber:
                                    event.target.value === "Yes"
                                      ? item.repeatOrderNumber === "None"
                                        ? "1st"
                                        : item.repeatOrderNumber
                                      : "None",
                                }
                              : item
                          )
                        )
                      }
                      className={inputClass}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </Field>
                  {row.repeatOrder === "Yes" ? (
                    <Field label="Repeat number">
                      <select
                        value={row.repeatOrderNumber}
                        onChange={(event) =>
                          set(
                            "customers",
                            values.customers.map((item, current) =>
                              current === index
                                ? {
                                    ...item,
                                    repeatOrderNumber: event.target.value as ErpFormValues["repeatOrderNumber"],
                                  }
                                : item
                            )
                          )
                        }
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
              );
            })}
          </div>
        )}
      </Section>

      <Section title="8. Market suitability" description="Where this style is intended to sell.">
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

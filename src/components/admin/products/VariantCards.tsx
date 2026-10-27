"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  MAX_SUB_VARIANTS,
  MAX_VARIANT_FIELDS,
  MAX_VARIANTS,
  VARIANT_STATUSES,
  applyParentAttributes,
  emptySubVariant,
  emptyVariant,
  extraVariantSku,
  serialVariantSku,
  subVariantSku,
} from "@/lib/admin/erp";
import type { ErpFormValues, ProductAttribute, ProductSubVariant, ProductVariant } from "@/lib/admin/types";
import { ImageUploader, type ImageDraft } from "./ImageUploader";

const inputClass =
  "w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
const textareaClass =
  "w-full min-h-[88px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
const labelText = "text-xs font-semibold text-slate-600";

interface VariantCardsProps {
  productCode: string;
  values: ErpFormValues;
  onChange: (patch: Partial<ErpFormValues>) => void;
}

function AttributeEditor({
  rows,
  onChange,
  hint,
  error,
}: {
  rows: ProductAttribute[];
  onChange: (rows: ProductAttribute[]) => void;
  hint?: string;
  error?: string;
}) {
  const list = rows.length ? rows : [{ key: "", value: "" }];
  const update = (index: number, patch: Partial<ProductAttribute>) => {
    onChange(list.map((row, current) => (current === index ? { ...row, ...patch } : row)));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className={labelText}>Attributes</span>
        <button
          type="button"
          onClick={() => {
            if (list.length >= MAX_VARIANT_FIELDS) return;
            onChange([...list, { key: "", value: "" }]);
          }}
          disabled={list.length >= MAX_VARIANT_FIELDS}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
        >
          <Plus className="w-3 h-3" />
          Add field
        </button>
      </div>
      {hint ? <p className="text-[11px] text-slate-500">{hint}</p> : null}
      {error ? <p className="text-[11px] text-red-600">{error}</p> : null}
      {list.map((item, index) => (
        <div key={`attr-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <input
            value={item.key}
            onChange={(event) => update(index, { key: event.target.value })}
            maxLength={80}
            className={inputClass}
            placeholder="Field name — Color, Size, Plating, Fit"
          />
          <input
            value={item.value}
            onChange={(event) => update(index, { value: event.target.value })}
            maxLength={200}
            className={inputClass}
            placeholder="Value, or XS, SM, L for sub-variants"
          />
          <button
            type="button"
            onClick={() =>
              onChange(list.length > 1 ? list.filter((_, current) => current !== index) : [{ key: "", value: "" }])
            }
            className="h-10 w-10 text-slate-400 hover:text-red-600 rounded-lg flex items-center justify-center"
            aria-label="Remove field"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function SubVariantEditor({
  parentSku,
  parentLabel,
  rows,
  onChange,
}: {
  parentSku: string;
  parentLabel: string;
  rows: ProductSubVariant[];
  onChange: (rows: ProductSubVariant[]) => void;
}) {
  const stamp = (next: ProductSubVariant[]) =>
    next.map((row, index) => ({ ...row, sku: subVariantSku(parentSku, index) }));

  const update = (index: number, patch: Partial<ProductSubVariant>) => {
    onChange(stamp(rows.map((row, current) => (current === index ? { ...row, ...patch } : row))));
  };

  return (
    <div className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50/40 p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">Sub-variants</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Comma lists on the parent (Size=XS, SM, L) fill these automatically. They reuse {parentLabel} images
            unless you upload replacements.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (rows.length >= MAX_SUB_VARIANTS) return;
            onChange(stamp([...rows, emptySubVariant(parentSku, rows.length)]));
          }}
          disabled={rows.length >= MAX_SUB_VARIANTS}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-indigo-700 border border-indigo-200 bg-white rounded-lg hover:bg-indigo-50 disabled:opacity-50"
        >
          <Plus className="w-3 h-3" />
          Add sub-variant
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-[11px] text-slate-500">No sub-variants yet.</p>
      ) : (
        rows.map((row, index) => (
          <div key={`sub-${parentSku}-${index}`} className="rounded-lg border border-indigo-100 bg-white p-3 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <label className="block space-y-1 min-w-0 flex-1">
                <span className={labelText}>Sub-variant code</span>
                <input value={row.sku} readOnly className={`${inputClass} font-mono bg-slate-50 text-slate-700`} />
              </label>
              <button
                type="button"
                onClick={() => onChange(stamp(rows.filter((_, current) => current !== index)))}
                className="mt-6 h-8 w-8 text-slate-400 hover:text-red-600 rounded flex items-center justify-center"
                aria-label={`Remove sub-variant ${index + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <label className="block space-y-1">
              <span className={labelText}>Title</span>
              <input
                value={row.title}
                onChange={(event) => update(index, { title: event.target.value })}
                maxLength={160}
                className={inputClass}
                placeholder="Optional label"
              />
            </label>
            <AttributeEditor
              rows={row.attributes}
              onChange={(attributes) => update(index, { attributes })}
              hint="Any fields for this option. Leave images empty to inherit the parent."
            />
            <ImageUploader
              label="Images (optional)"
              images={[
                ...row.images.map((url) => ({ kind: "existing" as const, url })),
                ...(row.drafts || []),
              ]}
              onChange={(drafts: ImageDraft[]) =>
                update(index, {
                  images: drafts.filter((item) => item.kind === "existing").map((item) => item.url),
                  drafts: drafts.filter((item) => item.kind === "new"),
                })
              }
            />
          </div>
        ))
      )}
    </div>
  );
}

export function VariantCards({ productCode, values, onChange }: VariantCardsProps) {
  const codeBase = productCode.trim() || "MG-001";
  const primaryCode = serialVariantSku(codeBase, 0);

  const stamp = (rows: ProductVariant[]) =>
    rows.map((row, index) => ({ ...row, sku: extraVariantSku(codeBase, index) }));

  const setDetails = (variantDetails: ProductVariant[]) => {
    onChange({ variantDetails: stamp(variantDetails), variant: variantDetails.length ? "Yes" : values.variant });
  };

  const updateVariant = (index: number, patch: Partial<ProductVariant>) => {
    setDetails(values.variantDetails.map((row, current) => (current === index ? { ...row, ...patch } : row)));
  };

  const setPrimaryAttributes = (attributes: ProductAttribute[]) => {
    const applied = applyParentAttributes(attributes, values.primarySubVariants, primaryCode, values.color);
    onChange({
      primaryAttributes: applied.attributes,
      color: applied.color,
      primarySubVariants: applied.subVariants,
    });
  };

  const setExtraAttributes = (index: number, attributes: ProductAttribute[]) => {
    const row = values.variantDetails[index];
    if (!row) return;
    const applied = applyParentAttributes(attributes, row.subVariants, extraVariantSku(codeBase, index), row.color);
    updateVariant(index, {
      attributes: applied.attributes,
      color: applied.color,
      size: applied.size,
      subVariants: applied.subVariants,
    });
  };

  const addExtra = () => {
    if (values.variantDetails.length >= MAX_VARIANTS) return;
    const nextIndex = values.variantDetails.length;
    onChange({
      variant: "Yes",
      variantDetails: stamp([...values.variantDetails, emptyVariant(codeBase, nextIndex)]),
    });
  };

  const enableVariants = (next: ErpFormValues["variant"]) => {
    if (next === "Yes" && values.variantDetails.length === 0) {
      addExtra();
      return;
    }
    onChange({ variant: next });
  };

  const primaryApplied = applyParentAttributes(
    values.primaryAttributes || [],
    values.primarySubVariants,
    primaryCode,
    values.color
  );

  return (
    <section className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-4 space-y-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">Catalog variants</p>
        <h3 className="text-sm font-semibold text-slate-900 mt-0.5">Primary, extra, and sub-variants</h3>
        <p className="text-[11px] text-slate-600 mt-1">
          Attributes can be anything — Color, Size, Plating, Fit, Pack. Put commas in one value to create
          sub-variants that share this variant’s images. Available colors and size range above stay listing facts
          for the public page; they do not auto-build variants.
        </p>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-white p-4 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">Primary variant</p>
        <label className="block space-y-1 max-w-md">
          <span className={labelText}>Primary variant code</span>
          <input value={primaryCode} readOnly className={`${inputClass} font-mono bg-indigo-50 text-slate-800`} />
        </label>
        <p className="text-[11px] text-slate-500">
          Title, description, and images at the top of this form belong to {primaryCode}.
        </p>
        <AttributeEditor
          rows={values.primaryAttributes || []}
          onChange={setPrimaryAttributes}
          error={primaryApplied.spreadingError}
          hint="Example: Color = Red and Size = XS, SM, L. Only one field may list multiple values."
        />
        <SubVariantEditor
          parentSku={primaryCode}
          parentLabel={primaryCode}
          rows={values.primarySubVariants || []}
          onChange={(primarySubVariants) => onChange({ primarySubVariants })}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block space-y-1.5 max-w-xs">
          <span className={labelText}>Enable extra variants</span>
          <select
            value={values.variant}
            onChange={(event) => enableVariants(event.target.value as ErpFormValues["variant"])}
            className={inputClass}
          >
            <option value="No">No (primary product only)</option>
            <option value="Yes">Yes (add extra variants)</option>
          </select>
        </label>
        <button
          type="button"
          onClick={addExtra}
          disabled={values.variantDetails.length >= MAX_VARIANTS}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          Add extra variant
        </button>
      </div>

      {values.variant === "Yes" ? (
        <div className="space-y-4">
          {values.variantDetails.map((row, index) => {
            const code = extraVariantSku(codeBase, index);
            const applied = applyParentAttributes(row.attributes || [], row.subVariants, code, row.color || "");
            return (
              <div
                key={`variant-${index}`}
                className="rounded-xl border border-indigo-200 bg-white p-4 space-y-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                      Extra variant {index + 2}
                    </p>
                    <label className="block mt-2 space-y-1 max-w-md">
                      <span className={labelText}>Variant code</span>
                      <input value={code} readOnly className={`${inputClass} font-mono bg-indigo-50 text-slate-800`} />
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDetails(values.variantDetails.filter((_, current) => current !== index))}
                    className="h-8 w-8 text-slate-400 hover:text-red-600 rounded flex items-center justify-center"
                    aria-label={`Remove variant ${index + 2}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <label className="block space-y-1.5">
                  <span className={labelText}>Title</span>
                  <input
                    value={row.title}
                    onChange={(event) => updateVariant(index, { title: event.target.value })}
                    maxLength={160}
                    className={inputClass}
                    placeholder="This variant's title"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className={labelText}>Description</span>
                  <textarea
                    value={row.description}
                    onChange={(event) => updateVariant(index, { description: event.target.value })}
                    maxLength={2000}
                    className={textareaClass}
                    placeholder="This variant's description"
                  />
                </label>

                <ImageUploader
                  label="Images"
                  images={[
                    ...row.images.map((url) => ({ kind: "existing" as const, url })),
                    ...(row.drafts || []),
                  ]}
                  onChange={(drafts: ImageDraft[]) =>
                    updateVariant(index, {
                      images: drafts.filter((item) => item.kind === "existing").map((item) => item.url),
                      drafts: drafts.filter((item) => item.kind === "new"),
                    })
                  }
                />
                <p className="text-[11px] text-slate-500 -mt-2">
                  Sub-variants reuse these images unless a sub-variant uploads its own.
                </p>

                <AttributeEditor
                  rows={row.attributes || []}
                  onChange={(attributes) => setExtraAttributes(index, attributes)}
                  error={applied.spreadingError}
                  hint="Same rules as primary. Example: Color = Black; Size = XS, SM"
                />

                <SubVariantEditor
                  parentSku={code}
                  parentLabel={row.title || code}
                  rows={row.subVariants || []}
                  onChange={(subVariants) => updateVariant(index, { subVariants })}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                  <label className="block space-y-1.5">
                    <span className={labelText}>Status</span>
                    <select
                      value={row.status}
                      onChange={(event) =>
                        updateVariant(index, { status: event.target.value as ProductVariant["status"] })
                      }
                      className={inputClass}
                    >
                      {VARIANT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block space-y-1.5">
                    <span className={labelText}>Stock</span>
                    <input
                      type="number"
                      min={0}
                      value={row.stockQty}
                      onChange={(event) => updateVariant(index, { stockQty: Number(event.target.value) || 0 })}
                      className={inputClass}
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className={labelText}>Price adj.</span>
                    <input
                      type="number"
                      value={row.priceAdjustment}
                      onChange={(event) =>
                        updateVariant(index, { priceAdjustment: Number(event.target.value) || 0 })
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

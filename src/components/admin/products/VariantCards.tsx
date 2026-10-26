"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  MAX_SUB_VARIANTS,
  MAX_VARIANT_FIELDS,
  MAX_VARIANTS,
  VARIANT_STATUSES,
  catalogColorList,
  catalogColorSuggestions,
  catalogSizeList,
  emptySubVariant,
  emptyVariant,
  extraVariantSku,
  serialVariantSku,
  subVariantSku,
} from "@/lib/admin/erp";
import type { ErpFormValues, ProductSubVariant, ProductVariant } from "@/lib/admin/types";
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

function SubVariantEditor({
  parentSku,
  parentColor,
  parentLabel,
  rows,
  colorOptions,
  sizeOptions,
  onChange,
}: {
  parentSku: string;
  parentColor: string;
  parentLabel: string;
  rows: ProductSubVariant[];
  colorOptions: string[];
  sizeOptions: string[];
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
            Example: {parentLabel || "this variant"} in different sizes keeps the same photos. Upload images
            only when this sub-variant looks different, such as another color.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (rows.length >= MAX_SUB_VARIANTS) return;
            onChange(
              stamp([
                ...rows,
                emptySubVariant(parentSku, rows.length, {
                  color: parentColor,
                  size: sizeOptions[rows.length] || "",
                }),
              ])
            );
          }}
          disabled={rows.length >= MAX_SUB_VARIANTS}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-indigo-700 border border-indigo-200 bg-white rounded-lg hover:bg-indigo-50 disabled:opacity-50"
        >
          <Plus className="w-3 h-3" />
          Add sub-variant
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-[11px] text-slate-500">No sub-variants yet. Size values from above are added automatically.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block space-y-1">
                <span className={labelText}>Color</span>
                <input
                  list={`${parentSku}-sub-colors-${index}`}
                  value={row.color}
                  onChange={(event) => update(index, { color: event.target.value })}
                  maxLength={40}
                  className={inputClass}
                  placeholder={parentColor || "Color"}
                />
                <datalist id={`${parentSku}-sub-colors-${index}`}>
                  {colorOptions.map((color) => (
                    <option key={color} value={color} />
                  ))}
                </datalist>
              </label>
              <label className="block space-y-1">
                <span className={labelText}>Size</span>
                <input
                  list={`${parentSku}-sub-sizes-${index}`}
                  value={row.size}
                  onChange={(event) => update(index, { size: event.target.value })}
                  maxLength={120}
                  className={inputClass}
                  placeholder="Size"
                />
                <datalist id={`${parentSku}-sub-sizes-${index}`}>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size} />
                  ))}
                </datalist>
              </label>
            </div>
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
            <p className="text-[11px] text-slate-500 -mt-1">
              Leave empty to reuse {parentLabel || "parent"} images. If you upload here, this sub-variant uses
              its own photos.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={labelText}>Extra fields</span>
                <button
                  type="button"
                  onClick={() => {
                    if (row.attributes.length >= MAX_VARIANT_FIELDS) return;
                    update(index, { attributes: [...row.attributes, { key: "", value: "" }] });
                  }}
                  disabled={row.attributes.length >= MAX_VARIANT_FIELDS}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 disabled:opacity-50"
                >
                  <Plus className="w-3 h-3" />
                  Add field
                </button>
              </div>
              {row.attributes.map((item, fieldIndex) => (
                <div key={`sub-field-${index}-${fieldIndex}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <input
                    value={item.key}
                    onChange={(event) =>
                      update(index, {
                        attributes: row.attributes.map((entry, current) =>
                          current === fieldIndex ? { ...entry, key: event.target.value } : entry
                        ),
                      })
                    }
                    maxLength={80}
                    className={inputClass}
                    placeholder="Field name"
                  />
                  <input
                    value={item.value}
                    onChange={(event) =>
                      update(index, {
                        attributes: row.attributes.map((entry, current) =>
                          current === fieldIndex ? { ...entry, value: event.target.value } : entry
                        ),
                      })
                    }
                    maxLength={200}
                    className={inputClass}
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      update(index, {
                        attributes: row.attributes.filter((_, current) => current !== fieldIndex),
                      })
                    }
                    className="h-10 w-10 text-slate-400 hover:text-red-600 rounded-lg flex items-center justify-center"
                    aria-label="Remove field"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function VariantCards({ productCode, values, onChange }: VariantCardsProps) {
  const codeBase = productCode.trim() || "MG-001";
  const primaryCode = serialVariantSku(codeBase, 0);
  const colors = catalogColorList(values);
  const sizes = catalogSizeList(values);
  const colorOptions = catalogColorSuggestions(values);
  const colorParents = colors.length > 0;

  const stamp = (rows: ProductVariant[]) =>
    rows.map((row, index) => ({ ...row, sku: extraVariantSku(codeBase, index) }));

  const setDetails = (variantDetails: ProductVariant[]) => {
    onChange({ variantDetails: stamp(variantDetails), variant: variantDetails.length ? "Yes" : values.variant });
  };

  const updateVariant = (index: number, patch: Partial<ProductVariant>) => {
    setDetails(values.variantDetails.map((row, current) => (current === index ? { ...row, ...patch } : row)));
  };

  const addExtra = () => {
    if (values.variantDetails.length >= MAX_VARIANTS) return;
    const nextIndex = values.variantDetails.length;
    const next = emptyVariant(codeBase, nextIndex, {
      color: colorParents ? colors[nextIndex + 1] || "" : "",
      size: colorParents ? "" : sizes[nextIndex + 1] || "",
    });
    if (colorParents && sizes.length) {
      next.subVariants = sizes.map((size, subIndex) =>
        emptySubVariant(next.sku, subIndex, { color: next.color, size })
      );
    }
    onChange({
      variant: "Yes",
      variantDetails: stamp([...values.variantDetails, next]),
    });
  };

  const enableVariants = (next: ErpFormValues["variant"]) => {
    if (next === "Yes" && values.variantDetails.length === 0) {
      addExtra();
      return;
    }
    onChange({ variant: next });
  };

  return (
    <section className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-4 space-y-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">Catalog variants</p>
        <h3 className="text-sm font-semibold text-slate-900 mt-0.5">Primary, extra, and sub-variants</h3>
        <p className="text-[11px] text-slate-600 mt-1">
          Available colors and size range above fill variants in order: first value goes to{" "}
          <span className="font-mono font-semibold">{primaryCode}</span>, next to{" "}
          <span className="font-mono">{extraVariantSku(codeBase, 0)}</span>, then{" "}
          <span className="font-mono">{extraVariantSku(codeBase, 1)}</span>. If both colors and
          sizes are set, each color is a variant and each size becomes a sub-variant that reuses that color’s
          images unless you upload new ones.
        </p>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-white p-4 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">Primary variant</p>
        <label className="block space-y-1 max-w-md">
          <span className={labelText}>Primary variant code</span>
          <input value={primaryCode} readOnly className={`${inputClass} font-mono bg-indigo-50 text-slate-800`} />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className={labelText}>Color</span>
            <input
              list="primary-variant-colors"
              value={values.color}
              onChange={(event) => onChange({ color: event.target.value })}
              maxLength={40}
              className={inputClass}
              placeholder={colors[0] || "First available color"}
            />
            <datalist id="primary-variant-colors">
              {colorOptions.map((color) => (
                <option key={color} value={color} />
              ))}
            </datalist>
          </label>
          <label className="block space-y-1.5">
            <span className={labelText}>Size</span>
            <input
              value={colorParents ? "" : sizes[0] || ""}
              readOnly={colorParents || Boolean(sizes[0])}
              onChange={() => undefined}
              className={`${inputClass} ${colorParents || sizes[0] ? "bg-indigo-50 text-slate-800" : ""}`}
              placeholder={colorParents ? "Sizes are sub-variants below" : "First size from the range above"}
            />
          </label>
        </div>
        <p className="text-[11px] text-slate-500">
          Title, description, and images at the top of this form belong to {primaryCode}.
        </p>
        <SubVariantEditor
          parentSku={primaryCode}
          parentColor={values.color || colors[0] || ""}
          parentLabel={primaryCode}
          rows={values.primarySubVariants || []}
          colorOptions={colorOptions}
          sizeOptions={sizes}
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
                  Size sub-variants reuse these images unless a sub-variant uploads its own.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className={labelText}>Color</span>
                    <input
                      list={`variant-colors-${index}`}
                      value={row.color || ""}
                      onChange={(event) => updateVariant(index, { color: event.target.value })}
                      maxLength={40}
                      className={inputClass}
                      placeholder={colors[index + 1] || "From available colors"}
                    />
                    <datalist id={`variant-colors-${index}`}>
                      {colorOptions.map((color) => (
                        <option key={color} value={color} />
                      ))}
                    </datalist>
                  </label>
                  <label className="block space-y-1.5">
                    <span className={labelText}>Size</span>
                    <input
                      list={`variant-sizes-${index}`}
                      value={row.size || ""}
                      onChange={(event) => updateVariant(index, { size: event.target.value })}
                      maxLength={120}
                      className={inputClass}
                      placeholder={colorParents ? "Optional — sizes can sit in sub-variants" : sizes[index + 1] || "From size range"}
                    />
                    <datalist id={`variant-sizes-${index}`}>
                      {sizes.map((size) => (
                        <option key={size} value={size} />
                      ))}
                    </datalist>
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={labelText}>Extra fields</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (row.attributes.length >= MAX_VARIANT_FIELDS) return;
                        updateVariant(index, { attributes: [...row.attributes, { key: "", value: "" }] });
                      }}
                      disabled={row.attributes.length >= MAX_VARIANT_FIELDS}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                    >
                      <Plus className="w-3 h-3" />
                      Add field
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Optional labels besides color and size — Fit, Material, Pack, and so on. You can add
                    different fields on each variant.
                  </p>
                  {row.attributes.map((item, fieldIndex) => (
                    <div key={`field-${index}-${fieldIndex}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      <input
                        value={item.key}
                        onChange={(event) =>
                          updateVariant(index, {
                            attributes: row.attributes.map((entry, current) =>
                              current === fieldIndex ? { ...entry, key: event.target.value } : entry
                            ),
                          })
                        }
                        maxLength={80}
                        className={inputClass}
                        placeholder="Field name"
                      />
                      <input
                        value={item.value}
                        onChange={(event) =>
                          updateVariant(index, {
                            attributes: row.attributes.map((entry, current) =>
                              current === fieldIndex ? { ...entry, value: event.target.value } : entry
                            ),
                          })
                        }
                        maxLength={200}
                        className={inputClass}
                        placeholder="Value"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateVariant(index, {
                            attributes: row.attributes.filter((_, current) => current !== fieldIndex),
                          })
                        }
                        className="h-10 w-10 text-slate-400 hover:text-red-600 rounded-lg flex items-center justify-center"
                        aria-label="Remove field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <SubVariantEditor
                  parentSku={code}
                  parentColor={row.color || ""}
                  parentLabel={row.color || code}
                  rows={row.subVariants || []}
                  colorOptions={colorOptions}
                  sizeOptions={sizes}
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

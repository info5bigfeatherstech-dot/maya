"use client";

import React from "react";
import type { CatalogOptionVariant, CatalogOptions } from "@/lib/catalog/types";

export function findMatchingVariant(
  options: CatalogOptions,
  selectedIndex: number
): CatalogOptionVariant | null {
  return options.variants[selectedIndex] || options.variants[0] || null;
}

interface ProductVariantPickerProps {
  options: CatalogOptions;
  selectedIndex: number;
  subIndex: number;
  onChange: (index: number) => void;
  onSubChange: (index: number) => void;
}

function chipClass(active: boolean, primary = false) {
  if (active) {
    return primary
      ? "bg-brand-blue text-white border-brand-blue"
      : "bg-slate-900 text-white border-slate-900";
  }
  return "bg-white text-slate-700 border-slate-200 hover:border-slate-400";
}

export function ProductVariantPicker({
  options,
  selectedIndex,
  subIndex,
  onChange,
  onSubChange,
}: ProductVariantPickerProps) {
  const selected = options.variants[selectedIndex] || options.variants[0];
  const children = selected?.children || [];
  const selectedChild = children[subIndex] || children[0];
  const extraAttributes = (
    selectedChild?.attributes?.length ? selectedChild.attributes : selected?.primary ? [] : selected?.attributes || []
  ).filter((item) => item.key && item.value);

  return (
    <div className="mb-6 space-y-4">
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Variants</h4>
        <div className="flex flex-wrap gap-2">
          {options.variants.map((variant, index) => {
            const active = selectedIndex === index;
            const code = variant.code || (variant.primary ? "Primary" : `Variant ${index + 1}`);
            const label = variant.primary
              ? `Primary · ${code}`
              : `${variant.title.trim() || variant.attributes.find((item) => item.key.toLowerCase() === "color")?.value || `Variant ${index + 1}`} · ${code}`;
            return (
              <button
                key={`${code}-${index}`}
                type="button"
                onClick={() => onChange(index)}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${chipClass(active, Boolean(variant.primary))}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {children.length > 0 ? (
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            {children.some((item) => item.attributes.some((entry) => entry.key.toLowerCase() === "size"))
              ? "Size"
              : "Options"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {children.map((child, index) => {
              const active = (selectedChild?.code || "") === (child.code || "") && subIndex === index;
              const size = child.attributes.find((item) => item.key.toLowerCase() === "size")?.value;
              const color = child.attributes.find((item) => item.key.toLowerCase() === "color")?.value;
              const label = child.title.trim() || size || color || `Option ${index + 1}`;
              return (
                <button
                  key={`${child.code}-${index}`}
                  type="button"
                  onClick={() => onSubChange(index)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${chipClass(active)}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {extraAttributes.length > 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 space-y-1">
          {extraAttributes.map((item) => (
            <div key={`${item.key}-${item.value}`} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">{item.key}</span>
              <span className="text-slate-900 font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

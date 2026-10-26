"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  PRODUCT_INFO_SECTIONS,
  type ProductInfoSection,
  type ProductInfoSectionKey,
} from "@/lib/catalog/infoSections";

const MAX_ITEMS = 6;

interface InfoSectionsFieldsProps {
  sections: ProductInfoSection[];
  onChange: (sections: ProductInfoSection[]) => void;
}

export function InfoSectionsFields({ sections, onChange }: InfoSectionsFieldsProps) {
  const sectionMap = new Map(sections.map((section) => [section.key, section]));

  const updateSection = (key: ProductInfoSectionKey, items: ProductInfoSection["items"]) => {
    onChange(
      PRODUCT_INFO_SECTIONS.map((meta) =>
        meta.key === key
          ? { key, items }
          : sectionMap.get(meta.key) || { key: meta.key, items: [{ heading: "", content: "" }] }
      )
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="text-xs font-semibold text-slate-600">Product page sections</span>
        <p className="text-[11px] text-slate-500 mt-1">
          These appear as tabs under the description. Each item needs a heading and content. Leave a
          section blank to hide that tab.
        </p>
      </div>

      {PRODUCT_INFO_SECTIONS.map((meta) => {
        const items = sectionMap.get(meta.key)?.items?.length
          ? sectionMap.get(meta.key)!.items
          : [{ heading: "", content: "" }];

        return (
          <div key={meta.key} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-800">{meta.title}</h3>
              <button
                type="button"
                disabled={items.length >= MAX_ITEMS}
                onClick={() => updateSection(meta.key, [...items, { heading: "", content: "" }])}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                Add item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={`${meta.key}-${index}`} className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      value={item.heading}
                      onChange={(event) => {
                        const next = items.map((current, currentIndex) =>
                          currentIndex === index ? { ...current, heading: event.target.value } : current
                        );
                        updateSection(meta.key, next);
                      }}
                      maxLength={120}
                      placeholder="Heading, e.g. Embroidery & Custom Printing"
                      className="flex-1 h-10 px-3 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = items.filter((_, currentIndex) => currentIndex !== index);
                        updateSection(meta.key, next.length ? next : [{ heading: "", content: "" }]);
                      }}
                      className="h-10 w-10 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center shrink-0"
                      aria-label={`Remove ${meta.title} item`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={item.content}
                    onChange={(event) => {
                      const next = items.map((current, currentIndex) =>
                        currentIndex === index ? { ...current, content: event.target.value } : current
                      );
                      updateSection(meta.key, next);
                    }}
                    maxLength={1000}
                    rows={3}
                    placeholder="Short content shown under that heading"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

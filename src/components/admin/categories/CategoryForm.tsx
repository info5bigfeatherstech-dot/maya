"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Category, CategoryPayload } from "@/lib/admin/types";
import { collectDescendantIds, flattenCategories } from "@/lib/admin/categories";

interface CategoryFormProps {
  categories: Category[];
  initial?: Category | null;
  defaultParentId?: string | null;
  submitting: boolean;
  onSubmit: (payload: CategoryPayload) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({
  categories,
  initial,
  defaultParentId = null,
  submitting,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [parentId, setParentId] = useState(initial?.parentId || defaultParentId || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initial?.name || "");
    setDescription(initial?.description || "");
    setParentId(initial?.parentId || defaultParentId || "");
    setError("");
  }, [initial, defaultParentId]);

  const parentOptions = useMemo(() => {
    const blocked = new Set<string>();
    if (initial) {
      blocked.add(initial.id);
      collectDescendantIds(initial).forEach((id) => blocked.add(id));
    }
    return flattenCategories(categories).filter((category) => !blocked.has(category.id));
  }, [categories, initial]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Category name must be at least 2 characters");
      return;
    }
    setError("");
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        parentId: parentId || null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save category");
    }
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-xs font-semibold text-slate-600">Parent category</span>
        <select
          value={parentId}
          onChange={(event) => setParentId(event.target.value)}
          className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Top level category</option>
          {parentOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.path || category.name}
            </option>
          ))}
        </select>
        <span className="text-[11px] text-slate-500">
          Leave this empty for a main category, or choose a parent to create a subcategory.
        </span>
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold text-slate-600">Category name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          maxLength={80}
          className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Men's Jackets"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold text-slate-600">Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={500}
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Optional short description"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60"
        >
          {submitting ? "Saving..." : initial ? "Update category" : "Create category"}
        </button>
      </div>
    </form>
  );
}

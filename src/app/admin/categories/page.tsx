"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { CategoryTable } from "@/components/admin/categories/CategoryTable";
import { adminApi, AdminApiError } from "@/lib/admin/api";
import type { Category, CategoryPayload } from "@/lib/admin/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await adminApi.listCategories();
    setCategories(data);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    load()
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load categories");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [load]);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setParentId(null);
  };

  const handleSubmit = async (payload: CategoryPayload) => {
    setSubmitting(true);
    try {
      if (editing) {
        await adminApi.updateCategory(editing.id, payload);
      } else {
        await adminApi.createCategory(payload);
      }
      await load();
      closeForm();
    } catch (err) {
      throw err instanceof AdminApiError ? err : new Error("Unable to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (category.productCount > 0 || category.childCount > 0) return;
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    try {
      await adminApi.deleteCategory(category.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete category");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
            <p className="text-sm text-slate-500 mt-1">
              Create a main category first, then add subcategories under it. Products go into any level.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setParentId(null);
              setFormOpen(true);
              setError("");
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Add category
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
        ) : null}

        {formOpen ? (
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">
              {editing ? "Edit category" : parentId ? "New subcategory" : "New category"}
            </h2>
            <CategoryForm
              categories={categories}
              initial={editing}
              defaultParentId={parentId}
              submitting={submitting}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        ) : null}

        {loading ? (
          <div className="text-sm text-slate-500">Loading categories...</div>
        ) : (
          <CategoryTable
            categories={categories}
            onEdit={(category) => {
              setEditing(category);
              setParentId(category.parentId);
              setFormOpen(true);
            }}
            onAddChild={(category) => {
              setEditing(null);
              setParentId(category.id);
              setFormOpen(true);
              setError("");
            }}
            onDelete={(category) => void handleDelete(category)}
          />
        )}
      </div>
    </AdminShell>
  );
}

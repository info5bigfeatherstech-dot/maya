"use client";

import React from "react";
import type { Category } from "@/lib/admin/types";
import { FolderPlus, Pencil, Trash2 } from "lucide-react";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onAddChild: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function CategoryRows({
  categories,
  depth,
  onEdit,
  onAddChild,
  onDelete,
}: CategoryTableProps & { depth: number }) {
  return (
    <>
      {categories.map((category) => {
        const canDelete = category.productCount === 0 && category.childCount === 0;
        return (
          <React.Fragment key={category.id}>
            <tr className="hover:bg-slate-50/70">
              <td className="px-4 py-3">
                <div style={{ paddingLeft: depth * 20 }}>
                  <div className="font-medium text-slate-900">{category.name}</div>
                  {category.description ? (
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {category.description}
                    </div>
                  ) : null}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{category.slug}</td>
              <td className="px-4 py-3 text-slate-700">{category.productCount}</td>
              <td className="px-4 py-3 text-slate-700 hidden sm:table-cell">{category.childCount}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onAddChild(category)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    aria-label={`Add subcategory under ${category.name}`}
                    title="Add subcategory"
                  >
                    <FolderPlus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(category)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    aria-label={`Edit ${category.name}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(category)}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-40"
                    aria-label={`Delete ${category.name}`}
                    disabled={!canDelete}
                    title={
                      !canDelete
                        ? "Remove subcategories and products first"
                        : "Delete category"
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            {category.children?.length ? (
              <CategoryRows
                categories={category.children}
                depth={depth + 1}
                onEdit={onEdit}
                onAddChild={onAddChild}
                onDelete={onDelete}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function CategoryTable({ categories, onEdit, onAddChild, onDelete }: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
        No categories yet. Create a main category, then add subcategories under it.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold hidden md:table-cell">Slug</th>
            <th className="px-4 py-3 font-semibold">Products</th>
            <th className="px-4 py-3 font-semibold hidden sm:table-cell">Subs</th>
            <th className="px-4 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <CategoryRows
            categories={categories}
            depth={0}
            onEdit={onEdit}
            onAddChild={onAddChild}
            onDelete={onDelete}
          />
        </tbody>
      </table>
    </div>
  );
}

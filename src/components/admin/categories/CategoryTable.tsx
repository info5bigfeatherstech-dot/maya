"use client";

import React, { useMemo, useState } from "react";
import type { Category } from "@/lib/admin/types";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CornerDownRight,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderTree,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onAddChild: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function collectAllCategoryIds(cats: Category[]): string[] {
  const ids: string[] = [];
  function recurse(list: Category[]) {
    for (const cat of list) {
      if (cat.children?.length) {
        ids.push(cat.id);
        recurse(cat.children);
      }
    }
  }
  recurse(cats);
  return ids;
}

interface CategoryRowsProps {
  categories: Category[];
  depth: number;
  expandedIds: Set<string>;
  parentPath?: string;
  onToggleExpand: (id: string) => void;
  onEdit: (category: Category) => void;
  onAddChild: (category: Category) => void;
  onDelete: (category: Category) => void;
}

function CategoryRows({
  categories,
  depth,
  expandedIds,
  parentPath = "",
  onToggleExpand,
  onEdit,
  onAddChild,
  onDelete,
}: CategoryRowsProps) {
  return (
    <>
      {categories.map((category) => {
        const hasChildren = Boolean(category.children && category.children.length > 0);
        const isExpanded = expandedIds.has(category.id);
        const canDelete = category.productCount === 0 && category.childCount === 0;
        const currentPath = parentPath ? `${parentPath} / ${category.name}` : category.name;

        const rowBg =
          depth === 0
            ? "bg-white hover:bg-slate-50/80"
            : depth === 1
              ? "bg-slate-50/50 hover:bg-slate-100/60"
              : "bg-slate-100/40 hover:bg-slate-100/80";

        return (
          <React.Fragment key={category.id}>
            <tr className={`border-b border-slate-100 transition-colors ${rowBg}`}>
              {/* Category Name & Dropdown Tree Indicator */}
              <td className="px-4 py-3">
                <div
                  className="flex items-center gap-2"
                  style={{ paddingLeft: `${depth * 24}px` }}
                >
                  {/* Tree-branch connector icon for subcategories */}
                  {depth > 0 && (
                    <div className="flex items-center text-slate-400 select-none shrink-0" title={`Subcategory under ${parentPath}`}>
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  )}

                  {/* Dropdown Chevron Toggle Button */}
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => onToggleExpand(category.id)}
                      className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-blue-100/60 text-slate-600 transition-colors shrink-0"
                      title={isExpanded ? "Collapse subcategories" : "Expand subcategories dropdown"}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    </div>
                  )}

                  {/* Folder Icon (Open/Closed) */}
                  {hasChildren ? (
                    isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 text-slate-500 shrink-0" />
                    )
                  ) : (
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-xs border border-slate-300 bg-slate-50" />
                    </div>
                  )}

                  {/* Category Name & Optional Parent Breadcrumb */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => hasChildren && onToggleExpand(category.id)}
                        className={`text-left transition-colors ${
                          depth === 0
                            ? "font-semibold text-slate-900"
                            : depth === 1
                              ? "font-medium text-slate-800"
                              : "text-slate-700 font-medium"
                        } ${hasChildren ? "cursor-pointer hover:text-blue-600" : ""}`}
                      >
                        {category.name}
                      </button>

                      {/* Dropdown Badge for categories with children */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => onToggleExpand(category.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full cursor-pointer transition-colors ${
                            isExpanded
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                          title={isExpanded ? "Click to collapse" : "Click to view subcategories"}
                        >
                          <span>{category.children.length} sub{category.children.length > 1 ? "s" : ""}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronRight className="w-3 h-3" />
                          )}
                        </button>
                      )}

                      {depth > 0 && (
                        <span className="hidden lg:inline-block text-[11px] text-slate-400 font-normal">
                          (in {parentPath.split(" / ").pop()})
                        </span>
                      )}
                    </div>

                    {category.description ? (
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {category.description}
                      </div>
                    ) : null}
                  </div>
                </div>
              </td>

              {/* Slug Column */}
              <td className="px-4 py-3 text-slate-500 font-mono text-xs hidden md:table-cell">
                {category.slug}
              </td>

              {/* Products Count */}
              <td className="px-4 py-3 text-slate-700">
                <span className={`inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded text-xs font-semibold ${
                  category.productCount > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "text-slate-400"
                }`}>
                  {category.productCount}
                </span>
              </td>

              {/* Subcategories Count */}
              <td className="px-4 py-3 text-slate-700 hidden sm:table-cell">
                <span className={`inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded text-xs font-semibold ${
                  category.childCount > 0 ? "bg-blue-50 text-blue-700 border border-blue-100" : "text-slate-400"
                }`}>
                  {category.childCount}
                </span>
              </td>

              {/* Action Buttons */}
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => onAddChild(category)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label={`Add subcategory under ${category.name}`}
                    title={`Add subcategory under "${category.name}"`}
                  >
                    <FolderPlus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(category)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label={`Edit ${category.name}`}
                    title="Edit category"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(category)}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    aria-label={`Delete ${category.name}`}
                    disabled={!canDelete}
                    title={
                      !canDelete
                        ? "Cannot delete: remove subcategories and products first"
                        : "Delete category"
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>

            {/* Render Nested Children ONLY if this parent is expanded in the dropdown */}
            {hasChildren && isExpanded ? (
              <CategoryRows
                categories={category.children}
                depth={depth + 1}
                expandedIds={expandedIds}
                parentPath={currentPath}
                onToggleExpand={onToggleExpand}
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
  const [search, setSearch] = useState("");
  // Collect all parent category IDs that have children
  const allParentIds = useMemo(() => collectAllCategoryIds(categories), [categories]);

  // Expanded set: by default, start with main categories collapsed (or toggleable)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allExpanded = allParentIds.length > 0 && allParentIds.every((id) => expandedIds.has(id));

  const handleToggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(allParentIds));
    }
  };

  // Filter categories by search term if provided
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const query = search.toLowerCase().trim();

    function filterTree(list: Category[]): Category[] {
      const results: Category[] = [];
      for (const cat of list) {
        const matchesSelf =
          cat.name.toLowerCase().includes(query) || cat.slug.toLowerCase().includes(query);
        const filteredChildren = cat.children?.length ? filterTree(cat.children) : [];

        if (matchesSelf || filteredChildren.length > 0) {
          results.push({
            ...cat,
            children: filteredChildren,
          });
        }
      }
      return results;
    }

    return filterTree(categories);
  }, [categories, search]);

  // When searching, auto-expand all matched branches
  React.useEffect(() => {
    if (search.trim()) {
      setExpandedIds(new Set(collectAllCategoryIds(filteredCategories)));
    }
  }, [search, filteredCategories]);

  if (categories.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
        No categories yet. Create a main category, then add subcategories under it.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Top Controls Header: Instructions, Search & Expand/Collapse All */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <FolderTree className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-800">Category Hierarchy</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 hidden md:inline">
            Click any dropdown chevron or category name to view subcategories
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category..."
              className="h-8 pl-8 pr-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-36 sm:w-44 text-slate-800"
            />
          </div>

          {/* Expand All / Collapse All Toggle Button */}
          {allParentIds.length > 0 && (
            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories Tree Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/90 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 font-semibold">Name & Hierarchy</th>
              <th className="px-4 py-3 font-semibold hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 font-semibold">Products</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Subs</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <CategoryRows
              categories={filteredCategories}
              depth={0}
              expandedIds={expandedIds}
              onToggleExpand={handleToggleExpand}
              onEdit={onEdit}
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          </tbody>
        </table>
      </div>

      {filteredCategories.length === 0 && search.trim() && (
        <div className="p-8 text-center text-sm text-slate-500">
          No categories match &quot;{search}&quot;.
        </div>
      )}
    </div>
  );
}

import type { CatalogCategory, CatalogProduct } from "./types";

export const CATALOG_API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

async function catalogRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${CATALOG_API_BASE}${path}`, {
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    data?: T;
  };
  if (!response.ok) {
    throw new Error(payload.message || "Unable to load catalog");
  }
  return (payload.data ?? payload) as T;
}

export function fetchCategoryTree() {
  return catalogRequest<CatalogCategory[]>("/categories");
}

export function fetchCategoryBySlug(slug: string) {
  return catalogRequest<CatalogCategory>(`/categories/by-slug/${encodeURIComponent(slug)}`);
}

export function fetchProductsByCategory(categoryId?: string) {
  const suffix = categoryId ? `?category=${encodeURIComponent(categoryId)}` : "";
  return catalogRequest<CatalogProduct[]>(`/products${suffix}`);
}

export function fetchProductById(id: string) {
  return catalogRequest<CatalogProduct>(`/products/${encodeURIComponent(id)}`);
}

export async function fetchCategoryTreeSafe(): Promise<CatalogCategory[]> {
  try {
    return await fetchCategoryTree();
  } catch {
    return [];
  }
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogView from "@/components/ProductCatalogView";
import { fetchCategoryBySlug, fetchCategoryTreeSafe, fetchProductsByCategory } from "@/lib/catalog/api";
import { findFixedMenuBySlug, findFixedSiblings, toCatalogCategory } from "@/lib/catalog/headerMenu";
import { findCategoryBySlug, findSiblings } from "@/lib/catalog/tree";
import type { CatalogCategory } from "@/lib/catalog/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveCategory(slug: string, tree: CatalogCategory[]) {
  const norm = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const candidates = [slug];
  if (norm !== slug) candidates.push(norm);
  if (norm.startsWith("men-")) candidates.push("mens-" + norm.slice(4));
  if (norm.startsWith("mens-")) candidates.push("men-" + norm.slice(5));
  if (norm.startsWith("women-")) candidates.push("womens-" + norm.slice(6));
  if (norm.startsWith("womens-")) candidates.push("women-" + norm.slice(7));
  if (norm.startsWith("kid-")) candidates.push("kids-" + norm.slice(4));
  if (norm.startsWith("kids-")) candidates.push("kid-" + norm.slice(5));
  if (norm.startsWith("children-")) candidates.push("childrens-" + norm.slice(9));
  if (norm.startsWith("childrens-")) candidates.push("children-" + norm.slice(10));

  for (const candidate of candidates) {
    try {
      const found = await fetchCategoryBySlug(candidate);
      if (found) return found;
    } catch {
      // try next candidate
    }
  }
  return findCategoryBySlug(tree, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tree = await fetchCategoryTreeSafe();
  const category = await resolveCategory(slug, tree);
  const name = category?.name || findFixedMenuBySlug(slug)?.name || "Products";
  return {
    title: `${name} | Maya Exports Ltd — Global Fashion & Manufacturing`,
    description: category?.description || `Explore ${name} from Maya Exports.`,
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const tree = await fetchCategoryTreeSafe();
  const category = await resolveCategory(slug, tree);

  if (category) {
    const products = await fetchProductsByCategory(category.id).catch(() => []);
    return (
      <ProductCatalogView
        category={category}
        siblings={findSiblings(tree.length ? tree : [category], category)}
        products={products}
      />
    );
  }

  const fallback = findFixedMenuBySlug(slug);
  if (!fallback) notFound();
  return (
    <ProductCatalogView
      category={toCatalogCategory(fallback)}
      siblings={findFixedSiblings(slug).map(toCatalogCategory)}
      products={[]}
    />
  );
}

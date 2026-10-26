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
  try {
    return await fetchCategoryBySlug(slug);
  } catch {
    return findCategoryBySlug(tree, slug);
  }
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

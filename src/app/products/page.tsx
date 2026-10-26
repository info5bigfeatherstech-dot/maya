import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchCategoryTreeSafe } from "@/lib/catalog/api";
import ProductCatalogView from "@/components/ProductCatalogView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Export Product Catalog | Maya Exports Ltd — Global Fashion & Manufacturing",
  description: "Explore live export collections managed from the Maya Exports catalog.",
};

export default async function ProductsIndexPage() {
  const tree = await fetchCategoryTreeSafe();
  const first = tree[0];
  if (first) {
    redirect(`/products/${first.slug}`);
  }

  return (
    <ProductCatalogView
      category={{
        id: "empty",
        name: "Products",
        slug: "products",
        description: "Categories and products will appear here after they are added in admin.",
        parentId: null,
        path: "Products",
        depth: 0,
        productCount: 0,
        childCount: 0,
        children: [],
      }}
      siblings={[]}
      products={[]}
    />
  );
}

import { Metadata } from "next";
import ProductCatalogView from "@/components/ProductCatalogView";
import { getCatalogBySlug } from "@/data/productCatalog";

export const metadata: Metadata = {
  title: "Export Product Catalog | Maya Exports Ltd — Global Fashion & Manufacturing",
  description: "Explore our export collections: Men's Jackets, Sweat Tops, Hoodies, Shirts, Footwear, and custom OEM/ODM apparel.",
};

export default function ProductsIndexPage() {
  const defaultCatalog = getCatalogBySlug("mens-jackets");
  return <ProductCatalogView catalog={defaultCatalog} />;
}

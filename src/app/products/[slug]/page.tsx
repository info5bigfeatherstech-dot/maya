import { Metadata } from "next";
import ProductCatalogView from "@/components/ProductCatalogView";
import { getCatalogBySlug, productCatalogs } from "@/data/productCatalog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCatalogBySlug(slug);
  return {
    title: `${catalog.title} | Maya Exports Ltd — Global Fashion & Manufacturing`,
    description: catalog.description,
  };
}

export function generateStaticParams() {
  return Object.keys(productCatalogs).map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const catalog = getCatalogBySlug(slug);
  return <ProductCatalogView catalog={catalog} />;
}

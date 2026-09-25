import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/ProductDetailView";
import { getProductById, productCatalogs } from "@/data/productCatalog";

interface PageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, productId } = await params;
  const data = getProductById(slug, productId);
  if (!data) {
    return {
      title: "Product Not Found | Maya Exports Ltd",
    };
  }
  return {
    title: `${data.product.modelNo} - ${data.product.title} | Maya Exports Ltd`,
    description: data.product.description,
  };
}

export function generateStaticParams() {
  return Object.values(productCatalogs).flatMap((catalog) =>
    catalog.items.map((item) => ({
      slug: catalog.slug,
      productId: item.id,
    }))
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productId } = await params;
  const data = getProductById(slug, productId);

  if (!data) {
    notFound();
  }

  return <ProductDetailView product={data.product} catalog={data.catalog} />;
}

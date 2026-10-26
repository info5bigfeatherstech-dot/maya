import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/ProductDetailView";
import { fetchCategoryBySlug, fetchProductById, fetchProductsByCategory } from "@/lib/catalog/api";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  try {
    const product = await fetchProductById(productId);
    return {
      title: `${product.productCode} - ${product.title} | Maya Exports Ltd`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product Not Found | Maya Exports Ltd",
    };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productId } = await params;

  try {
    const [category, product] = await Promise.all([
      fetchCategoryBySlug(slug),
      fetchProductById(productId),
    ]);
    const related = (await fetchProductsByCategory(category.id)).filter((item) => item.id !== product.id);
    return <ProductDetailView product={product} category={category} related={related} />;
  } catch {
    notFound();
  }
}

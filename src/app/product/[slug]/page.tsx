// app/product/[slug]/page.tsx
import { fetchProductBySlug, fetchProducts } from "../../../../lib/sanity";
import ProductDetailClient from "@/components/ProductDetailClient";
import { Product } from "../../../../lib/sanity";

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product: Product | null = await fetchProductBySlug(slug);
  if (!product) return null;

  const products = await fetchProducts();
  const recommendations = products.filter((p) => p._id !== product._id);

  return (
    <ProductDetailClient
      product={product}
      recommendations={recommendations}
    />
  );
}

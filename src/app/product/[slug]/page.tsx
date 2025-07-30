import { fetchProductBySlug, fetchProducts } from "../../../../lib/sanity";
import ProductDetailClient from "@/components/ProductDetailClient";
import { Product } from "../../../../lib/sanity";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params; // ✅ wala nang await

  const product: Product | null = await fetchProductBySlug(slug);
  if (!product) return notFound(); // handle 404 properly

  const products = await fetchProducts();
  const recommendations = products.filter((p) => p._id !== product._id);

  return (
    <ProductDetailClient 
      product={product} 
      recommendations={recommendations} 
    />
  );
}

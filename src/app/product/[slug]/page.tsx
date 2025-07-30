// app/product/[slug]/page.tsx
import { fetchProductBySlug, fetchProducts, Product} from "../../../../lib/sanity";
import ProductDetailClient from "@/components/ProductDetailClient";

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params; // ✅ tanggalin ang await

  const product: Product | null = await fetchProductBySlug(slug);
  if (!product) return null; // or notFound()

  const products = await fetchProducts();
  const recommendations = products.filter((p) => p._id !== product._id);

  return (
    <ProductDetailClient
      product={product}
      recommendations={recommendations}
    />
  );
}
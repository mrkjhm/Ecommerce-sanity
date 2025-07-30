import { Product } from './sanity'

export function getDiscountedPrice(product: Product): number {
  if (!product.discount || product.discount <= 0) return product.price;

  const discounted = product.price - (product.price * (product.discount / 100));
  return Math.max(discounted, 0); // iwas negative
}

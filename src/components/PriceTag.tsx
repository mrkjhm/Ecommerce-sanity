'use client';
import React from 'react';
import { Product } from '../../lib/sanity';

interface PriceTagProps {
  product: Partial<Product>;
}

export default function PriceTag({ product }: PriceTagProps) {
  const discountValue = product.discount ?? 0;
  const basePrice = product.price ?? 0;

  // ✅ fallback compute if discountedPrice missing
  const discountedPrice =
    product.discountedPrice && product.discountedPrice > 0
      ? product.discountedPrice
      : discountValue > 0 && basePrice
      ? basePrice - (basePrice * discountValue) / 100
      : basePrice;

  console.log("PRICE TAG DEBUG:", {
    title: product.title,
    price: product.price,
    discount: discountValue,
    discountedPrice
  });

  return (
    <div className="mt-2">
      {product.title && <p className="text-lg font-semibold mb-1">{product.title}</p>}

      {discountValue > 0 ? (
        <div>
          <p className="text-red-600 font-bold text-xl">
            ₱{discountedPrice.toLocaleString()}
          </p>
          <p className="line-through text-gray-500 text-sm">
            ₱{basePrice.toLocaleString()}
          </p>
          <p className="text-green-600 text-sm">
            Save {discountValue}%!
          </p>
        </div>
      ) : (
        <p className="text-blue-600 font-bold text-xl">
          ₱{basePrice.toLocaleString()}
        </p>
      )}
    </div>
  );
}

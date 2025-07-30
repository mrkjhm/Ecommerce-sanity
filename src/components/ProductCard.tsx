'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor, Product } from '../../lib/sanity';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="my-10">
      <div className="border border-gray-300 flex flex-col p-4 h-[550px]">
        <Link href={`/product/${product.slug.current}`}>
          <p className="flex p-2  flex-none w-80 h-80 rounded-3xl mb-2 hover:scale-105 transition-all duration-300">
            {product.image?.[0]?.asset?.url && (
              <Image
                src={urlFor(product.image[0]).url()}
                alt={product.title}
                width={500}
                height={500}
                className="object-cover"
              />
            )}
          </p>
        </Link>

        <p className="text-xl font-semibold w-80 mb-2">{product.title}</p>

        {product.discount && product.discount > 0 ? (
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center'>
              <p className="text-red-600 font-bold text-lg">
                ₱{product.discountedPrice?.toLocaleString()}
              </p>
              <p className="line-through text-gray-500 text-sm">
                ₱{product.price.toLocaleString()}
              </p>
            </div>
            <p className="text-green-600 text-xs font-medium">
              Save {product.discount}%!
            </p>
          </div>
        ) : (
          <p className="text-blue-600 font-bold text-lg">
            ₱{product.price.toLocaleString()}
          </p>
        )}

        <AddToCartButton product={product} />
      </div>

    </div>
  );
}

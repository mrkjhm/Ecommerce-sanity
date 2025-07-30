'use client';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../lib/sanity';
import { Product } from '../../lib/sanity'; // best practice: import from /types
import { useStateContext } from '../../context/StateContext';
import { getDiscountedPrice } from '../../lib/discounthelper';

interface Props {
    products: Product[];

}

export default function ProductList({ products }: Props) {
    const { addToCart } = useStateContext();

    return (
        <section className="px-6 py-30 max-w-[1400px] mx-auto" id="product-list">
            <div className="mx-auto container flex flex-col w-full justify-between">
                <div className="text-center mb-10">
                    <h1 className="text-[clamp(2rem,10vw,4rem)] font-bold mb-3 text-center">
                        Best Seller Products
                    </h1>
                    <p>Speaker There are many variations passengers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-300">
                    {products.map((p) => {
                        const discounted = getDiscountedPrice(p);
                        return (
                            <div
                                key={p._id}
                                className="border border-gray-300 flex flex-col p-4 h-[550px]"
                            >
                                <Link href={`/product/${p.slug.current}`}>
                                    <div className="py-5  rounded-3xl mb-2 cursor-pointer hover:scale-105 transition-all duration-300">
                                        {p.image?.[0]?.asset?.url && (
                                            <Image
                                                src={urlFor(p.image[0]).url()}
                                                alt={p.title}
                                                width={500}
                                                height={500}
                                                className="w-full h-[250px] object-contain"
                                            />
                                            
                                        )}
                                    </div>
                                </Link>

                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <p className="text-lg font-semibold mb-2">{p.title}</p>
                                        {p.discount ? (
                                            <div className='relative'>
                                                <div className='flex gap-2 items-center'>
                                                <p className="text-red-600 font-bold text-xl">
                                                    ₱{discounted.toLocaleString()}
                                                </p>
                                                <p className="line-through text-gray-500 text-md">
                                                    ₱{p.price.toLocaleString()}
                                                </p>
                                                </div>
                                                <p className="text-green-600 text-xs font-medium">
                                                Save {p.discount}%!
                                                </p>
                                            </div>
                                            
                                        ) : (
                                            <p className="text-blue-600 font-bold text-xl">
                                                ₱{p.price.toLocaleString()}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            className="w-full bg-gray-500 py-3 hover:scale-105 duration-300 rounded-md text-white font-bold cursor-pointer"
                                            onClick={() => addToCart(p, 1)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

import { Product } from '../../lib/sanity';
import PriceTag from './PriceTag';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../lib/sanity';

interface Props {
    product: Product[];
}

export default function Carousel({ product }: Props) {
    return (
        <section className="px-6 py-12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.map((p) => (
                    <div key={p._id} className="border border-gray-300 p-4 rounded-lg">
                        <Link href={`/product/${p.slug.current}`}>
                            <Image
                                src={urlFor(p.image[0]).url()}
                                alt={p.title}
                                width={500}
                                height={500}
                                className="object-cover rounded-md"
                            />
                        </Link>
                        <p className="text-lg font-semibold mt-3">{p.title}</p>
                        {/* ✅ Shared PriceTag */}
                        <PriceTag product={p} />
                    </div>
                ))}
            </div>
        </section>
    );
}

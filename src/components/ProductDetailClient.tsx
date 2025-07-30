'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { urlFor, Product } from '../../lib/sanity'
import ImageGallery from './ImageGallery'
import ProductCard from './ProductCard'
import { useStateContext } from '../../context/StateContext'
import { getDiscountedPrice } from '../../lib/discounthelper'

interface Props {
    product: Product
    recommendations: Product[]
}

export default function ProductDetailClient({ product, recommendations }: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const { decQty, incQty, quantity, addToCart, setQuantity } = useStateContext()
    const [loading, setLoading] = useState(false)
    const discounted = getDiscountedPrice(product)

    const handleCheckout = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/xendit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: product.title,
                    email: 'juan@example.com', // make this dynamic later
                    amount: product.price * quantity,
                }),
            })

            const data = await res.json()

            if (res.ok && data.invoiceUrl) {
                await new Promise((res) => setTimeout(res, 300))
                window.location.href = data.invoiceUrl
            } else {
                alert(data.message || 'Something went wrong')
            }
        } catch (err) {
            console.error('Checkout error:', err)
            alert('Checkout failed')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
    setQuantity(1);
}, [product._id, setQuantity]);



    return (
        <div className="max-w-[1400px] mx-auto">
            {/* === Product Details === */}
            <div className="mx-10">
                <div className="flex md:flex-row flex-col gap-10 mt-10">
                    {/* Left Image */}
                    <div>
                        <div className="border border-gray-400  overflow-hidden">
                            <Image
                                src={urlFor(product.image[activeIndex]).url()}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="object-cover"
                            />
                        </div>

                        <div className="mt-6 flex">
                            <ImageGallery
                                images={product.image}
                                activeIndex={activeIndex}
                                onChange={setActiveIndex}
                            />
                        </div>
                    </div>

                    {/* Right Details */}
                    <div className="flex-1">
                        <h1 className="text-[clamp(2rem,4vw,15rem)] font-semibold">{product.title}</h1>
                        <div className="flex items-center mt-4 text-red-600">
                            {[...Array(4)].map((_, i) => (
                                <AiFillStar key={i} />
                            ))}
                            <AiOutlineStar />
                            <span className="ml-2">(20)</span>
                        </div>

                        <h4 className="mt-4 mb-2 font-medium">Details:</h4>
                        <p>{product.details}</p>

                        <div className="mt-4">
                            {product.discount && product.discount > 0 ? (
                                <div>
                                    <p className="text-red-600 font-bold text-2xl">
                                        ₱{discounted.toLocaleString()}
                                    </p>
                                    <p className="line-through text-gray-500 text-lg">
                                        ₱{product.price.toLocaleString()}
                                    </p>
                                    <p className="text-green-600 font-medium text-sm">
                                        Save {product.discount}%!
                                    </p>
                                </div>
                            ) : (
                                <p className="text-blue-600 font-bold text-2xl">
                                    ₱{product.price.toLocaleString()}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mt-6">
                            <button onClick={decQty} className="px-3 py-3 border cursor-pointer">
                                <AiOutlineMinus />
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button onClick={incQty} className="px-3 py-3 border cursor-pointer">
                                <AiOutlinePlus />
                            </button>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                className="w-[150px] px-5 py-2 border border-red-600 text-red-600 hover:bg-red-50 cursor-pointer"
                                onClick={() => addToCart(product, quantity)}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="w-[150px] px-5 py-2 bg-red-600 hover:bg-red-700 text-white hover:opacity-90 cursor-pointer"
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    `Buy Now`
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Recommendations === */}
            <section className="mt-20">
                <h2 className="text-center text-3xl font-bold mb-6">You may also like</h2>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div> */}
                <div className="marquee">
                    <div className="marquee-content">
                        <div className="marquee-track">
                            {recommendations.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                            {/* duplicate for seamless looping */}
                            {recommendations.map((p, i) => (
                                <ProductCard key={`${p._id}-dup-${i}`} product={p} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


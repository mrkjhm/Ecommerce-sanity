import React from 'react'
import { Product } from '../../lib/sanity'
import { useStateContext } from '../../context/StateContext'

interface Props {
    product: Product;
}

export default function AddToCartButton({ product }: Props) {
    
    const { addToCart } = useStateContext()

    return (
        <div className="mt-auto">
            <button
                className="w-full bg-gray-500 py-3 hover:scale-103 duration-300 rounded-md text-white font-bold cursor-pointer"
                onClick={() => addToCart(product, 1)}
            >
                Add to Cart
            </button>
        </div>
    )
}

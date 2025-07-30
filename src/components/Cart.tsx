'use client'

import React, { useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti';
import { motion, AnimatePresence } from 'framer-motion'

import { useStateContext } from '../../context/StateContext';
import { urlFor } from '../../lib/sanity'
import CheckoutButton from './CheckoutButton';
import { getDiscountedPrice } from '../../lib/discounthelper';

export default function Cart() {

    const cartRef = useRef<HTMLDivElement>(null);
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, removeItem } = useStateContext();


    return (
        <div ref={cartRef} className='w-full bg-black/50 fixed right-0 top-0 z-100' onClick={() => setShowCart(false)}>
            <AnimatePresence>
                <motion.div className='h-screen md:w-[600px] w-[430px] bg-white float-right py-[40px] px-[20px] relative'
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100% " }}
                    transition={{ type: "tween", duration: 0.4 }}
                    onClick={(e) => e.stopPropagation()}
                >

                    <motion.button type='button' onClick={() => setShowCart(false)} className='flex items-center gap-4'>
                        <AiOutlineLeft />
                        <span className='font-bold'>Your Cart</span>
                        <span className='text-red-500'>({totalQuantities} items)</span>
                    </motion.button>

                    {cartItems.length < 1 && (
                        <div className='m-10 text-center '>
                            <AiOutlineShopping size={150} className='mx-auto' />
                            <h3 className='font-[600] text-[20px]'>Your shopping bag is empty</h3>
                            <Link href='/#product-list'>
                                <button type='button' className='bg-gray-500 font-bold py-4 md:px-30 px-20 text-white rounded-2xl mt-10' onClick={() => setShowCart(false)}>
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className="scroll-container 3xl:max-h-[77vh] max-h-[70vh] scrollbar scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200 pr-2" style={{ pointerEvents: "auto" }}>
                        {cartItems.length >= 1 && cartItems.map((item) => {
                            const discounted = getDiscountedPrice(item);

                            return (
                                <div key={item._id} className="flex md:gap-[30px] gap-5 p-[20px]">
                                    <Image
                                        src={urlFor(item?.image[0]).url()}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                        className="w-[140px] h-[140px] p-2 rounded-2xl bg-white border border-gray-400"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div className="md:w-[300px] font-semibold">
                                                <h5 className="text-lg mb-1">{item.title}</h5>

                                                {item.discount && item.discount > 0 ? (
                                                    <div>
                                                        <div className='flex items-center gap-3'>

                                                        <p className="text-red-600 font-bold text-lg">
                                                            ₱{discounted.toLocaleString()}
                                                        </p>
                                                        <p className="line-through text-gray-500 text-sm">
                                                            ₱{item.price.toLocaleString()}
                                                        </p>
                                                        </div>
                                                        <p className="text-green-600 font-medium text-sm">
                                                            Save {item.discount}%!
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-blue-600 font-bold text-lg">
                                                        ₱{item.price.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                className="absolute right-10 text-[24px] text-red-600 cursor-pointer bg-transparent md:hidden flex"
                                                onClick={() => removeItem(item)}
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 mt-[20px]">
                                            <div>
                                                <button
                                                    className="px-3 py-3 border"
                                                    onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                                                >
                                                    <AiOutlineMinus />
                                                </button>
                                                <span className="px-4">{item.quantity}</span>
                                                <button
                                                    className="px-3 py-3 border"
                                                    onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                                                >
                                                    <AiOutlinePlus />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="text-[24px] text-red-600 cursor-pointer bg-transparent md:flex hidden"
                                                onClick={() => removeItem(item)}
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>


                    {cartItems.length >= 1 && (
                        <div className='absolute bottom-[12px] right-[5px] w-full py-[30px] px-[65px]'>
                            <div className='flex justify-between text-[22px] font-bold'>
                                <h3>Subtotal:</h3>
                                <h3>₱{totalPrice.toLocaleString()}</h3>
                            </div>
                            <div className='md:w-[400px] w-[300px] m-auto'>
                                {/* <button type='button' className='w-full max-w-[400px] py-[20px] px-[12px] rounded-[15px] border-none text-[20px] mt-[40px] uppercase bg-red-500 text-white cursor-pointer hover:scale-105 duration-300'>
                                    asds
                                </button> */}
                                <CheckoutButton />
                            </div>
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>
        </div>
    )
}

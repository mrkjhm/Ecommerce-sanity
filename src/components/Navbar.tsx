'use client'

import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../../context/StateContext'

export default function Navbar() {

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='max-w-[1400px] mx-auto'>


      <div className='flex justify-between my-[20px] mx-[18px] relative'>
        <p>
          <Link href='/' className='text-2xl font-bold'>Ecommerce Store</Link>
        </p>
        <div className='flex gap-5 items-center'>
          {/* <p>Account</p> */}

          <button type='button' className='text-[35px] text-gray-600 cursor-pointer relative' onClick={() => setShowCart(true)}>
            <AiOutlineShopping />
            <span className='absolute -right-[5px] text-[12px] bg-red-600 text-white w-[18px] h-[18px] text-center top-0 rounded-full'>{totalQuantities}</span>
          </button>

          {showCart && <Cart />}
        </div>
      </div>
    </div>
  )
}
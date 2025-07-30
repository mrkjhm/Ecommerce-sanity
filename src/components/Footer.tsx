import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiFillBehanceSquare } from 'react-icons/ai'

export default function Footer() {
  return (
    <div className='text-center mt-[20px] py-[30px] px-10px flex flex-col items-center gap-[10px] justify-center text-gray-500'>
      <p>2025 Ecommerce All right reserved</p>
      <p className='flex gap-[10px] text-[30px]'>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillBehanceSquare />
      </p>
    </div>
  )
}

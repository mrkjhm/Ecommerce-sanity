import React from 'react';
import { urlFor, Banner } from '../../lib/sanity';
import Link from 'next/link';
import Image from 'next/image';


// MOVED IN SANITY.TS
// type Banner = {
//   _id: string
//   smallText: string
//   midText: string
//   largeText1: string
//   largeText2: string
//   buttonText: string
//   product: { slug: { current: string } } | string
//   discount: string
//   desc: string
//   saleTime: string
//   image: { asset: { url: string } }
// }


interface Props {
  heroBanner: Banner[]
}

export default function FooterBanner({ heroBanner }: Props) {

  const footer_banner = heroBanner[0] || null;
  const imgUrl = urlFor(footer_banner.image).url()
  const productSlug =
    typeof footer_banner.product === 'string'
      ? footer_banner.product
      : footer_banner.product.slug.current

  return (
    <div className=' bg-gray-400'>
      <div className='relative py-[100px] px-[40px] rounded-3xl text-white max-w-[1400px] mx-auto'>
        <div className=' md:flex justify-between'>
          <div>
            <p className='mt-5 text-[30px] font-bold'>{footer_banner.discount}</p>
            <h3 className="text-[clamp(2rem,5vw,15rem)]  font-bold text-white">{footer_banner.largeText1}</h3>
            <h3 className="text-[clamp(2rem,4vw,15rem)] font-bold text-white mb-3">{footer_banner.largeText2}</h3>
            <p className='w-[270px]'>{footer_banner.desc}</p>
            {/* <p className='mt-5 text-[20px]'>{footer_banner.saleTime}</p> */}
          </div>
          <div className='flex flex-col justify-center space-y-3'>
            <p>{footer_banner.smallText}</p>
            <h3 className="text-[clamp(2rem,4vw,2rem)] font-bold w-[250px]">{footer_banner.midText}</h3>
            <Link href={`/product/${productSlug}`}>
              <button type='button' className="px-6 py-3 bg-white text-gray-500 rounded-lg font-bold cursor-pointer hover:scale-103 duration-300" >{footer_banner.buttonText}</button>
            </Link>
          </div>

          <div className="absolute md:bottom-0 bottom-10 left-1/2 md:-translate-x-1/2 pointer-events-none">

            <Image
              src={imgUrl}
              alt={footer_banner.midText}
              width={550}
              height={450}
              className="object-cover"
            />

          </div>
        </div>
      </div>

    </div>
  )
}

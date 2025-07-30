// src/components/HeroBanner.tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

import '../../src/app/globals.css'

type Banner = {
  _id: string
  smallText: string
  midText: string
  largeText1: string
  largeText2: string
  buttonText: string
  product: { slug: { current: string } } | string
  desc: string
  image: { asset: { url: string } }
}

type Props = {
  heroBanner: Banner[]
}

export default async function HeroBanner({ heroBanner }: Props) {

  const hero_Banner = heroBanner[1] || null

  const imgUrl = urlFor(hero_Banner.image).url()


  const productSlug =
    typeof hero_Banner.product === 'string'
      ? hero_Banner.product
      : hero_Banner.product.slug.current


  return (
    <div className="relative bg-gray-400 py-[100px]">
      <div className=' px-[40px] max-w-[1400px] mx-auto'>
        <div>
          <p className="text-sm uppercase text-gray-500 font-semibold mb-2">{hero_Banner.smallText}</p>
          <h3 className="text-[clamp(2rem,10vw,4rem)] font-bold mb-2 text-red-800">{hero_Banner.midText}</h3>
          <h1 className="text-[clamp(2rem,10vw,15rem)] lg:-ml-3 -mt-3 font-bold text-gray-600 mb-2">{hero_Banner.largeText1}</h1>
          <h1 className="text-[clamp(2rem,10vw,7rem)] lg:-ml-3 -mt-3 font-bold text-white mb-10">{hero_Banner.largeText2}</h1>
        </div>

        <div className="flex lg:flex-row flex-col w-full lg:justify-between justify-start">
            <Link href={`/product/${productSlug}`}>
              <button className="px-6 py-3 bg-red-800 font-bold text-white rounded-lg mb-5">
                {hero_Banner.buttonText}
              </button>
            </Link>
            <div className=" lg:text-end  flex flex-col lg:justify-end justify-start  bottom-[5%] right-[5%]">
              <p className="font-semibold uppercase">Description</p>
              <p className="lg:max-w-xl lg:mx-auto text-gray-700 mb-8 w-[200px]">{hero_Banner.desc}</p>
            </div>

          </div>
        

      </div>


      <div className="absolute  lg:top-0 md:top-30 sm:top-50 top-70 w-1/2 3xl:right-[5%] lg:right-[10%] md:right-[10%] right-[5%]  items-center justify-center   pointer-events-none">

        <Image
          src={imgUrl}
          alt={hero_Banner.midText}
          width={650}
          height={450}
          className="object-cover"
        />
      </div>
    </div>
  )
}

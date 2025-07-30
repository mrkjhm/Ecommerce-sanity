export { default as Cart } from './Cart';
export { default as Footer } from './Footer';
export { default as FooterBanner } from './FooterBanner';
export { default as HeroBanner } from './HeroBanner';
export { default as Layout } from './Layout';
export { default as Navbar } from './Navbar';
export { default as Product } from './ProductList';


// import Image from 'next/image';
// import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

// import { sanityClient, urlFor, Product } from '../../../../lib/sanity';
// import { notFound } from 'next/navigation';
// import WindowSize from '@/components/WindowSize';
// import ProductCard from '@/components/ProductCard';
// import ImageGallery from '@/components/ImageGallery';


// export default async function ProductPage({ params }: { params: { slug: string } }) {
//   const product = await sanityClient.fetch<Product | null>(
//     `*[_type == "product" && slug.current == $slug][0]`,
//     { slug: params.slug }
//   )

//   if (!product) {
//     notFound()
//   }

//   const products = await sanityClient.fetch<Product[]>(`
//     *[_type=="product"]{
//       _id,
//       title,
//       slug{current},
//       price,
//       details,
//       image[]{asset->}
//     }
//   `)

//   const otherProducts = products.filter((product) => product.slug.current !== params.slug)


//   return (
//     <>

//       <div>
//         <div className="flex gap-[40px] mt-[60px] m-[40px]">
//           {product.image?.[0]?.asset && (
//             <Image
//               src={urlFor(product.image[0]).url()}
//               alt={product.title}
//               width={600}
//               height={400}
//               className="rounded-[15px] bg-[#ebebeb]"
//             />
//           )}
//           <div>
//             <h1 className="text-[clamp(2rem,3vw,15rem)] font-semibold">{product.title}</h1>
//             <div className='flex items-center gap-2 mt-[15px]'>
//               <div className='flex'>
//                 <AiFillStar />
//                 <AiFillStar />
//                 <AiFillStar />
//                 <AiFillStar />
//                 <AiOutlineStar />
//               </div>
//               <p>
//                 (20)
//               </p>
//             </div>
//             <h4 className='mt-[15px]'>Details:</h4>
//             <p>{product.details}</p>
//             <p className='font-bold text-[26px] mt-[30px] text-red-500'>${product.price}</p>
//             <div className='flex gap-[20px] items-center mt-[10px]'>
//               <h3>Quantity</h3>
//               <p className='flex w-29 border items-center'>
//                 <span className='text-[16px] py-[6px] px-[12px] cursor-pointer border-r'><AiOutlineMinus /></span>
//                 <span className='text-[16px] py-[6px] px-[12px] cursor-pointer border-r'>0</span>
//                 <span className='text-[16px] py-[6px] px-[12px] cursor-pointer'><AiOutlinePlus /></span>
//               </p>
//             </div>
//             <div className='flex gap-[20px]'>
//               <button type='button' className='py-[10px] px-[20px] border border-red-500 mt-[40px] text-[18px] bg-white text-red-500 cursor-pointer w-[150px] hover:scale-105 duration-100'>Add to Cart</button>
//               <button type='button' className='py-[10px] px-[20px] bg-red-500 mt-[40px] text-[18px] text-white cursor-pointer w-[150px] hover:scale-105 duration-100'>Buy Now</button>
//             </div>
//           </div>
//         </div>
//         <ImageGallery images={product.image} />
//         <div className='mt-[150px]'>
//           <h2 className='text-center text-3xl font-bold'>You may also like</h2>
//           <div className='marquee'>
//             <div className='flex gap-[10px] my-10 marquee-content'>
//               {otherProducts.map((p) => (
//                 <ProductCard key={p._id} product={p} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import {
//     AiOutlineMinus,
//     AiOutlinePlus,
//     AiFillStar,
//     AiOutlineStar,
// } from 'react-icons/ai'
// import { urlFor, Product } from '../../lib/sanity'
// import ImageGallery from './ImageGallery'
// import ProductCard from './ProductCard'

// interface Props {
//     product: Product
//     recommendations: Product[]
// }

// export default function ProductDetailClient({ product, recommendations }: Props) {
//     // Lifted state for the "large" image index
//     const [activeIndex, setActiveIndex] = useState(0)

//     return (
//         <div className="mx-10">
//             {/* — Two‑column layout: Big image + Details — */}
//             <div className="flex gap-10 mt-10">
//                 {/* Left: large image */}
//                 <div className="w-[600px]">
//                     <Image
//                         src={urlFor(product.image[activeIndex]).url()}
//                         alt={product.title}
//                         width={600}
//                         height={400}
//                         className="object-cover rounded-[15px] bg-[#ebebeb]"
//                     />
//                 </div>

//                 {/* Right: details panel */}
//                 <div className="flex-1">
//                     <h1 className="text-[clamp(2rem,3vw,15rem)] font-semibold">
//                         {product.title}
//                     </h1>

//                     <div className="flex items-center mt-4 text-red-600">
//                         {[...Array(4)].map((_, i) => (
//                             <AiFillStar key={i} />
//                         ))}
//                         <AiOutlineStar />
//                         <span className="ml-2">(20)</span>
//                     </div>

//                     <h4 className="mt-4 mb-2 font-medium">Details:</h4>
//                     <p>{product.details}</p>

//                     <p className="mt-4 text-red-600 font-bold text-xl">
//                         ${product.price}
//                     </p>

//                     <div className="flex items-center gap-4 mt-6">
//                         <button
//                             onClick={() => { }}
//                             className="px-3 py-1 border"
//                         >
//                             <AiOutlineMinus />
//                         </button>
//                         <span className="px-4">1</span>
//                         <button
//                             onClick={() => { }}
//                             className="px-3 py-1 border"
//                         >
//                             <AiOutlinePlus />
//                         </button>
//                     </div>

//                     <div className="flex gap-4 mt-6">
//                         <button className="px-10 py-2 border border-red-600 text-red-600 hover:bg-red-50">
//                             Add to Cart
//                         </button>
//                         <button className="px- py-2 bg-red-600 text-white hover:opacity-90">
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* — Thumbnail strip (hover changes activeIndex) — */}
//             <div className="mt-6">
//                 <ImageGallery
//                     images={product.image}
//                     activeIndex={activeIndex}
//                     onChange={setActiveIndex}
//                 />
//             </div>

//             {/* — Recommendations carousel — */}
//             <section className="mt-20">
//                 <h2 className="text-center text-3xl font-bold mb-6">
//                     You may also like
//                 </h2>
//                 <div className="marquee overflow-hidden">
//                     <div className="marquee-content flex gap-4 whitespace-nowrap">
//                         {recommendations.map((p) => (
//                             <ProductCard key={p._id} product={p} />
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

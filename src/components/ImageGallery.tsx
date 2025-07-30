'use client'

import Image from 'next/image'
import { urlFor, Product } from '../../lib/sanity'

interface Props {
  images: Product['image']
  activeIndex: number
  onChange: (idx: number) => void
}

export default function ImageGallery({ images, activeIndex, onChange }: Props) {
  if (!images?.length) return null

  return (
    <div className="flex gap-4">
      {images.map((img, idx) => (
        <div
          key={idx}
          onMouseEnter={() => onChange(idx)}
          className={`
            p-4 overflow-hidden rounded-lg cursor-pointer
            ${idx === activeIndex ? 'bg-white border border-gray-800' : 'border border-gray-200'}
          `}
        >
          <Image
            src={urlFor(img).width(100).height(100).url()}
            alt={`Thumbnail ${idx + 1}`}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

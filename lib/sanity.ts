import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"

export const sanityClient = createClient({
  projectId: "xbhuedtr",
  dataset: "production",
  apiVersion: "2025-07-23",
  useCdn: true,
  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: { asset: { _ref?: string; url?: string } }) =>
  builder.image(source);



export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  discount: number;   
  discountedPrice: number; 
  details: string;
  image: { asset: { _id: string; url: string } }[];
}



export interface CartItem extends Product {
    quantity: number;
}

export interface Banner {
  _id: string
  smallText: string
  midText: string
  largeText1: string
  largeText2: string
  buttonText: string
  product: { slug: { current: string } } | string
  discount: string
  desc: string
  saleTime: string
  image: { asset: { url: string } }
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: {
    asset: {
      _ref?: string;
      _type?: string;
      url?: string; // populated if asset is resolved or you use urlFor()
    };
  };
  createdAt?: string; // ISO date string from Sanity datetime
  isVerified: boolean;
  role: 'customer' | 'admin';
}

export async function fetchProducts() {
  return sanityClient.fetch<Product[]>(`
    *[_type == "product"]{
      _id,
      title,
      slug { current },
      price,
      "discount": coalesce(discount, 0),
      "discountedPrice": price - (price * coalesce(discount, 0) / 100),
      details,
      image[]{ asset-> }
    }
  `);
}

export async function fetchProductBySlug(slug: string) {
  return sanityClient.fetch<Product>(`
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      slug { current },
      price,
      "discount": coalesce(discount, 0),
      "discountedPrice": price - (price * coalesce(discount, 0) / 100),
      details,
      image[]{ asset-> }
    }
  `, { slug });
}


export interface ProductMinimal {
  _id: string;
  title: string;
  price: number;
  discount: number;
  discountedPrice: number;
}

import './globals.css'
import { FooterBanner } from '@/components'
import HeroBanner from '@/components/HeroBanner'
import ProductList from '@/components/ProductList'
import LenisProvider from "@/components/LenisProvider";
import { sanityClient, fetchProducts } from '../../lib/sanity';


export default async function Home() {

const products = await fetchProducts();



    const bannerData = await sanityClient.fetch(`*[_type == "banner"]{
            _id,
            smallText,
            midText,
            largeText1,
            largeText2,
            buttonText,
            product, 
            desc,
            discount,
            saleTime,
            image{ asset-> }
        }`
    )



    return (
        <div>
            <LenisProvider>
                <HeroBanner heroBanner={bannerData} />
                <ProductList products={products} />
            </LenisProvider>
            <FooterBanner heroBanner={bannerData} />
        </div>
    )
}

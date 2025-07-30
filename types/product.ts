export interface Product {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    discount?: number;
    discountedPrice?: number;
    details: string;
    image: { asset: { _id: string; url: string } }[];
}

export interface CartItem extends Product {
    quantity: number;
}

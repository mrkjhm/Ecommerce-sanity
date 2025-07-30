"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";
import { Product as SanityProduct } from "../lib/sanity";
import { getDiscountedPrice } from "../lib/discounthelper";

interface CartItem extends SanityProduct {
    quantity: number;
}

interface StateContextType {
    showCart: boolean;
    cartItems: CartItem[];
    totalPrice: number;
    totalQuantities: number;
    quantity: number;
    incQty: () => void;
    decQty: () => void;
    setQuantity: (qty: number) => void; // ✅ added
    setShowCart: (value: boolean) => void;
    setCartItems: (items: CartItem[]) => void;
    setTotalPrice: (price: number) => void;
    setTotalQuantities: (quantity: number) => void;
    addToCart: (product: SanityProduct, quantity: number) => void;
    toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
    removeItem: (product: SanityProduct | CartItem) => void;
}

const Context = createContext<StateContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: ReactNode }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Auto recalc totals
    useEffect(() => {
        const total = cartItems.reduce(
            (acc, item) => acc + getDiscountedPrice(item) * item.quantity,
            0
        );
        setTotalPrice(total);

        const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQuantities(totalQty);
    }, [cartItems]);

    const addToCart = (product: SanityProduct, qty: number) => {
        if (qty <= 0) return;
        const existing = cartItems.find((item) => item._id === product._id);
        let updatedCart: CartItem[];

        if (existing) {
            updatedCart = cartItems.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + qty }
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity: qty }];
        }

        setCartItems(updatedCart);
        toast.success(`${product.title} added.`);
    };

    const removeItem = (product: SanityProduct | CartItem) => {
        setCartItems(cartItems.filter((item) => item._id !== product._id));
    };

    const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: value === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const incQty = () => setQuantity((prev) => prev + 1);
    const decQty = () => setQuantity((prev) => Math.max(1, prev - 1));

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                quantity,
                incQty,
                decQty,
                setQuantity, // ✅ expose setter
                setShowCart,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                addToCart,
                toggleCartItemQuantity,
                removeItem,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = (): StateContextType => {
    const context = useContext(Context);
    if (!context) throw new Error("useStateContext must be used within a StateContext provider");
    return context;
};

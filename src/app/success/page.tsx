'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { useStateContext } from '../../../context/StateContext';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
    const router = useRouter();
    const [seconds, setSeconds] = useState(5); // countdown timer

    useEffect(() => {
        // Clear cart when success page loads
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);

        // Countdown interval
        const countdown = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    router.push('/#product-list'); // redirect when timer hits 0
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [router, setCartItems, setTotalPrice, setTotalQuantities]);

    return (
        <div className="flex flex-col items-center justify-center h-[650px]">
            <div className="flex flex-col items-center justify-center">
                <p className="text-[100px]">🎉</p>
                <h1 className="text-4xl font-bold text-green-600 mb-4"> Payment Successful!</h1>
            </div>
            <p className="text-lg mb-6">
                Thank you for your order. Redirecting in <span className="font-bold">{seconds}</span> seconds...
            </p>
            <Link href="/#product-list">
                <p className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    Continue Shopping
                </p>
            </Link>
        </div>
    );
}

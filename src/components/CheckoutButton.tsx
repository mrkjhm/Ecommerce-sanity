// CheckoutButton.tsx
"use client";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";

export default function CheckoutButton() {
    const { totalPrice, cartItems } = useStateContext();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/xendit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: cartItems[0]?.title || "Order", // Or "Cart Order"
                    email: "juan@example.com", // 💡 TODO: Replace this with actual user input
                    amount: totalPrice,
                }),
            });

            const data = await res.json();
            console.log("API Response:", data);


            if (res.ok && data.invoiceUrl) {
                await new Promise((resolve) => setTimeout(resolve, 300)); // show spinner
                window.location.href = data.invoiceUrl;
                return; // ✅ prevent further execution
            } else {
                alert(data.message || "Something went wrong");
                setLoading(false); 
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Checkout failed");
        } 
        // finally {
        //     setLoading(false);
        // }
    };

    return (
        <button onClick={handleCheckout} disabled={loading} className='w-full max-w-[400px] py-[20px] px-[12px] rounded-[15px] border-none text-[20px] mt-[40px] uppercase bg-gray-500 text-white font-bold cursor-pointer hover:scale-105 duration-300'>
            {loading ?
                <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
                :
                "CHECKOUT"}
        </button>
    );
}

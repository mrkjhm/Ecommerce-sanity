import { NextResponse } from "next/server";
import { invoiceClient } from "../../../../lib/xendit"; // Adjust as needed

export async function POST(req: Request) {
    try {
        const { name, email, amount } = await req.json();

        if (!name || !email || !amount) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const createdInvoice = await invoiceClient.createInvoice({
            data: {
                externalId: `invoice-${Date.now()}`,
                payerEmail: email,
                description: `Payment for ${name}`,
                amount,
                successRedirectUrl: "https://ecommerce-sanity-xandit.vercel.app/success",
            },
        });

        return NextResponse.json(createdInvoice, { status: 201 });
    } catch (err: unknown) {
        const error = err as { message?: string };
        console.error("Xendit error:", error);
        return NextResponse.json(
            {
                message: "Failed to create invoice",
                error: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
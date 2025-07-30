import { sanityClient } from "../../../../../lib/sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const { name, email, avatar } = await req.json()

        if (!name || !email) {
            return NextResponse.json({
                message: "Missing name or email"
            }, {
                status: 400
            })
        }

        const existingUser = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email }
        )

        if (existingUser) {
            return NextResponse.json({
                message: "Email already registered"
            }, {
                status: 409
            })
        }

        const newUser = await sanityClient.create({
            _type: "user",
            name,
            email,
            avatar,
            isVerified: false,
            role: "customer",
            createdAt: new Date().toString()
        })

        return NextResponse.json({ user: newUser }, { status: 201 })

    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        })
    }
}
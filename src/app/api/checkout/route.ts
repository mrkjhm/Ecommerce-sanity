import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const session = await stripe.checkout.sessions.create({
            line_items: body.items,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
        })

        return NextResponse.json({ sessionUrl: session.url })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Stripe checkout error' }, { status: 500 })
    }
}

import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(req: NextRequest) {
  try {
    const { priceId, circuitId, circuitName } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: circuitName || "Premium Circuit Template",
              description: `Access to premium circuit template ${circuitId || ""}`,
            },
            unit_amount: 1500, // $15.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/circuit-templates/${circuitId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/circuit-templates/${circuitId}?canceled=true`,
      metadata: {
        circuitId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}

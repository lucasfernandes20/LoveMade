import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          quantity: 1,
          price: process.env.NEXT_PUBLIC_ROMANTIC_STRIPE_PRICE_ID,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"],
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

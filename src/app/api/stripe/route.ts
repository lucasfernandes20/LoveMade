import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
  const body = await request.json();
  const { plan } = body;

  const priceIdMap: Record<string, string | undefined> = {
    romantic: process.env.NEXT_PUBLIC_STRIPE_ROMANTIC_PLAN_ID,
    surprise: process.env.NEXT_PUBLIC_STRIPE_SURPRISE_PLAN_ID,
  };

  const selectedPriceId = priceIdMap[plan];

  if (!selectedPriceId) {
    return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          quantity: 1,
          price: selectedPriceId,
        },
      ],
      mode: "payment",
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

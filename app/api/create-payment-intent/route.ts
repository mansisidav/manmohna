"use server";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount < 50) {
      return NextResponse.json({ error: "Amount must be at least 50 paise" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in paise
      currency: "inr",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

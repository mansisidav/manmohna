"use client";

import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

export default function PaymentPage() {
  const params = useSearchParams();
  const amount = params ? parseInt(params.get("amount") || "0", 10) : 0;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {amount < 50 ? (
        <p className="text-red-500">Amount too small for payment</p>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
}

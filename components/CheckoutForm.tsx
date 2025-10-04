"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, FormEvent } from "react";

interface CheckoutFormProps {
  amount: number; // in paise
}

export default function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/api/create-payment-intent", { amount });
      const clientSecret = res.data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        setSuccess("Payment successful!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Processing..." : `Pay ₹${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

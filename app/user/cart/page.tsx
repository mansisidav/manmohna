"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // ✅ Calculate subtotal directly from cart
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity 
    ,0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-4 rounded"
              >
                {/* ✅ Product name links to details page */}
                <div>
                  <Link
                    href={`/product/${item._id}`}
                    className="font-semibold hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p>Qty: {item.quantity}</p>
                </div>

                <div className="text-right">
                  <p>₹{item.price * item.quantity}</p>
                  <button
                    className="text-red-500 text-sm mt-2"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Subtotal */}
          <div className="mt-6 border-t pt-4 flex justify-between">
            <p className="font-bold">Subtotal:</p>
            <p className="font-bold">₹{subtotal}</p>
          </div>
        </>
      )}
    </div>
  );
}

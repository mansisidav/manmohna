"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createOrder } from "../../../services/order";

export default function CheckoutPage() {
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  });
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({ shippingAddress: address, products: [], totalPrice: 0 });
      toast.success("Order placed successfully");
      router.push("/user/home");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleCheckout} className="flex flex-col gap-2">
        <input name="address" placeholder="Address" value={address.address} onChange={handleChange} className="p-2 border rounded" required />
        <input name="city" placeholder="City" value={address.city} onChange={handleChange} className="p-2 border rounded" required />
        <input name="state" placeholder="State" value={address.state} onChange={handleChange} className="p-2 border rounded" required />
        <input name="country" placeholder="Country" value={address.country} onChange={handleChange} className="p-2 border rounded" required />
        <input name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Place Order</button>
      </form>
    </div>
  );
}

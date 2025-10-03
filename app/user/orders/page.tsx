"use client";

import { useEffect, useState } from "react";
import { getOrders, Order } from "@/services/api";
import Header from "@/components/Header";
import { toast } from "react-hot-toast";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("User not logged in");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders(token);
        // ✅ ensure data is array
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">No orders found.</p>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 shadow bg-white"
            >
              <div className="flex justify-between mb-2">
                <p>
                  <span className="font-bold">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-bold">Status:</span>{" "}
                  <span
                    className={`${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-bold`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="mb-2">
                <p>
                  <span className="font-bold">Total Amount:</span> ₹
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-bold">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Products:</h3>
                <ul className="list-disc list-inside">
                  {order.products.map((p) => (
                    <li key={p.productId}>
                      {p.name ? p.name : p.productId} x {p.quantity} = ₹
                      {p.price * p.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

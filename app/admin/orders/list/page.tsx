"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../../../services/order";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function OrdersList() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    toast.success("Order status updated");
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user.name}</td>
              <td>{o.status}</td>
              <td>{o.totalPrice}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <Link href={`/admin/orders/detail/${o._id}`} className="ml-2 text-blue-600">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

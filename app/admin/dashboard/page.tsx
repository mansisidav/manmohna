"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/products/list" className="p-4 bg-yellow-200 rounded shadow hover:bg-yellow-300">
          Manage Products
        </Link>
        <Link href="/admin/categories/list" className="p-4 bg-green-200 rounded shadow hover:bg-green-300">
          Manage Categories
        </Link>
        <Link href="/admin/orders/list" className="p-4 bg-blue-200 rounded shadow hover:bg-blue-300">
          View Orders
        </Link>
        <Link href="/admin/users/list" className="p-4 bg-pink-200 rounded shadow hover:bg-pink-300">
          View Users
        </Link>
      </div>
    </div>
  );
}

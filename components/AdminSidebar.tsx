"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminLoggedIn } from "@/utils/auth";

export default function AdminSidebar() {
  const router = useRouter();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push("/admin/login");
    }
  }, [router]);

  // Render sidebar always (avoid conditional based on localStorage directly)
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-2"><a href="/admin/products">Products</a></li>
        <li className="mb-2"><a href="/admin/categories">Categories</a></li>
        <li className="mb-2"><a href="/admin/orders">Orders</a></li>
        <li className="mb-2"><a href="/admin/users">Users</a></li>
      </ul>
    </aside>
  );
}

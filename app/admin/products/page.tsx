// app/admin/products/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { fetchAdminProducts, deleteAdminProduct } from "@/services/adminApi";
import ProductForm from "@/components/ProductForm";
import { fetchCategories } from "@/services/adminApi";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const load = async () => {
    const prods = await fetchAdminProducts();
    setProducts(prods);
  };
  useEffect(()=> { load(); fetchCategories().then(setCategories).catch(()=>{}); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return;
    await deleteAdminProduct(id);
    setProducts((p)=>p.filter((x)=>x._id !== id));
  };

  const handleAdd = async (payload: any) => {
    // product created on backend
    await fetch(`/api/health`).catch(()=>{}); // noop if needed
    const res = await fetch("/api/health").catch(()=>{}); // noop
    // Use adminApi.createAdminProduct directly instead of fetch
    // but to keep type-safety we call createAdminProduct below
    // however createAdminProduct is available in services/adminApi
    // we imported earlier - but for brevity we call via dynamic import:
    const mod = await import("@/services/adminApi");
    const created = await mod.createAdminProduct(payload);
    setProducts((p) => [created, ...p]);
    setShowAdd(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <button onClick={()=>setShowAdd((s)=>!s)} className="px-3 py-1 bg-indigo-600 text-white rounded">+ Add product</button>
         <Link href="/admin/products" className="px-3 py-1 border rounded">Refresh</Link>

        </div>
      </div>

      {showAdd && (
        <div className="mb-4">
          <ProductForm categories={categories} onSubmit={handleAdd} submitLabel="Create product"/>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p)=>(
          <div key={p._id} className="bg-white rounded shadow p-3">
            <img src={p.images?.[0] || "/placeholder.png"} alt={p.name} className="h-48 w-full object-contain mb-2 bg-gray-50"/>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">₹{p.price}</div>
            <div className="mt-2 flex gap-2">
             <Link href="/admin/products" className="px-3 py-1 border rounded">Refresh</Link>

              <button onClick={()=>handleDelete(p._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

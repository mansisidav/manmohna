// app/admin/products/[id]/edit/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAdminProduct, updateAdminProduct, fetchCategories } from "@/services/adminApi";
import { Product, Category } from "@/types";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (id) {
      fetchAdminProduct(id).then(setProduct).catch(console.error);
      fetchCategories().then(setCategories).catch(console.error);
    }
  }, [id]);

  const handleUpdate = async (payload: Partial<Product>) => {
    if (!id) return;
    const updated = await updateAdminProduct(id, payload);
    setProduct(updated);
    router.push("/admin/products");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
      <ProductForm product={product} categories={categories} onSubmit={handleUpdate} submitLabel="Update"/>
    </div>
  );
}

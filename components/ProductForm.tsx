// components/ProductForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Category, Product } from "@/types";

type Props = {
  product?: Partial<Product>;
  categories?: Category[];
  onSubmit: (payload: Partial<Product>) => Promise<void>;
  submitLabel?: string;
};

export default function ProductForm({ product = {}, categories = [], onSubmit, submitLabel = "Save" }: Props) {
  const [name, setName] = useState(product.name ?? "");
  const [shortDescription, setShortDescription] = useState(product.shortDescription ?? "");
  const [longDescription, setLongDescription] = useState(product.longDescription ?? "");
  const [price, setPrice] = useState(product.price ?? 0);
  const [discountPrice, setDiscountPrice] = useState(product.discountPrice ?? undefined);
  const [sku, setSku] = useState(product.sku ?? "");
  const [stock, setStock] = useState(product.stock ?? 0);
  const [category, setCategory] = useState<string | undefined>(typeof product.category === "string" ? product.category : (product.category as any)?._id);
  const [images, setImages] = useState<string[]>(product.images ?? []);
  const [loading, setLoading] = useState(false);

  const handleAddImage = () => {
    setImages((s) => [...s, ""]);
  };

  const handleImageChange = (idx: number, value: string) => {
    setImages((s) => s.map((v, i) => (i === idx ? value : v)));
  };

  const handleRemoveImage = (idx: number) => {
    setImages((s) => s.filter((_, i) => i !== idx));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: Partial<Product> = {
        name,
        shotDescription,
        longDescription,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        sku,
        stock: Number(stock),
        category,
        images: images.filter(Boolean)
      };
      await onSubmit(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input required value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded"/>
      </div>

      <div>
        <label className="block text-sm">Short Description</label>
        <input value={shotDescription} onChange={(e)=>setshotDescription(e.target.value)} className="w-full p-2 border rounded"/>
      </div>

      <div>
        <label className="block text-sm">Long Description</label>
        <textarea value={longDescription} onChange={(e)=>setLongDescription(e.target.value)} className="w-full p-2 border rounded"/>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm">Price</label>
          <input type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} className="w-full p-2 border rounded"/>
        </div>
        <div>
          <label className="block text-sm">Discount Price</label>
          <input type="number" value={discountPrice ?? ""} onChange={(e)=>setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)} className="w-full p-2 border rounded"/>
        </div>
        <div>
          <label className="block text-sm">Stock</label>
          <input type="number" value={stock} onChange={(e)=>setStock(Number(e.target.value))} className="w-full p-2 border rounded"/>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">SKU</label>
          <input value={sku} onChange={(e)=>setSku(e.target.value)} className="w-full p-2 border rounded"/>
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full p-2 border rounded">
            <option value="">-- Select --</option>
            {categories.map((c)=> <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Images (URLs)</label>
        <div className="space-y-2">
          {images.map((img, idx) => (
            <div key={idx} className="flex gap-2">
              <input value={img} onChange={(e)=>handleImageChange(idx, e.target.value)} className="flex-1 p-2 border rounded" placeholder="https://..." />
              <button type="button" onClick={()=>handleRemoveImage(idx)} className="px-2 bg-red-50 rounded">Remove</button>
            </div>
          ))}
          <div>
            <button type="button" onClick={handleAddImage} className="px-3 py-1 bg-indigo-50 rounded">Add image field</button>
          </div>
        </div>
      </div>

      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? "Saving..." : submitLabel}</button>
      </div>
    </form>
  );
}

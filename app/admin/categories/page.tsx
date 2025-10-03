// app/admin/categories/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@/types";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "@/services/adminApi";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");

  const load = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const created = await createCategory(newName);
    setCategories((prev)=>[created, ...prev]);
    setNewName("");
  };

  const handleToggleActive = async (c: Category) => {
    const updated = await updateCategory(c._id, { active: !c.active });
    setCategories((prev)=>prev.map((x)=>x._id===c._id ? updated : x));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete category?")) return;
    await deleteCategory(id);
    setCategories((prev)=>prev.filter((c)=>c._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input className="border p-2 flex-1 rounded" value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder="New category name"/>
        <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">+ Add</button>
      </form>

      <div className="bg-white rounded shadow divide-y">
        {categories.map((c)=>(
          <div key={c._id} className="flex items-center justify-between p-2">
            <span>{c.name}</span>
            <div className="flex gap-2">
              <button onClick={()=>handleToggleActive(c)} className="px-2 py-1 border rounded">{c.active ? "Deactivate" : "Activate"}</button>
              <button onClick={()=>handleDelete(c._id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

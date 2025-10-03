"use client";

import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../../../services/category";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    toast.success("Category deleted");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/add" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Category
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.active ? "Yes" : "No"}</td>
              <td>
                <Link href={`/admin/categories/edit/${c._id}`} className="mr-2 text-blue-600">
                  Edit
                </Link>
                <button onClick={() => handleDelete(c._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

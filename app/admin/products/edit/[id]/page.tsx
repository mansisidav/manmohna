"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { fetchProduct, fetchCategories, updateProduct, Product, Category } from "@/services/api";
import { toast } from "react-hot-toast";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  // Dynamic id from URL
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken") || "";

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        toast.error("Invalid product ID");
        return;
      }
      try {
        // Fetch categories
        const cats = await fetchCategories();
        setCategories(cats);

        // Fetch product by ID
        const prod = await fetchProduct(id);
        setProduct(prod);

        // Populate form
        setName(prod.name);
        setDescription(prod.description);
        setLongDescription(prod.longDescription || "");
        setPrice(prod.price);
        setDiscountPrice(prod.discountPrice);
        setCategory(prod.category || "");
        setSku(prod.sku || "");
        setStock(prod.stock || 0);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product or categories");
      }
    };
    loadData();
  }, [id]);

  const handleUpdate = async () => {
    if (!product || !id) return;

    try {
      setLoading(true);
      await updateProduct(
        id,
        { name, description, longDescription, price, discountPrice, category, sku, stock },
        token
      );
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short Description"
            className="border p-2 rounded"
          />

          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Long Description"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={discountPrice || ""}
            onChange={(e) => setDiscountPrice(Number(e.target.value))}
            placeholder="Discount Price"
            className="border p-2 rounded"
          />

          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="SKU"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stock"
            className="border p-2 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </>
  );
}

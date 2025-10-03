import { API } from "./api";
import axios from "axios";
// import { Product } from "@/types";

export interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  category?: string;
  sku?: string;
  stock?: number;
  isActive?: boolean;
}
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API_BASE}/products`);
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`${API_BASE}/products/${id}`);
  return res.data;
};

export const addProduct = async (product: Partial<Product>) => {
  const res = await API.post("/products", product);
  return res.data;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const res = await API.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API_BASE}/products`);
  return res.data;
};
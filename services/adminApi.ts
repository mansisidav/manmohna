// services/adminApi.ts
import axios from "axios";
import { Product, Category } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to get admin auth token headers
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* Admin Auth */
export const adminLogin = async (email: string, password: string) => {
  const res = await axios.post(`${API_BASE}/admin/login`, { email, password });
  return res.data; // expects { token, isAdmin, ... }
};

/* Products */
export const fetchAdminProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API_BASE}/products`, { headers: getAuthHeaders() });
  return res.data;
};

export const createAdminProduct = async (payload: Partial<Product>) => {
  const res = await axios.post(`${API_BASE}/products`, payload, { headers: getAuthHeaders() });
  return res.data;
};

export const updateAdminProduct = async (id: string, payload: Partial<Product>) => {
  const res = await axios.put(`${API_BASE}/products/${id}`, payload, { headers: getAuthHeaders() });
  return res.data;
};

export const deleteAdminProduct = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/products/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

/* Categories */
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(`${API_BASE}/categories`, { headers: getAuthHeaders() });
  return res.data;
};

export const createCategory = async (name: string) => {
  const res = await axios.post(`${API_BASE}/categories`, { name }, { headers: getAuthHeaders() });
  return res.data;
};

export const updateCategory = async (id: string, payload: Partial<Category>) => {
  const res = await axios.put(`${API_BASE}/categories/${id}`, payload, { headers: getAuthHeaders() });
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/categories/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

/* Admin stats (optional) */
export const fetchAdminStats = async () => {
  const res = await axios.get(`${API_BASE}/admin/stats`, { headers: getAuthHeaders() });
  return res.data;
};

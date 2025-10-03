import axios from "axios";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  token?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
}
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const userLogin = async (email: string, password: string): Promise<User> => {
  try {
    const res = await API.post<User>("/user/login", { email, password });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
// Get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
  return { Authorization: `Bearer ${token}` };
};

// ----------------------
// Fetch user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await axios.get<UserProfile>(`${API_BASE}/auth/profile`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
// services/auth.ts
import axios from "axios";
import { API } from "./api";

// ----------------------
// Types
// ----------------------
export interface User {
  name: string;
  email: string;
  password?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

// ----------------------
// Base API URL
// ----------------------
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ----------------------
// Helper: Auth headers
// ----------------------
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token"); // user token
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ----------------------
// Auth APIs
// ----------------------
export const registerUser = async (user: User): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>("/auth/register", user);
  return res.data;
};

export const loginUser = async (user: { email: string; password: string }): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>("/auth/login", user);
  return res.data;
};
// ----------------------
// User profile APIs
// ----------------------
export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await axios.get<UserProfile>(`${API_BASE}/auth/profile`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
export const updateUserProfile = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  const res = await axios.put<UserProfile>(`${API_BASE}/auth/profile`, userData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

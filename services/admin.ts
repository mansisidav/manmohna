// project-root/services/admin.ts
import { API } from "./api";

export interface AdminLogin {
  email: string;
  password: string;
}

export const adminLogin = async (data: AdminLogin) => {
  const res = await API.post("/admin/login", data);
  return res.data;
};

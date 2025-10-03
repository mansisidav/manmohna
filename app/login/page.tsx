"use client";

import { useState } from "react";
import { loginUser } from "../../services/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ email, password });
      localStorage.setItem("token", token);
      toast.success("Login successful");
      router.push("/user/home");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">User Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

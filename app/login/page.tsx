"use client";

import { useState, useEffect } from "react";
import { loginUser } from "../../services/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { auth, googleProvider } from "@/firebaseConfig"; // make sure googleProvider is exported
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/user/home");
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await loginUser({ email, password });
      localStorage.setItem("token", token);
      toast.success("Login successful");
      router.push("/user/home");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Send user info to backend to create or login account
      const { token } = await loginUser({ email: user.email!, name: user.displayName });
      localStorage.setItem("token", token);
      toast.success("Google login successful");
      router.push("/user/home");
    } catch (error: any) {
      console.error(error);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <form onSubmit={handleLogin} className="p-6 border rounded shadow-md w-96 flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-2">User Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="w-96 bg-red-500 text-white p-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
        disabled={loading}
      >
        <FcGoogle size={20} />
        {loading ? "Signing in..." : "Login with Google"}
      </button>
    </div>
  );
}

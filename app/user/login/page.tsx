"use client";
import { useState } from "react";
import axios from "axios";
import { auth, googleProvider } from "@/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation"; // ✅ Next.js 15+ useRouter for App Router

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter(); // ✅ router for navigation

  // 🚀 Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: user.email,
        name: user.displayName,
      });

      alert("✅ Google Login successful!");
      router.push("/"); // ✅ redirect to home
    } catch (err) {
      console.error(err);
      alert("❌ Google login failed!");
    }
  };

  // ✉️ Manual Email Login
  const handleEmailLogin = async () => {
    if (!email) return alert("Please enter your email");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        name,
      });

      alert("✅ Login success!");
      router.push("/"); // ✅ redirect to home
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-2xl font-semibold">Login</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <button
        onClick={handleEmailLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-64"
      >
        Login / Signup with Email
      </button>

      <p className="my-2 text-gray-600">or</p>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 bg-white border px-4 py-2 rounded w-64 shadow hover:bg-gray-100"
      >
        <FcGoogle size={22} /> Login with Google
      </button>
    </div>
  );
}

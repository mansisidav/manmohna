// frontend/app/user/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "@/services/auth";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Profile</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
}

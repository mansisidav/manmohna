// app/admin/users/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    }).then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="bg-white rounded shadow divide-y">
        {users.map(u=>(
          <div key={u._id} className="flex justify-between p-2">
            <div>
              <div className="font-semibold">{u.name}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
            </div>
            <span className="text-sm">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

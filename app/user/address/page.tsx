"use client";
import { useEffect, useState } from "react";
import { getAddresses, addAddress, Address } from "@/services/api";
import Header from "@/components/Header";
import { toast } from "react-hot-toast";

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("userToken");
    setToken(t || "");

    const load = async () => {
      if (t) {
        try {
          const data = await getAddresses(t);
          setAddresses(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!token) return;
    try {
      await addAddress({ street, city }, token);
      toast.success("Address Added");

      const data = await getAddresses(token);
      setAddresses(data);

      setStreet("");
      setCity("");
    } catch (err) {
      toast.error("Error adding address");
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>

        <div className="space-y-2 mb-4">
          {addresses.map((a) => (
            <div key={a._id} className="border p-2 rounded">
              {a.street}, {a.city}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 max-w-md">
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Add Address
          </button>
        </div>
      </div>
    </>
  );
}

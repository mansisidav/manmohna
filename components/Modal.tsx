"use client";

import { ReactNode } from "react";

export default function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <button onClick={onClose} className="text-red-500 float-right">X</button>
        {children}
      </div>
    </div>
  );
}

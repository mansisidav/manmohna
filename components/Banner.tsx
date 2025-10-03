// components/Header.tsx
"use client";

import { useEffect, useState } from "react";

const images = [
    "https://t3.ftcdn.net/jpg/06/32/90/44/360_F_632904407_iPLi90WdjZ0oKAeRiL98gEIeHIUtzWae.jpg",
    "https://img.pikbest.com/backgrounds/20181218/vector-e-commerce-shopping-creative-banner-background_1850123.jpg!sw800",
 
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative w-full p-10 h-96 md:h-[600px] overflow-hidden rounded-lg">
      
        <div className="relative w-full rounded-lg h-full overflow-hidden bg-gradient-to-r from-primary via-semiprimary to-primary p-8 md:p-12">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Welcome to Our Store</h1>
        <p className="text-lg md:text-xl text-white/90 mb-6 text-pretty">
          Discover amazing products with spiritual essence
        </p>
        <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
          Shop Now
        </button>
      </div>
      {/* Decorative element */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
    </div>
    
      {/* {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Banner ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

     
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div> */}

    </div>
  );
}

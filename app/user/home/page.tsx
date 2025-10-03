"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "../../../services/product";
import ProductCard from "../../../components/ProductCard";
import Banner from "@/components/Banner";
import ReviewsPage from "@/components/Reviews";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("All")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Product[] = await getProducts()
        setProducts(data)
        setFilteredProducts(data)

        // Extract unique categories + add "All"
        const uniqueCategories = Array.from(
          new Set(data.map((p) => (p.category && p.category.name ? p.category.name : "Uncategorized"))),
        )
        setCategories(["All", ...uniqueCategories]) // ✅ Add All at start
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchData()
  }, [])

  const handleFilter = (category: string) => {
    setActiveCategory(category)
    if (category === "All") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => (p.category?.name || "Uncategorized") === category))
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-6 ">
          
     <Banner></Banner>
          {/* Main content */}
          <div className="relative max-w-[1800px]  p-6 w-full px-40 mx-auto flex flex-col gap-8">
           
            {/* Category Filter Buttons */}
            <div className="flex gap-4  mb-6 flex-wrap ">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-4 py-2 rounded-md border ${
                    activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
    
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
              ) : (
                <p>No products found</p>
              )}
            </div>
            <ReviewsPage/>
          </div>
        </div>
  );
}

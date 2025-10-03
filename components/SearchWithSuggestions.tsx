"use client"

import { useEffect, useState } from "react"
import { fetchProducts, type Product } from "@/services/product"
import { Search, X, Loader2 } from "lucide-react"

export default function SearchWithSuggestions() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setFiltered(data)
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered(products)
      setIsOpen(false)
    } else {
      const results = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      setFiltered(results)
      setIsOpen(true)
    }
  }, [query, products])

  const clearSearch = () => {
    setQuery("")
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search spiritual products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full h-12 pl-12 pr-12 bg-card border-2 border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border-2 border-border rounded-lg shadow-lg p-8 flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-accent" />
          <span className="ml-2 text-muted-foreground">Loading products...</span>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && !isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border-2 border-border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {filtered.length > 0 ? (
            <ul className="py-2">
              {filtered.map((p) => (
                <li
                  key={p._id}
                  className="px-4 py-3 hover:bg-accent/10 cursor-pointer transition-colors duration-150 flex items-center gap-3 group"
                >
                  {p.images && (
                    <img
                      src={p.images || "/placeholder.svg"}
                      alt={p.name}
                      className="w-12 h-12 rounded-md object-cover border border-border group-hover:border-accent transition-colors"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
                      {p.name}
                    </p>
                    {p.description && <p className="text-sm text-muted-foreground truncate">{p.description}</p>}
                  </div>
                  <span className="text-lg font-semibold text-accent whitespace-nowrap">₹{p.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <Search className="size-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground font-medium">No products found</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

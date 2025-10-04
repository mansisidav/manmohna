"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getProductById, type Product } from "@/services/product"
import { useCart } from "@/context/CartContext"
import { toast } from "react-hot-toast"

export default function ProductDetails() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const idParam = params.id
      if (!idParam) return

      const id = Array.isArray(idParam) ? idParam[0] : idParam

      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      }
    }
    fetch()
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast.success("Product added to cart")
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const finalPrice = hasDiscount ? product.discountPrice! : product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/20 border border-border/40 shadow-lg">
              <img
                src={product.images?.[0] || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {hasDiscount && (
              <div className="absolute top-6 right-6 bg-destructive text-destructive-foreground px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Category */}
            {product.category && (
              <div>
                <span className="inline-block text-xs font-semibold text-muted-foreground uppercase tracking-widest bg-secondary/50 px-4 py-2 rounded-full">
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              {product.name}
            </h1>

            {/* Description */}
            
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {product.longDescription || product.description || "No description available."}
            </p><p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {product.shotDescription || product.description || "No description available."}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-6 border-y border-border/50">
              <span className="text-5xl md:text-6xl font-bold text-foreground">₹{finalPrice.toLocaleString()}</span>
              {hasDiscount && (
                <span className="text-2xl md:text-3xl text-muted-foreground line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 10 ? (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">In Stock</p>
              ) : product.stock > 0 ? (
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Only {product.stock} left in stock
                </p>
              ) : (
                <p className="text-sm font-medium text-destructive">Out of Stock</p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-primary text-primary-foreground px-8 py-5 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* SKU */}
            {product.sku && <p className="text-xs text-muted-foreground font-mono">SKU: {product.sku}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

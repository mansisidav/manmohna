"use client"

import Link from "next/link"
import type { Product } from "../services/product"
// import { ShoppingCart, Eye } from "lucide-react"

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.images?.[0] || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs font-medium border border-border">
            Only {product.stock} left
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-lg font-semibold text-muted-foreground">Out of Stock</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-3">
          <Link
            href={`/user/products/${product._id}`}
            className="bg-card text-card-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0"
          >
            {/* <Eye className="w-4 h-4" /> */}
            Quick View
          </Link>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0">
            {/* <ShoppingCart className="w-4 h-4" /> */}
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {product.category.name || "Uncategorized"}
          </p>
        )}

        {/* Product Name */}
        <Link href={`/user/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-foreground">₹{product.discountPrice}</span>
                <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-foreground">₹{product.price}</span>
            )}
          </div>

          {/* SKU */}
          {product.sku && <span className="text-xs text-muted-foreground font-mono">SKU: {product.sku}</span>}
        </div>

        {/* View Details Link */}
        <Link
          href={`/user/products/${product._id}`}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
        >
          View Full Details
          <svg
            className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

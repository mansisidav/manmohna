"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.discountPrice ?? item.price) * item.quantity,
    0
  )

  const tax = subtotal * 0.18 // 18% tax
  const shipping = cart.length > 0 ? 50 : 0
  const total = subtotal + tax + shipping

  const amount = Math.max(Math.round(total * 100), 50) // convert ₹ → paise, minimum 50 paise

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-6xl text-center">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              href="/user/products"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.discountPrice ?? item.price
              const hasDiscount = item.discountPrice && item.discountPrice < item.price
              const imageUrl =
                Array.isArray(item.images) && item.images.length > 0
                  ? item.images[0]
                  : `/placeholder.svg?height=128&width=128&query=${encodeURIComponent(
                      item.name
                    )}`

              return (
                <div key={item._id} className="p-4 sm:p-6 border rounded-lg">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-2">
                        <Link
                          href={`/user/products/${item._id}`}
                          className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item._id, Math.max(1, item.quantity - 1))
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {hasDiscount && (
                            <p className="text-sm text-muted-foreground line-through">
                              ₹{item.price * item.quantity}
                            </p>
                          )}
                          <p className="text-lg font-bold">₹{itemPrice * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-6 sticky top-4 border rounded-lg">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">₹{shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
              </div>

              <Link
                href={`/user/payment?amount=${amount}`}
                className="w-full inline-flex justify-center items-center bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg shadow-md transition mb-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/user/products"
                className="w-full inline-block text-center bg-transparent border border-gray-300 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

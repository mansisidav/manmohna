"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, User, Home, LogOut, Menu, X } from "lucide-react"

export default function Header() {
  const [token, setToken] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 bg-secondary backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ManMohnaa
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {token ? (
              <>
                <Link
                  href="/user/home"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="/user/cart"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </Link>
                <Link
                  href="/user/profile"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link> <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-4 w-4" />
                  About
                </Link><Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-4 w-4" />
                 Contact
                </Link>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    localStorage.removeItem("token")
                    location.reload()
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              {token ? (
                <>
                  <Link
                    href="/user/home"
                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    href="/user/cart"
                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                  </Link>
                  <Link
                    href="/user/profile"
                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground w-full"
                    onClick={() => {
                      localStorage.removeItem("token")
                      location.reload()
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

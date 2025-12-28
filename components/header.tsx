"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  id: number
  label: string
  href: string
  sort_order: number
}

const defaultNavigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navigation, setNavigation] = useState(defaultNavigation)

  useEffect(() => {
    fetchNavigation()
  }, [])

  const fetchNavigation = async () => {
    try {
      const res = await fetch('/api/navigation')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        setNavigation(data.map((item: NavItem) => ({
          label: item.label,
          href: item.href
        })))
      }
    } catch (error) {
      console.log('Using default navigation')
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/fromnl-logo.png"
              alt="FromNL Logo"
              className="h-10 w-auto rounded"
            />
            <span className="text-xs text-primary">.pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <Globe className="w-4 h-4" />
              English
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
            
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Admin
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

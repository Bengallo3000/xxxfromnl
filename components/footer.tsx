"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Send, Mail } from "lucide-react"

export function Footer() {
  const pathname = usePathname()

  if (pathname === "/admin") {
    return null
  }

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-white">From</span>
              <span className="text-lg font-bold bg-gradient-to-b from-[#D64545] via-white to-[#1E4C8E] bg-clip-text text-transparent">NL</span>
              <span className="text-xs text-primary">.pro</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Best Dutch Premium Quality. Direct from the Netherlands.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Netherlands, EU</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary">»</span> Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary">»</span> Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary">»</span> Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:support@fromnl.pro" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FromNL.pro | All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

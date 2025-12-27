"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Admin", href: "/admin" },
  { name: "About", href: "/about" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-primary/30 bg-background/90 backdrop-blur-xl shadow-[0_0_30px_rgba(255,102,0,0.15)]">
      <div className="absolute top-0 left-0 right-0 h-1 dutch-stripe" />
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-dutch-orange to-dutch-red flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
              NL
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-tight leading-none font-bold">
                <span className="text-dutch-orange">From</span>
                <span className="text-dutch-blue">NL</span>
              </span>
              <span className="text-[10px] text-primary/60 tracking-wide">.pro</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm transition-all duration-300 font-medium group flex items-center gap-1",
                  pathname === item.href ? "text-dutch-orange" : "text-foreground hover:text-dutch-orange",
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-dutch-orange" />
                )}
              </Link>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      pathname === item.href ? "text-dutch-orange" : "text-foreground hover:text-dutch-orange",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

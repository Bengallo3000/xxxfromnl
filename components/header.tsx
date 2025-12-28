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

interface Banner {
  id: number
  name: string
  image_url: string
  link_url: string
  position: string
  size: string
  is_active: boolean
}

interface SiteSettings {
  [key: string]: string
}

const defaultNavigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navigation, setNavigation] = useState(defaultNavigation)
  const [headerBanners, setHeaderBanners] = useState<Banner[]>([])
  const [settings, setSettings] = useState<SiteSettings>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [navRes, bannerRes, settingsRes] = await Promise.all([
        fetch('/api/navigation'),
        fetch('/api/banners'),
        fetch('/api/settings')
      ])
      const navData = await navRes.json()
      const bannerData = await bannerRes.json()
      const settingsData = await settingsRes.json()
      
      if (Array.isArray(navData) && navData.length > 0) {
        setNavigation(navData.map((item: NavItem) => ({
          label: item.label,
          href: item.href
        })))
      }
      if (Array.isArray(bannerData)) {
        setHeaderBanners(bannerData.filter((b: Banner) => b.position === 'header' && b.is_active))
      }
      setSettings(settingsData)
    } catch (error) {
      console.log('Using default navigation')
    }
  }

  return (
    <>
      {headerBanners.length > 0 && (
        <div className="bg-background/50 border-b border-border">
          <div className="container mx-auto px-4 py-2 flex justify-center gap-4 overflow-x-auto">
            {headerBanners.map((banner) => (
              <a
                key={banner.id}
                href={banner.link_url || '#'}
                target={banner.link_url ? "_blank" : undefined}
                rel={banner.link_url ? "noopener noreferrer" : undefined}
                className="flex-shrink-0"
              >
                <img
                  src={banner.image_url}
                  alt={banner.name}
                  className={`object-contain ${
                    banner.size === 'small' ? 'h-12' :
                    banner.size === 'large' ? 'h-24' :
                    'h-16'
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      )}
      
      <header 
        className="sticky top-0 z-40 border-b border-border backdrop-blur"
        style={{ 
          backgroundColor: settings.header_bg_color ? `${settings.header_bg_color}f0` : 'rgba(10,10,10,0.95)',
          color: settings.header_text_color || '#ffffff'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src={settings.logo_url || "/fromnl-logo.png"}
                  alt="FromNL Logo"
                  className="h-10 w-auto rounded"
                />
                <span className="text-xs text-primary">.pro</span>
              </Link>
              <a href="https://theplug.u" target="_blank" rel="noopener noreferrer">
                <img
                  src="/theplug-member.png"
                  alt="ThePlug.u Member"
                  className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

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
    </>
  )
}

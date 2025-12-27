"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "@/components/language-switcher"

interface NavLink {
  id: string
  title: string
  slug: string
  url: string | null
  is_external: boolean
  is_visible: boolean
  sort_order: number
  is_page?: boolean
  content?: string
}

interface HeaderProps {
  cartCount?: number
  onCartClick?: () => void
}

const NAV_LINKS_KEY = "nav_links"
const SITE_SETTINGS_KEY = "site_settings"

interface SiteSettings {
  site_name: string
  logo_url: string | null
}

const HeaderNew = ({ cartCount = 0, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    console.log("[v0] Header mounting, loading nav links")
    loadNavLinks()
    loadSiteSettings()

    const handleStorageChange = () => {
      console.log("[v0] Storage changed, reloading nav links")
      loadNavLinks()
      loadSiteSettings()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const loadNavLinks = () => {
    const saved = localStorage.getItem(NAV_LINKS_KEY)
    console.log("[v0] Loading nav links from header:", saved)
    if (saved) {
      const links: NavLink[] = JSON.parse(saved)
      const visibleLinks = links.filter((l) => l.is_visible).sort((a, b) => a.sort_order - b.sort_order)
      console.log("[v0] Visible links:", visibleLinks)
      setNavLinks(visibleLinks)
    }
  }

  const loadSiteSettings = () => {
    const saved = localStorage.getItem(SITE_SETTINGS_KEY)
    if (saved) {
      const settings: SiteSettings = JSON.parse(saved)
      if (settings.logo_url) {
        setLogoUrl(settings.logo_url)
      }
    }
  }

  const renderNavItem = (item: NavLink) => {
    if (item.is_page) {
      return (
        <Link key={item.id} href={`/${item.slug}`}>
          <button className="relative px-4 py-2 text-sm text-foreground hover:text-dutch-orange transition-all duration-300 font-medium group flex items-center gap-1 cursor-pointer">
            <span className="relative z-10">{item.title}</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-dutch-orange group-hover:w-full transition-all duration-300 rounded-full" />
          </button>
        </Link>
      )
    }

    const url = item.url || `/${item.slug}`
    const isAnchor = url.startsWith("#")
    const isExternal = item.is_external || url.startsWith("http")

    const className =
      "relative px-4 py-2 text-sm text-foreground hover:text-dutch-orange transition-all duration-300 font-medium group flex items-center gap-1 cursor-pointer"

    if (isAnchor) {
      return (
        <a key={item.id} href={url} className={className}>
          <span className="relative z-10">{item.title}</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-dutch-orange group-hover:w-full transition-all duration-300 rounded-full" />
        </a>
      )
    }

    if (isExternal) {
      return (
        <a key={item.id} href={url} target="_blank" rel="noopener noreferrer" className={className}>
          <span className="relative z-10">{item.title}</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-dutch-orange group-hover:w-full transition-all duration-300 rounded-full" />
        </a>
      )
    }

    return (
      <Link key={item.id} href={url}>
        <button className={className}>
          <span className="relative z-10">{item.title}</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-dutch-orange group-hover:w-full transition-all duration-300 rounded-full" />
        </button>
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-dutch-orange/30 bg-background/90 backdrop-blur-xl shadow-[0_0_30px_rgba(255,102,0,0.15)]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dutch-red via-dutch-orange to-dutch-blue" />

      <div className="container mx-auto px-4 relative">
        <div className={`flex items-center justify-between h-16 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={logoUrl || "/fromnl-logo.png"}
              alt="FromNL Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,102,0,0.5)]"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-tight leading-none font-bold">
                <span className="text-dutch-orange drop-shadow-[0_0_10px_rgba(255,102,0,0.8)]">FROM</span>
                <span className="text-white">NL</span>
              </span>
              <span className="text-[10px] text-dutch-orange/60 tracking-wide">.pro</span>
            </div>
          </Link>

          <nav className={`hidden md:flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map((item) => renderNavItem(item))}
          </nav>

          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-dutch-orange/10 hover:text-dutch-orange transition-all"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-dutch-orange text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Button>

            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2 border-dutch-orange/30 hover:border-dutch-orange hover:bg-dutch-orange/5 hover:text-dutch-orange transition-all text-xs font-medium bg-transparent"
              >
                <Zap className="w-3 h-3" />
                {t.nav.admin}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-dutch-orange/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-dutch-orange" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dutch-orange/20 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <div key={item.id}>
                  {item.is_page ? (
                    <Link href={`/${item.slug}`} onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full text-left text-sm text-muted-foreground hover:text-dutch-orange transition-colors py-3 px-4 hover:bg-dutch-orange/5 rounded font-medium">
                        {item.title}
                      </button>
                    </Link>
                  ) : (
                    <a
                      href={item.url || `/${item.slug}`}
                      target={item.is_external ? "_blank" : undefined}
                      rel={item.is_external ? "noopener noreferrer" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm text-muted-foreground hover:text-dutch-orange transition-colors py-3 px-4 hover:bg-dutch-orange/5 rounded font-medium"
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 gap-2 border-dutch-orange/30 font-medium bg-transparent"
                >
                  <Zap className="w-3 h-3" />
                  {t.nav.admin}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default HeaderNew

"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "@/components/language-switcher"
import NavPopup from "@/components/nav-popup"

interface HeaderProps {
  cartCount?: number
  onCartClick?: () => void
}

interface NavLink {
  id: string
  title: string
  slug: string
  url: string | null
  is_external: boolean
  is_visible: boolean
  sort_order: number
}

interface PopupContent {
  [slug: string]: {
    title: string
    content: string
  }
}

interface SiteSettings {
  site_name: string
  logo_url: string | null
  og_image_url: string | null
}

const NAV_LINKS_KEY = "nav_links"
const SITE_SETTINGS_KEY = "site_settings"

const getDefaultNavLinks = (): NavLink[] => [
  { id: "1", title: "Home", slug: "home", url: "/", is_external: false, is_visible: true, sort_order: 0 },
  {
    id: "2",
    title: "Products",
    slug: "products",
    url: "#products",
    is_external: false,
    is_visible: true,
    sort_order: 1,
  },
  { id: "3", title: "Contact", slug: "contact", url: "#contact", is_external: false, is_visible: true, sort_order: 2 },
]

const HeaderNew = ({ cartCount = 0, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [popupContents, setPopupContents] = useState<PopupContent>({})
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    loadNavLinks()
    loadSiteSettings()
    loadPopupContents()

    const handleStorageChange = () => {
      loadNavLinks()
      loadSiteSettings()
      loadPopupContents()
    }
    window.addEventListener("storage", handleStorageChange)

    const handleSettingsUpdate = () => {
      loadSiteSettings()
    }
    window.addEventListener("site-settings-updated", handleSettingsUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("site-settings-updated", handleSettingsUpdate)
    }
  }, [])

  const loadNavLinks = () => {
    const saved = localStorage.getItem(NAV_LINKS_KEY)
    if (saved) {
      const links: NavLink[] = JSON.parse(saved)
      const visibleLinks = links.filter((l) => l.is_visible).sort((a, b) => a.sort_order - b.sort_order)
      setNavLinks(visibleLinks)
    } else {
      const defaults = getDefaultNavLinks()
      localStorage.setItem(NAV_LINKS_KEY, JSON.stringify(defaults))
      setNavLinks(defaults.filter((l) => l.is_visible))
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

  const loadPopupContents = () => {
    const saved = localStorage.getItem("nav_popup_contents")
    if (saved) {
      setPopupContents(JSON.parse(saved))
    }
  }

  const handleNavClick = (item: NavLink, isMobile = false) => {
    const popupData = popupContents[item.slug]
    if (popupData && popupData.content) {
      setActivePopup(item.slug)
      if (isMobile) setIsMenuOpen(false)
      return
    }
    if (isMobile) setIsMenuOpen(false)
  }

  const renderNavItem = (item: NavLink, isMobile = false) => {
    const url = item.url || `/${item.slug}`
    const isAnchor = url.startsWith("#")
    const isExternal = item.is_external || url.startsWith("http")
    const hasPopup = popupContents[item.slug]?.content

    const className = isMobile
      ? "text-sm text-muted-foreground hover:text-dutch-orange transition-colors py-3 px-4 hover:bg-dutch-orange/5 rounded font-medium flex items-center gap-2 cursor-pointer"
      : "relative px-4 py-2 text-sm text-foreground hover:text-dutch-orange transition-all duration-300 font-medium group flex items-center gap-1 cursor-pointer"

    const content = (
      <>
        <span className="relative z-10">{item.title}</span>
        {isExternal && !hasPopup && <ExternalLink className="w-3 h-3" />}
        {!isMobile && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-dutch-orange group-hover:w-full transition-all duration-300 rounded-full" />
        )}
      </>
    )

    if (hasPopup) {
      return (
        <button key={item.id} className={className} onClick={() => handleNavClick(item, isMobile)}>
          {content}
        </button>
      )
    }

    if (isAnchor) {
      return (
        <a key={item.id} href={url} className={className} onClick={() => isMobile && setIsMenuOpen(false)}>
          {content}
        </a>
      )
    }

    if (isExternal) {
      return (
        <a
          key={item.id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          {content}
        </a>
      )
    }

    return (
      <Link key={item.id} to={url} className={className} onClick={() => isMobile && setIsMenuOpen(false)}>
        {content}
      </Link>
    )
  }

  const currentPopup = activePopup ? popupContents[activePopup] : null

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-dutch-orange/30 bg-background/90 backdrop-blur-xl shadow-[0_0_30px_rgba(255,102,0,0.15)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dutch-red via-dutch-orange to-dutch-blue" />

        <div className="container mx-auto px-4 relative">
          <div className={`flex items-center justify-between h-16 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link to="/" className="flex items-center gap-3 group">
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

              <Link to="/admin">
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
                {navLinks.map((item) => renderNavItem(item, true))}
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
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

      {currentPopup && (
        <NavPopup
          isOpen={!!activePopup}
          onClose={() => setActivePopup(null)}
          title={currentPopup.title}
          content={currentPopup.content}
        />
      )}
    </>
  )
}

export default HeaderNew

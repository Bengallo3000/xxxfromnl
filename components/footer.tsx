"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Send, Mail, MessageCircle } from "lucide-react"

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

export function Footer() {
  const pathname = usePathname()
  const [footerBanners, setFooterBanners] = useState<Banner[]>([])
  const [settings, setSettings] = useState<SiteSettings>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [bannerRes, settingsRes] = await Promise.all([
        fetch('/api/banners'),
        fetch('/api/settings')
      ])
      const bannerData = await bannerRes.json()
      const settingsData = await settingsRes.json()
      
      if (Array.isArray(bannerData)) {
        setFooterBanners(bannerData.filter((b: Banner) => b.position === 'footer' && b.is_active))
      }
      setSettings(settingsData)
    } catch (error) {
      console.log('Error loading footer data')
    }
  }

  if (pathname === "/admin") {
    return null
  }

  return (
    <footer 
      className="border-t border-border"
      style={{ backgroundColor: settings.footer_bg_color || 'rgba(10,10,10,0.5)' }}
    >
      {footerBanners.length > 0 && (
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-wrap justify-center gap-4">
            {footerBanners.map((banner) => (
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
                    banner.size === 'leaderboard' ? 'h-16' :
                    banner.size === 'skyscraper' ? 'h-32' :
                    'h-16'
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-white">{settings.shop_name?.replace('NL', '') || 'From'}</span>
              <span className="text-lg font-bold bg-gradient-to-b from-[#FF1E1E] via-white to-[#0033CC] bg-clip-text text-transparent">NL</span>
              <span className="text-xs text-primary">.pro</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {settings.shop_slogan || "Best Dutch Premium Quality. Direct from the Netherlands."}
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
              {settings.messenger_id && (
                <li>
                  <a 
                    href={`https://m.me/${settings.messenger_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {settings.support_button_text || "Contact Support"}
                  </a>
                </li>
              )}
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.support_email || settings.contact_email || 'support@fromnl.pro'}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {settings.footer_text && (
          <div className="py-4 text-sm text-muted-foreground">
            {settings.footer_text}
          </div>
        )}

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{settings.copyright_text || `© ${new Date().getFullYear()} FromNL.pro | All rights reserved`}</p>
        </div>
      </div>
    </footer>
  )
}

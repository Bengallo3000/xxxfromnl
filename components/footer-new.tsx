"use client"

import { useState, useEffect } from "react"
import { Send, ExternalLink, MapPin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

interface SupportSettings {
  telegramId: string
  sessionId: string
}

const FooterNew = () => {
  const [settings, setSettings] = useState<SupportSettings>({ telegramId: "", sessionId: "" })
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    const saved = localStorage.getItem("support_settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  return (
    <footer
      id="contact"
      className="relative border-t border-dutch-orange/30 bg-background/95 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Orange stripe at top with glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dutch-orange via-dutch-red to-dutch-blue shadow-[0_0_20px_rgba(255,102,0,0.4)]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 ${isRTL ? "text-right" : "text-left"}`}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <img
                src="/fromnl-logo.png"
                alt="FromNL Logo"
                className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(255,102,0,0.5)]"
              />
              <div className="flex flex-col">
                <span className="font-display text-lg tracking-tight leading-none font-bold text-foreground">
                  FromNL
                </span>
                <span className="text-[10px] text-dutch-orange/60 tracking-wide">.pro</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 font-body leading-relaxed">
              Best Dutch Premium Quality. Direct from the Netherlands. 🇳🇱
            </p>
            <div
              className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? "flex-row-reverse justify-end" : ""}`}
            >
              <MapPin className="w-4 h-4 text-dutch-orange" />
              <span>Netherlands, EU</span>
            </div>
          </div>

          {/* Quick Links - Removed tools/software references */}
          <div>
            <h4
              className={`font-display text-sm text-foreground font-bold mb-5 flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
            >
              <span className="w-2 h-2 bg-dutch-orange rounded-full shadow-[0_0_10px_rgba(255,102,0,0.8)] animate-pulse" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: t.nav.home, href: "/" },
                { label: "Products", href: "#premium" },
                { label: "About", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      className={`text-sm text-muted-foreground hover:text-dutch-orange transition-colors font-body flex items-center gap-2 group ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-sm text-muted-foreground hover:text-dutch-orange transition-colors font-body flex items-center gap-2 group ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className={`font-display text-sm text-foreground font-bold mb-5 flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
            >
              <span className="w-2 h-2 bg-dutch-red rounded-full shadow-[0_0_10px_rgba(214,69,69,0.8)] animate-pulse" />
              Support
            </h4>
            <ul className="space-y-3">
              {["FAQ", "Contact", "Shipping", "Returns"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm text-muted-foreground hover:text-dutch-orange transition-colors font-body flex items-center gap-2 group ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`font-display text-sm text-foreground font-bold mb-5 flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
            >
              <span className="w-2 h-2 bg-dutch-blue rounded-full shadow-[0_0_10px_rgba(33,150,243,0.8)] animate-pulse" />
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href={settings.telegramId ? `https://t.me/${settings.telegramId}` : "https://t.me/your_bot"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between text-xs border-dutch-orange/30 hover:border-dutch-orange hover:bg-dutch-orange/5 hover:text-dutch-orange transition-all group bg-transparent"
                >
                  <span className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Send className="w-4 h-4 text-[#0088cc]" />
                    Telegram
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs border-dutch-red/30 hover:border-dutch-red hover:bg-dutch-red/5 hover:text-dutch-red transition-all group bg-transparent"
              >
                <span className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Mail className="w-4 h-4 text-dutch-red" />
                  Email Support
                </span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-dutch-orange/20 mt-12 pt-8">
          <div
            className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}
          >
            <p className="text-xs text-muted-foreground font-body">
              © {new Date().getFullYear()} FromNL.pro | {t.footer.rights}
            </p>
            <div
              className={`flex items-center gap-3 text-xs text-muted-foreground font-body ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dutch-orange opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-dutch-orange" />
                </span>
                Online
              </div>
              <span className="text-dutch-orange/30">|</span>
              <span>🇳🇱 FromNL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterNew

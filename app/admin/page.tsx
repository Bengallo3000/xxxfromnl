"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Terminal,
  Key,
  NavigationIcon,
  SettingsIcon,
  ImageIcon,
  Package,
  Tag,
  FileText,
  ImagePlus,
  LayoutTemplate,
  MessageSquare,
  Bitcoin,
  TrendingUp,
  Shield,
  Sparkles,
  MessageCircle,
  Plus,
  LogOut,
  Save,
} from "lucide-react"
import AdminCaptcha from "@/components/admin-captcha"
import CryptoSettingsTab from "@/components/crypto-settings-tab"
import NavigationTab from "@/components/navigation-tab"
import SiteSettingsTab from "@/components/site-settings-tab"
import ImageUploadTab from "@/components/image-upload-tab"
import PopupContentsTab from "@/components/popup-contents-tab"
import TelegramSettingsTab from "@/components/telegram-settings-tab"
import type { CryptoWallet } from "@/components/checkout-modal"

type NavItem = {
  id: string
  label: string
  path: string
  order: number
  visible: boolean
}

type TabType =
  | "navigation"
  | "settings"
  | "images"
  | "products"
  | "categories"
  | "pages"
  | "banners"
  | "header-footer"
  | "support"
  | "crypto"
  | "sales"
  | "spam-bot"
  | "bot-config"
  | "special-bot"
  | "popups"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("navigation")
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [pendingAuth, setPendingAuth] = useState(false)

  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "1", label: "Home", path: "/", order: 0, visible: true },
    { id: "2", label: "Products", path: "#products", order: 1, visible: true },
    { id: "3", label: "Contact", path: "#contact", order: 2, visible: true },
  ])

  const [newLinkLabel, setNewLinkLabel] = useState("")
  const [newLinkPath, setNewLinkPath] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [editPath, setEditPath] = useState("")

  const [siteName, setSiteName] = useState("FROMNL.PRO")
  const [telegramId, setTelegramId] = useState("your_telegram_id")
  const [sessionId, setSessionId] = useState("05abc123...")
  const [cryptoWallets, setCryptoWallets] = useState({
    btc: { address: "", qr: "" },
    xmr: { address: "", qr: "" },
    ltc: { address: "", qr: "" },
    trx: { address: "", qr: "" },
  })
  const [selectedFolder, setSelectedFolder] = useState("uploads")
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [pages, setPages] = useState<any[]>([])
  const [banners, setBanners] = useState<any[]>([])
  const [headerFooterBanners, setHeaderFooterBanners] = useState<any[]>([])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin") {
      setPendingAuth(true)
      setShowCaptcha(true)
    }
  }

  const handleCaptchaVerified = () => {
    setShowCaptcha(false)
    setIsAuthenticated(true)
    setPendingAuth(false)
  }

  const handleCaptchaCancel = () => {
    setShowCaptcha(false)
    setPendingAuth(false)
    setPassword("")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  const handleAddLink = () => {
    if (newLinkLabel && newLinkPath) {
      const newItem: NavItem = {
        id: Date.now().toString(),
        label: newLinkLabel,
        path: newLinkPath,
        order: navItems.length,
        visible: true,
      }
      setNavItems([...navItems, newItem])
      setNewLinkLabel("")
      setNewLinkPath("")
    }
  }

  const handleDeleteLink = (id: string) => {
    setNavItems(navItems.filter((item) => item.id !== id))
  }

  const handleToggleVisibility = (id: string) => {
    setNavItems(navItems.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)))
  }

  const handleEditLink = (id: string) => {
    const item = navItems.find((item) => item.id === id)
    if (item) {
      setEditingId(id)
      setEditLabel(item.label)
      setEditPath(item.path)
    }
  }

  const handleSaveEdit = () => {
    if (editingId) {
      setNavItems(
        navItems.map((item) => (item.id === editingId ? { ...item, label: editLabel, path: editPath } : item)),
      )
      setEditingId(null)
      setEditLabel("")
      setEditPath("")
    }
  }

  const handleChangePassword = () => {
    if (newPassword) {
      console.log("[v0] Password changed to:", newPassword)
      setNewPassword("")
      setShowChangePassword(false)
      alert("Password changed successfully!")
    }
  }

  const tabs = [
    { id: "navigation", label: "Navigation", icon: NavigationIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Tag },
    { id: "pages", label: "Pages", icon: FileText },
    { id: "banners", label: "Banners", icon: ImagePlus },
    { id: "header-footer", label: "Header/Footer", icon: LayoutTemplate },
    { id: "support", label: "Support", icon: MessageSquare },
    { id: "crypto", label: "Crypto", icon: Bitcoin },
    { id: "sales", label: "Sales", icon: TrendingUp },
    { id: "spam-bot", label: "Spam Bot", icon: Shield },
    { id: "bot-config", label: "Bot Config", icon: SettingsIcon },
    { id: "special-bot", label: "Special Bot", icon: Sparkles },
    { id: "popups", label: "Popups", icon: MessageCircle },
  ]

  if (showCaptcha) {
    return <AdminCaptcha onVerified={handleCaptchaVerified} onCancel={handleCaptchaCancel} />
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative bg-background">
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
        <div className="flex items-center justify-center py-20 relative z-10">
          <Card className="w-full max-w-md p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Terminal className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-display text-primary">ADMIN PANEL</h1>
              <p className="text-muted-foreground mt-2">Enter password to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="font-mono">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="font-mono"
                />
              </div>
              <Button type="submit" className="w-full font-mono">
                <Key className="w-4 h-4 mr-2" />
                LOGIN
              </Button>
            </form>
          </Card>
        </div>
      </div>
    )
  }

  const convertToWalletFormat = (): CryptoWallet[] => {
    return [
      { id: "btc", name: "Bitcoin", symbol: "BTC", address: cryptoWallets.btc.address, qrCode: cryptoWallets.btc.qr },
      { id: "xmr", name: "Monero", symbol: "XMR", address: cryptoWallets.xmr.address, qrCode: cryptoWallets.xmr.qr },
      { id: "ltc", name: "Litecoin", symbol: "LTC", address: cryptoWallets.ltc.address, qrCode: cryptoWallets.ltc.qr },
      { id: "trx", name: "TRON", symbol: "TRX", address: cryptoWallets.trx.address, qrCode: cryptoWallets.trx.qr },
    ]
  }

  const handleCryptoSave = (wallets: CryptoWallet[]) => {
    const btc = wallets.find((w) => w.symbol === "BTC")
    const xmr = wallets.find((w) => w.symbol === "XMR")
    const ltc = wallets.find((w) => w.symbol === "LTC")
    const trx = wallets.find((w) => w.symbol === "TRX")

    setCryptoWallets({
      btc: { address: btc?.address || "", qr: btc?.qrCode || "" },
      xmr: { address: xmr?.address || "", qr: xmr?.qrCode || "" },
      ltc: { address: ltc?.address || "", qr: ltc?.qrCode || "" },
      trx: { address: trx?.address || "", qr: trx?.qrCode || "" },
    })

    localStorage.setItem("crypto_wallets", JSON.stringify(wallets))
  }

  const handleSupportSave = () => {
    localStorage.setItem("support_settings", JSON.stringify({ telegramId, sessionId }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-20" />

      <div className="relative z-10">
        <div className="container mx-auto p-6 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-display text-primary">&gt;_ ADMIN PANEL</h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowChangePassword(!showChangePassword)}
                variant="outline"
                className="font-mono border-border bg-transparent hover:bg-primary/10 hover:border-primary hover:text-primary gap-2"
              >
                <Key className="w-4 h-4" />
                Change Password
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="font-mono border-border bg-transparent hover:bg-destructive/10 hover:border-destructive hover:text-destructive gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Change Password Modal */}
          {showChangePassword && (
            <Card className="mb-8 p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-display text-primary mb-4">Change Password</h2>
              <div className="flex gap-4">
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="font-mono"
                />
                <Button onClick={handleChangePassword} className="font-mono">
                  Update
                </Button>
                <Button onClick={() => setShowChangePassword(false)} variant="outline" className="font-mono">
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Tabs Navigation */}
          <Card className="mb-8 p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`font-mono gap-2 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                )
              })}
            </div>
          </Card>

          {/* Navigation Tab Content */}
          {activeTab === "navigation" && <NavigationTab />}

          {/* Settings Tab Content */}
          {activeTab === "settings" && <SiteSettingsTab />}

          {/* Images Tab Content */}
          {activeTab === "images" && <ImageUploadTab />}

          {/* Products Tab Content */}
          {activeTab === "products" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display text-primary">Manage Products</h2>
                  <Button className="font-mono gap-2">
                    <Plus className="w-4 h-4" />
                    New Product
                  </Button>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-mono">No products yet. Click "New Product" to add one.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="p-4 border border-border rounded-lg">
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Categories Tab Content */}
          {activeTab === "categories" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display text-primary">Manage Categories</h2>
                  <Button className="font-mono gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>

                {categories.length === 0 ? (
                  <div className="text-center py-12">
                    <Tag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-mono">No categories yet. Click "Add" to create one.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category.id} className="p-4 border border-border rounded-lg">
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Pages Tab Content */}
          {activeTab === "pages" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display text-primary">Manage Pages</h2>
                  <Button className="font-mono gap-2">
                    <Plus className="w-4 h-4" />
                    New Page
                  </Button>
                </div>

                {pages.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-mono">No custom pages. Click "New Page" to create one.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pages.map((page) => (
                      <div key={page.id} className="p-4 border border-border rounded-lg">
                        {page.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Banners Tab Content */}
          {activeTab === "banners" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display text-primary">Promo Banners</h2>
                  <Button className="font-mono gap-2">
                    <Plus className="w-4 h-4" />
                    New Banner
                  </Button>
                </div>

                {banners.length === 0 ? (
                  <div className="text-center py-12">
                    <ImagePlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-mono">
                      No banners created. Click "New Banner" to create one.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {banners.map((banner) => (
                      <div key={banner.id} className="p-4 border border-border rounded-lg">
                        {banner.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Header/Footer Tab Content */}
          {activeTab === "header-footer" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display text-primary">Header/Footer Banners</h2>
                  <Button className="font-mono gap-2">
                    <Plus className="w-4 h-4" />
                    New Banner
                  </Button>
                </div>

                {headerFooterBanners.length === 0 ? (
                  <div className="text-center py-12">
                    <LayoutTemplate className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-mono">
                      No header/footer banners. Click "New Banner" to create one.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {headerFooterBanners.map((banner) => (
                      <div key={banner.id} className="p-4 border border-border rounded-lg">
                        {banner.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Support Tab Content */}
          {activeTab === "support" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-display text-primary">Support-Kanäle</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Konfiguriere deine Support-Kontakte für das Chat Widget
                    </p>
                  </div>
                  <Button onClick={handleSupportSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Speichern
                  </Button>
                </div>

                <div className="space-y-6 max-w-2xl">
                  <div>
                    <Label htmlFor="telegram" className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-[#0088cc]" />
                      Telegram ID
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Dein Telegram Username (ohne @) oder Bot Link</p>
                    <Input
                      id="telegram"
                      value={telegramId}
                      onChange={(e) => setTelegramId(e.target.value)}
                      className="font-mono"
                      placeholder="your_telegram_username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="session" className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-[#00F782]" />
                      Session ID
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Deine Session Messenger ID (optional)</p>
                    <Input
                      id="session"
                      value={sessionId}
                      onChange={(e) => setSessionId(e.target.value)}
                      className="font-mono text-xs"
                      placeholder="05abc123def456..."
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Crypto Tab Content */}
          {activeTab === "crypto" && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-6">
              <CryptoSettingsTab wallets={convertToWalletFormat()} onSave={handleCryptoSave} />
            </Card>
          )}

          {/* Popups Tab Content */}
          {activeTab === "popups" && <PopupContentsTab />}

          {/* Spam Bot Tab Content */}
          {activeTab === "spam-bot" && <TelegramSettingsTab />}

          {/* Other Tabs Content */}
          {![
            "navigation",
            "settings",
            "images",
            "products",
            "categories",
            "pages",
            "banners",
            "header-footer",
            "support",
            "crypto",
            "popups",
            "spam-bot",
          ].includes(activeTab) && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  {tabs.find((t) => t.id === activeTab)?.icon &&
                    (() => {
                      const Icon = tabs.find((t) => t.id === activeTab)!.icon
                      return <Icon className="w-8 h-8 text-primary" />
                    })()}
                </div>
                <h3 className="text-xl font-display text-primary mb-2">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h3>
                <p className="text-muted-foreground font-mono">This section is under development</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

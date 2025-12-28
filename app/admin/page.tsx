"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Navigation, Settings, Image as ImageIcon, Package, Tag, FileText, 
  Megaphone, Layout, HeadphonesIcon, Bitcoin, BarChart3, Bot, 
  Cog, Sparkles, MessageSquare, Eye, Pencil, Trash2, GripVertical,
  Key, LogOut, Terminal, Plus
} from "lucide-react"

const adminTabs = [
  { id: "navigation", name: "Navigation", icon: Navigation },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "images", name: "Images", icon: ImageIcon },
  { id: "products", name: "Products", icon: Package },
  { id: "categories", name: "Categories", icon: Tag },
  { id: "pages", name: "Pages", icon: FileText },
  { id: "banners", name: "Banners", icon: Megaphone },
  { id: "header-footer", name: "Header/Footer", icon: Layout },
  { id: "support", name: "Support", icon: HeadphonesIcon },
  { id: "crypto", name: "Crypto", icon: Bitcoin },
  { id: "sales", name: "Sales", icon: BarChart3 },
  { id: "spam-bot", name: "Spam Bot", icon: Bot },
  { id: "bot-config", name: "Bot Config", icon: Cog },
  { id: "special-bot", name: "Special Bot", icon: Sparkles },
  { id: "popups", name: "Popups", icon: MessageSquare },
]

const navigationLinks = [
  { id: 1, name: "Home", path: "/", order: 0 },
  { id: 2, name: "Products", path: "#products", order: 1 },
  { id: 3, name: "Contact", path: "#contact", order: 2 },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("navigation")
  const [links, setLinks] = useState(navigationLinks)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "demo123"
    if (password === adminPass) {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-lg border border-border">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Terminal className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">ADMIN PANEL</h1>
            </div>
            <p className="text-muted-foreground">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="bg-input"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">ADMIN PANEL</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Key className="w-4 h-4" />
                Change Password
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 text-primary border-primary/30 hover:bg-primary/10"
                onClick={() => setIsAuthenticated(false)}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {adminTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            )
          })}
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          {activeTab === "navigation" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Header Navigation</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Neuer Link
                </Button>
              </div>

              <div className="space-y-3">
                {links.map((link) => (
                  <div 
                    key={link.id}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                      <div>
                        <div className="font-medium">{link.name}</div>
                        <div className="text-sm text-muted-foreground">{link.path}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">
                        #{link.order}
                      </span>
                      <Button variant="ghost" size="icon" className="hover:bg-background">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-background">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Shop Settings</h2>
              <div className="grid gap-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium mb-2">Shop Name</label>
                  <Input defaultValue="FromNL.pro" className="bg-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Shop Slogan</label>
                  <Input defaultValue="Only Best Dutch Quality" className="bg-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <Input defaultValue="support@fromnl.pro" className="bg-input" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 w-fit">
                  Save Settings
                </Button>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Products</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                No products yet. Click "Add Product" to create your first product.
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Categories</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Add Category
                </Button>
              </div>
              <div className="grid gap-3">
                {["Development", "Security", "Utilities", "AI Tools", "Accounts", "Gaming"].map((cat) => (
                  <div key={cat} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                    <span className="font-medium">{cat}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-primary"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "crypto" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Crypto Payment Settings</h2>
              <div className="grid gap-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium mb-2">Bitcoin (BTC) Address</label>
                  <Input placeholder="Enter BTC wallet address" className="bg-input font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ethereum (ETH) Address</label>
                  <Input placeholder="Enter ETH wallet address" className="bg-input font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Litecoin (LTC) Address</label>
                  <Input placeholder="Enter LTC wallet address" className="bg-input font-mono text-sm" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 w-fit">
                  Save Crypto Settings
                </Button>
              </div>
            </div>
          )}

          {!["navigation", "settings", "products", "categories", "crypto"].includes(activeTab) && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">
                {adminTabs.find(t => t.id === activeTab)?.name} Settings
              </div>
              <p className="text-sm text-muted-foreground">
                Configure your {adminTabs.find(t => t.id === activeTab)?.name.toLowerCase()} settings here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

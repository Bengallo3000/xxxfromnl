"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Navigation, Settings, Image as ImageIcon, Package, Tag, FileText, 
  Megaphone, Layout, HeadphonesIcon, Bitcoin, BarChart3, Bot, 
  Cog, Sparkles, MessageSquare, Eye, Pencil, Trash2, GripVertical,
  Key, LogOut, Terminal, Plus, Upload, X, Loader2, Link, Wallet,
  ShoppingCart, CreditCard, Palette, Send, Check, Clock, Truck, XCircle,
  Bell
} from "lucide-react"

const adminTabs = [
  { id: "navigation", name: "Navigation", icon: Navigation },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "security", name: "Security", icon: Key },
  { id: "images", name: "Images", icon: ImageIcon },
  { id: "products", name: "Products", icon: Package },
  { id: "categories", name: "Categories", icon: Tag },
  { id: "pages", name: "Pages", icon: FileText },
  { id: "banners", name: "Banners", icon: Megaphone },
  { id: "popups", name: "Popups", icon: Bell },
  { id: "header-footer", name: "Header/Footer", icon: Layout },
  { id: "support", name: "Support", icon: HeadphonesIcon },
  { id: "crypto", name: "Crypto", icon: Bitcoin },
  { id: "orders", name: "Orders", icon: ShoppingCart },
  { id: "payments", name: "Payments", icon: CreditCard },
  { id: "themes", name: "Themes", icon: Palette },
  { id: "telegram", name: "Telegram Bot", icon: Send },
]

interface NavItem { id: number; label: string; href: string; sort_order: number }
interface ImageItem { id: number; name: string; url: string; alt_text: string }
interface Product { id: number; name: string; description: string; price: number; image_url: string; category: string; in_stock: boolean; is_free: boolean }
interface Page { id: number; slug: string; title: string; content: string }
interface Category { id: number; name: string; slug: string; image_url: string }
interface Banner { id: number; name: string; image_url: string; link_url: string; position: string; size: string; is_active: boolean }
interface CryptoWallet { id: number; currency: string; wallet_address: string; is_active: boolean }
interface Order { id: number; order_number: string; customer_email: string; customer_name: string; customer_address: string; items: any[]; total_amount: number; payment_method: string; payment_status: string; order_status: string; notes: string; created_at: string }
interface Payment { id: number; order_id: number; order_number?: string; customer_email?: string; payment_method: string; amount: number; currency: string; transaction_id: string; status: string; crypto_address: string; notes: string; created_at: string }
interface ShopTheme { id: number; name: string; is_active: boolean; primary_color: string; secondary_color: string; accent_color: string; background_color: string; text_color: string; header_style: string; font_family: string }
interface Popup { id: number; title: string; content: string; image_url: string; button_text: string; button_url: string; popup_type: string; position: string; bg_color: string; text_color: string; is_active: boolean; show_on_pages: string; start_date: string; end_date: string }

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [adminToken, setAdminToken] = useState("")
  const [activeTab, setActiveTab] = useState("navigation")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [showNavForm, setShowNavForm] = useState(false)
  const [navForm, setNavForm] = useState({ label: "", href: "", sort_order: 0 })

  const [images, setImages] = useState<ImageItem[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageAlt, setImageAlt] = useState("")

  const [products, setProducts] = useState<Product[]>([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "", category: "", is_free: false })
  const [productImage, setProductImage] = useState<File | null>(null)

  const [pages, setPages] = useState<Page[]>([])
  const [showPageForm, setShowPageForm] = useState(false)
  const [pageForm, setPageForm] = useState({ slug: "", title: "", content: "" })

  const [categories, setCategories] = useState<Category[]>([])
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "" })

  const [banners, setBanners] = useState<Banner[]>([])
  const [showBannerForm, setShowBannerForm] = useState(false)
  const [bannerForm, setBannerForm] = useState({ name: "", link_url: "", position: "header", size: "medium" })
  const [bannerImage, setBannerImage] = useState<File | null>(null)

  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({})

  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>([])
  const [showCryptoForm, setShowCryptoForm] = useState(false)
  const [cryptoForm, setCryptoForm] = useState({ currency: "BTC", wallet_address: "" })

  const [orders, setOrders] = useState<Order[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [shopThemes, setShopThemes] = useState<ShopTheme[]>([])
  const [popups, setPopups] = useState<Popup[]>([])
  const [showPopupForm, setShowPopupForm] = useState(false)
  const [popupForm, setPopupForm] = useState({ title: "", content: "", button_text: "", button_url: "", popup_type: "banner", position: "top", bg_color: "#D64545", text_color: "#ffffff" })

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      initDatabase()
    }
  }, [isAuthenticated])

  const initDatabase = async () => {
    try {
      await fetch('/api/init')
      loadData()
    } catch (error) {
      console.error('Init error:', error)
    }
  }

  const loadData = async () => {
    try {
      const authHeaders = { 'x-admin-token': adminToken }
      const [navRes, imgRes, prodRes, pageRes, catRes, bannerRes, settingsRes, cryptoRes, ordersRes, paymentsRes, themesRes, popupsRes] = await Promise.all([
        fetch('/api/navigation'),
        fetch('/api/images'),
        fetch('/api/products'),
        fetch('/api/pages'),
        fetch('/api/categories'),
        fetch('/api/banners'),
        fetch('/api/settings'),
        fetch('/api/crypto'),
        fetch('/api/orders', { headers: authHeaders }),
        fetch('/api/payments', { headers: authHeaders }),
        fetch('/api/themes'),
        fetch('/api/popups')
      ])
      setNavItems(await navRes.json())
      setImages(await imgRes.json())
      setProducts(await prodRes.json())
      setPages(await pageRes.json())
      setCategories(await catRes.json())
      setBanners(await bannerRes.json())
      setSiteSettings(await settingsRes.json())
      setCryptoWallets(await cryptoRes.json())
      const ordersData = await ordersRes.json()
      setOrders(Array.isArray(ordersData) ? ordersData : [])
      const paymentsData = await paymentsRes.json()
      setPayments(Array.isArray(paymentsData) ? paymentsData : [])
      setShopThemes(await themesRes.json())
      const popupsData = await popupsRes.json()
      setPopups(Array.isArray(popupsData) ? popupsData : [])
    } catch (error) {
      console.error('Load error:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setAdminToken(data.password || password)
        setIsAuthenticated(true)
      } else {
        showMessage(data.error || 'Invalid password')
      }
    } catch (error) {
      showMessage('Login failed')
    }
    setLoading(false)
  }

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(""), 3000)
  }

  const addNavItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify(navForm)
      })
      setNavForm({ label: "", href: "", sort_order: 0 })
      setShowNavForm(false)
      loadData()
      showMessage("Navigation item added!")
    } catch (error) {
      showMessage("Error adding navigation")
    }
    setLoading(false)
  }

  const deleteNavItem = async (id: number) => {
    if (!confirm("Delete this navigation item?")) return
    try {
      await fetch('/api/navigation', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Navigation item deleted!")
    } catch (error) {
      showMessage("Error deleting navigation")
    }
  }

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('alt_text', imageAlt)
      await fetch('/api/images', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: formData
      })
      setImageFile(null)
      setImageAlt("")
      loadData()
      showMessage("Image uploaded!")
    } catch (error) {
      showMessage("Error uploading image")
    }
    setLoading(false)
  }

  const deleteImage = async (id: number) => {
    if (!confirm("Delete this image?")) return
    try {
      await fetch('/api/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Image deleted!")
    } catch (error) {
      showMessage("Error deleting image")
    }
  }

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', productForm.name)
      formData.append('description', productForm.description)
      formData.append('price', productForm.is_free ? '0' : productForm.price)
      formData.append('category', productForm.category)
      formData.append('is_free', String(productForm.is_free))
      if (productImage) {
        formData.append('image', productImage)
      }
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: formData
      })
      setProductForm({ name: "", description: "", price: "", category: "", is_free: false })
      setProductImage(null)
      setShowProductForm(false)
      loadData()
      showMessage("Product added!")
    } catch (error) {
      showMessage("Error adding product")
    }
    setLoading(false)
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return
    try {
      await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Product deleted!")
    } catch (error) {
      showMessage("Error deleting product")
    }
  }

  const addPage = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify(pageForm)
      })
      setPageForm({ slug: "", title: "", content: "" })
      setShowPageForm(false)
      loadData()
      showMessage("Page created!")
    } catch (error) {
      showMessage("Error creating page")
    }
    setLoading(false)
  }

  const deletePage = async (id: number) => {
    if (!confirm("Delete this page?")) return
    try {
      await fetch('/api/pages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Page deleted!")
    } catch (error) {
      showMessage("Error deleting page")
    }
  }

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify(categoryForm)
      })
      setCategoryForm({ name: "", slug: "" })
      setShowCategoryForm(false)
      loadData()
      showMessage("Category added!")
    } catch (error) {
      showMessage("Error adding category")
    }
    setLoading(false)
  }

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return
    try {
      await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Category deleted!")
    } catch (error) {
      showMessage("Error deleting category")
    }
  }

  const addBanner = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bannerImage) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', bannerForm.name)
      formData.append('link_url', bannerForm.link_url)
      formData.append('position', bannerForm.position)
      formData.append('size', bannerForm.size)
      formData.append('image', bannerImage)
      await fetch('/api/banners', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: formData
      })
      setBannerForm({ name: "", link_url: "", position: "header", size: "medium" })
      setBannerImage(null)
      setShowBannerForm(false)
      loadData()
      showMessage("Banner added!")
    } catch (error) {
      showMessage("Error adding banner")
    }
    setLoading(false)
  }

  const deleteBanner = async (id: number) => {
    if (!confirm("Delete this banner?")) return
    try {
      await fetch('/api/banners', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Banner deleted!")
    } catch (error) {
      showMessage("Error deleting banner")
    }
  }

  const addPopup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/popups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify(popupForm)
      })
      setPopupForm({ title: "", content: "", button_text: "", button_url: "", popup_type: "banner", position: "top", bg_color: "#D64545", text_color: "#ffffff" })
      setShowPopupForm(false)
      loadData()
      showMessage("Popup added!")
    } catch (error) {
      showMessage("Error adding popup")
    }
    setLoading(false)
  }

  const deletePopup = async (id: number) => {
    if (!confirm("Delete this popup?")) return
    try {
      await fetch('/api/popups', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Popup deleted!")
    } catch (error) {
      showMessage("Error deleting popup")
    }
  }

  const togglePopup = async (popup: Popup) => {
    try {
      await fetch('/api/popups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ ...popup, is_active: !popup.is_active })
      })
      loadData()
      showMessage(popup.is_active ? "Popup deactivated!" : "Popup activated!")
    } catch (error) {
      showMessage("Error updating popup")
    }
  }

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify(siteSettings)
      })
      showMessage("Settings saved!")
    } catch (error) {
      showMessage("Error saving settings")
    }
    setLoading(false)
  }

  const addCryptoWallet = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/crypto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify(cryptoForm)
      })
      setCryptoForm({ currency: "BTC", wallet_address: "" })
      setShowCryptoForm(false)
      loadData()
      showMessage("Wallet added!")
    } catch (error) {
      showMessage("Error adding wallet")
    }
    setLoading(false)
  }

  const deleteCryptoWallet = async (id: number) => {
    if (!confirm("Delete this wallet?")) return
    try {
      await fetch('/api/crypto', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Wallet deleted!")
    } catch (error) {
      showMessage("Error deleting wallet")
    }
  }

  const updateOrderStatus = async (id: number, order_status: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id, order_status })
      })
      loadData()
      showMessage(`Order updated to ${order_status}!`)
    } catch (error) {
      showMessage("Error updating order")
    }
  }

  const updatePaymentStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/payments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id, status })
      })
      loadData()
      showMessage(`Payment marked as ${status}!`)
    } catch (error) {
      showMessage("Error updating payment")
    }
  }

  const deleteOrder = async (id: number) => {
    if (!confirm("Delete this order and its payments?")) return
    try {
      await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Order deleted!")
    } catch (error) {
      showMessage("Error deleting order")
    }
  }

  const activateTheme = async (id: number) => {
    try {
      await fetch('/api/themes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ id })
      })
      loadData()
      showMessage("Theme activated!")
    } catch (error) {
      showMessage("Error activating theme")
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-500/20 text-blue-400'
      case 'confirmed': return 'bg-yellow-500/20 text-yellow-400'
      case 'processing': return 'bg-orange-500/20 text-orange-400'
      case 'shipped': return 'bg-purple-500/20 text-purple-400'
      case 'delivered': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'paid': return 'bg-green-500/20 text-green-400'
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'failed': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match!")
      return
    }
    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters!")
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      const data = await response.json()
      if (response.ok) {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        showMessage("Password changed successfully!")
      } else {
        showMessage(data.error || "Error changing password")
      }
    } catch (error) {
      showMessage("Error changing password")
    }
    setLoading(false)
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {message && (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">ADMIN PANEL</h1>
            </div>
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
                <Button 
                  className="bg-primary hover:bg-primary/90 gap-2"
                  onClick={() => setShowNavForm(!showNavForm)}
                >
                  {showNavForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showNavForm ? "Cancel" : "New Link"}
                </Button>
              </div>
              {showNavForm && (
                <form onSubmit={addNavItem} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Label</label>
                      <Input value={navForm.label} onChange={(e) => setNavForm({...navForm, label: e.target.value})} placeholder="e.g. About Us" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL / Path</label>
                      <Input value={navForm.href} onChange={(e) => setNavForm({...navForm, href: e.target.value})} placeholder="e.g. /about" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort Order</label>
                      <Input type="number" value={navForm.sort_order} onChange={(e) => setNavForm({...navForm, sort_order: parseInt(e.target.value)})} className="bg-input" />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Navigation Item
                  </Button>
                </form>
              )}
              <div className="space-y-3">
                {navItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No navigation items yet.</div>
                ) : (
                  navItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-muted-foreground">{item.href}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary" onClick={() => deleteNavItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Image Library</h2>
              <form onSubmit={uploadImage} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Image</label>
                    <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="bg-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Alt Text</label>
                    <Input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Description" className="bg-input" />
                  </div>
                </div>
                <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90 gap-2" disabled={loading || !imageFile}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload Image
                </Button>
              </form>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group bg-secondary/50 rounded-lg border border-border overflow-hidden">
                    <img src={img.url} alt={img.alt_text || img.name} className="w-full h-32 object-cover" />
                    <div className="p-2">
                      <div className="text-sm font-medium truncate">{img.name}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80 hover:bg-primary/20 text-primary opacity-0 group-hover:opacity-100" onClick={() => deleteImage(img.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Products</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setShowProductForm(!showProductForm)}>
                  {showProductForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showProductForm ? "Cancel" : "Add Product"}
                </Button>
              </div>
              {showProductForm && (
                <form onSubmit={addProduct} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name</label>
                      <Input value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} placeholder="e.g. Premium Widget" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (EUR)</label>
                      <Input type="number" step="0.01" value={productForm.is_free ? '0' : productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} placeholder="e.g. 29.99" className="bg-input" disabled={productForm.is_free} required={!productForm.is_free} />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input type="checkbox" id="is_free" checked={productForm.is_free} onChange={(e) => setProductForm({...productForm, is_free: e.target.checked, price: e.target.checked ? '0' : productForm.price})} className="w-5 h-5 rounded border-green-500 text-green-500 focus:ring-green-500" />
                      <label htmlFor="is_free" className="text-sm font-medium text-green-500">Free Product (Gratis)</label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} className="w-full px-3 py-2 rounded-md bg-input border border-border">
                        <option value="">Select category...</option>
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Image</label>
                      <Input type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files?.[0] || null)} className="bg-input" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} placeholder="Product description..." className="bg-input" rows={3} />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Product
                  </Button>
                </form>
              )}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div key={product.id} className="relative group bg-secondary/50 rounded-lg border border-border overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-background flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{product.name}</div>
                        {product.is_free && <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded">GRATIS</span>}
                      </div>
                      <div className={`font-bold ${product.is_free ? 'text-green-500' : 'text-primary'}`}>
                        {product.is_free ? 'GRATIS' : `EUR ${Number(product.price).toFixed(2)}`}
                      </div>
                      {product.category && <div className="text-xs text-muted-foreground mt-1">{product.category}</div>}
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80 hover:bg-primary/20 text-primary opacity-0 group-hover:opacity-100" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Categories</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setShowCategoryForm(!showCategoryForm)}>
                  {showCategoryForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showCategoryForm ? "Cancel" : "Add Category"}
                </Button>
              </div>
              {showCategoryForm && (
                <form onSubmit={addCategory} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category Name</label>
                      <Input value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} placeholder="e.g. Electronics" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug</label>
                      <Input value={categoryForm.slug} onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})} placeholder="e.g. electronics" className="bg-input" required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Category
                  </Button>
                </form>
              )}
              <div className="space-y-3">
                {categories.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No categories yet. Add categories to organize products.</div>
                ) : (
                  categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                      <div>
                        <div className="font-medium">{cat.name}</div>
                        <div className="text-sm text-muted-foreground">/{cat.slug}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary" onClick={() => deleteCategory(cat.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "pages" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Pages</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setShowPageForm(!showPageForm)}>
                  {showPageForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showPageForm ? "Cancel" : "New Page"}
                </Button>
              </div>
              {showPageForm && (
                <form onSubmit={addPage} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Page Title</label>
                      <Input value={pageForm.title} onChange={(e) => setPageForm({...pageForm, title: e.target.value})} placeholder="e.g. About Us" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL Slug</label>
                      <Input value={pageForm.slug} onChange={(e) => setPageForm({...pageForm, slug: e.target.value})} placeholder="e.g. about-us" className="bg-input" required />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea value={pageForm.content} onChange={(e) => setPageForm({...pageForm, content: e.target.value})} placeholder="Page content..." className="bg-input" rows={6} />
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Create Page
                  </Button>
                </form>
              )}
              <div className="space-y-3">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">/{page.slug}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary" onClick={() => deletePage(page.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "banners" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Banners</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setShowBannerForm(!showBannerForm)}>
                  {showBannerForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showBannerForm ? "Cancel" : "Add Banner"}
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">Add banners to header or footer for backlinks and promotions.</p>
              {showBannerForm && (
                <form onSubmit={addBanner} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Banner Name</label>
                      <Input value={bannerForm.name} onChange={(e) => setBannerForm({...bannerForm, name: e.target.value})} placeholder="e.g. Partner Ad" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Link URL (backlink)</label>
                      <Input value={bannerForm.link_url} onChange={(e) => setBannerForm({...bannerForm, link_url: e.target.value})} placeholder="https://partner-site.com" className="bg-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Position</label>
                      <select value={bannerForm.position} onChange={(e) => setBannerForm({...bannerForm, position: e.target.value})} className="w-full px-3 py-2 rounded-md bg-input border border-border">
                        <option value="header">Header</option>
                        <option value="footer">Footer</option>
                        <option value="sidebar">Sidebar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Size</label>
                      <select value={bannerForm.size} onChange={(e) => setBannerForm({...bannerForm, size: e.target.value})} className="w-full px-3 py-2 rounded-md bg-input border border-border">
                        <option value="small">Small (728x90)</option>
                        <option value="medium">Medium (300x250)</option>
                        <option value="large">Large (970x250)</option>
                        <option value="leaderboard">Leaderboard (728x90)</option>
                        <option value="skyscraper">Skyscraper (160x600)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Banner Image</label>
                      <Input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files?.[0] || null)} className="bg-input" required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading || !bannerImage}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Banner
                  </Button>
                </form>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {banners.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">No banners yet. Add banners for backlinks and promotions.</div>
                ) : (
                  banners.map((banner) => (
                    <div key={banner.id} className="relative group bg-secondary/50 rounded-lg border border-border overflow-hidden">
                      <img src={banner.image_url} alt={banner.name} className="w-full h-32 object-cover" />
                      <div className="p-3">
                        <div className="font-medium">{banner.name}</div>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                          <span className="bg-background px-2 py-0.5 rounded">{banner.position}</span>
                          <span className="bg-background px-2 py-0.5 rounded">{banner.size}</span>
                        </div>
                        {banner.link_url && <div className="text-xs text-primary mt-1 flex items-center gap-1"><Link className="w-3 h-3" />{banner.link_url}</div>}
                      </div>
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/80 hover:bg-primary/20 text-primary opacity-0 group-hover:opacity-100" onClick={() => deleteBanner(banner.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "popups" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Popups & Promotions</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setShowPopupForm(!showPopupForm)}>
                  {showPopupForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showPopupForm ? "Cancel" : "Add Popup"}
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">Create promotional popups like Black Friday banners, sales announcements, and special offers.</p>
              {showPopupForm && (
                <form onSubmit={addPopup} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input value={popupForm.title} onChange={(e) => setPopupForm({...popupForm, title: e.target.value})} placeholder="e.g. BLACK FRIDAY SALE!" className="bg-input" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <select value={popupForm.popup_type} onChange={(e) => setPopupForm({...popupForm, popup_type: e.target.value})} className="w-full px-3 py-2 rounded-md bg-input border border-border">
                        <option value="banner">Top Banner</option>
                        <option value="modal">Modal Popup</option>
                        <option value="slide">Slide-in</option>
                        <option value="floating">Floating Badge</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Content/Message</label>
                      <Textarea value={popupForm.content} onChange={(e) => setPopupForm({...popupForm, content: e.target.value})} placeholder="50% OFF all products this weekend only!" className="bg-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Button Text (optional)</label>
                      <Input value={popupForm.button_text} onChange={(e) => setPopupForm({...popupForm, button_text: e.target.value})} placeholder="e.g. Shop Now" className="bg-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Button Link (optional)</label>
                      <Input value={popupForm.button_url} onChange={(e) => setPopupForm({...popupForm, button_url: e.target.value})} placeholder="/products" className="bg-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Background Color</label>
                      <Input type="color" value={popupForm.bg_color} onChange={(e) => setPopupForm({...popupForm, bg_color: e.target.value})} className="h-10 w-24" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Text Color</label>
                      <Input type="color" value={popupForm.text_color} onChange={(e) => setPopupForm({...popupForm, text_color: e.target.value})} className="h-10 w-24" />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Popup
                  </Button>
                </form>
              )}
              <div className="space-y-4">
                {popups.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No popups yet. Create promotional popups for sales and special offers.</div>
                ) : (
                  popups.map((popup) => (
                    <div key={popup.id} className="relative p-4 rounded-lg border border-border" style={{ backgroundColor: popup.bg_color + '20' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: popup.bg_color, color: popup.text_color }}>
                            <Bell className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {popup.title}
                              <span className={`text-xs px-2 py-0.5 rounded ${popup.is_active ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                {popup.is_active ? 'Active' : 'Inactive'}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded bg-background">{popup.popup_type}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">{popup.content || 'No message'}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="gap-1" onClick={() => togglePopup(popup)}>
                            {popup.is_active ? <XCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                            {popup.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/20" onClick={() => deletePopup(popup.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Security Settings</h2>
              <div className="max-w-xl">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border mb-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-primary" />
                    Change Admin Password
                  </h3>
                  <form onSubmit={changePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <Input 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        placeholder="Enter current password" 
                        className="bg-input" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <Input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Enter new password (min 6 characters)" 
                        className="bg-input" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <Input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm new password" 
                        className="bg-input" 
                        required 
                      />
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Change Password
                    </Button>
                  </form>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    Note: After changing the password, you will need to use the new password to log in. Make sure to remember your new password!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Shop Settings</h2>
              <form onSubmit={saveSettings} className="max-w-xl space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Shop Name</label>
                  <Input value={siteSettings.shop_name || "TechVerseHub.xyz"} onChange={(e) => setSiteSettings({...siteSettings, shop_name: e.target.value})} className="bg-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Shop Slogan</label>
                  <Input value={siteSettings.shop_slogan || "Premium Software & Tools"} onChange={(e) => setSiteSettings({...siteSettings, shop_slogan: e.target.value})} className="bg-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <Input value={siteSettings.contact_email || ""} onChange={(e) => setSiteSettings({...siteSettings, contact_email: e.target.value})} placeholder="support@techversehub.xyz" className="bg-input" />
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="free_products_enabled" 
                      checked={siteSettings.free_products_enabled === 'true'} 
                      onChange={(e) => setSiteSettings({...siteSettings, free_products_enabled: e.target.checked ? 'true' : 'false'})} 
                      className="w-5 h-5 rounded border-green-500 text-green-500 focus:ring-green-500" 
                    />
                    <div>
                      <label htmlFor="free_products_enabled" className="text-sm font-medium text-green-500">Enable Free Products Section</label>
                      <p className="text-xs text-muted-foreground mt-1">Show a separate section for free products in the shop</p>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Settings
                </Button>
              </form>
            </div>
          )}

          {activeTab === "header-footer" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Header & Footer Customization</h2>
              <form onSubmit={saveSettings} className="max-w-xl space-y-6">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium mb-4">Header Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Header Background Color</label>
                      <Input type="color" value={siteSettings.header_bg_color || "#1a1a1a"} onChange={(e) => setSiteSettings({...siteSettings, header_bg_color: e.target.value})} className="h-10 w-24" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Header Text Color</label>
                      <Input type="color" value={siteSettings.header_text_color || "#ffffff"} onChange={(e) => setSiteSettings({...siteSettings, header_text_color: e.target.value})} className="h-10 w-24" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Logo URL</label>
                      <Input value={siteSettings.logo_url || "/techverse-logo.jpg"} onChange={(e) => setSiteSettings({...siteSettings, logo_url: e.target.value})} placeholder="/techverse-logo.jpg" className="bg-input" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium mb-4">Footer Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Footer Background Color</label>
                      <Input type="color" value={siteSettings.footer_bg_color || "#0a0a0a"} onChange={(e) => setSiteSettings({...siteSettings, footer_bg_color: e.target.value})} className="h-10 w-24" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Footer Text</label>
                      <Textarea value={siteSettings.footer_text || ""} onChange={(e) => setSiteSettings({...siteSettings, footer_text: e.target.value})} placeholder="Footer content..." className="bg-input" rows={3} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Copyright Text</label>
                      <Input value={siteSettings.copyright_text || "© 2025 TechVerseHub.xyz"} onChange={(e) => setSiteSettings({...siteSettings, copyright_text: e.target.value})} className="bg-input" />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </div>
          )}

          {activeTab === "support" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Support Messenger Integration</h2>
              <p className="text-muted-foreground mb-6">Enter your messenger session app ID to display a contact button in the shop for customers.</p>
              <form onSubmit={saveSettings} className="max-w-xl space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Messenger App ID / Session ID</label>
                  <Input value={siteSettings.messenger_id || ""} onChange={(e) => setSiteSettings({...siteSettings, messenger_id: e.target.value})} placeholder="e.g. your-messenger-session-id" className="bg-input font-mono" />
                  <p className="text-xs text-muted-foreground mt-2">This ID will be used to show a support button that links to your messenger session.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Support Button Text</label>
                  <Input value={siteSettings.support_button_text || "Contact Support"} onChange={(e) => setSiteSettings({...siteSettings, support_button_text: e.target.value})} className="bg-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Support Email (fallback)</label>
                  <Input value={siteSettings.support_email || ""} onChange={(e) => setSiteSettings({...siteSettings, support_email: e.target.value})} placeholder="support@techversehub.xyz" className="bg-input" />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Support Settings
                </Button>
              </form>
            </div>
          )}

          {activeTab === "crypto" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Crypto Payment Wallets</h2>
                <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setShowCryptoForm(!showCryptoForm)}>
                  {showCryptoForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showCryptoForm ? "Cancel" : "Add Wallet"}
                </Button>
              </div>
              <p className="text-muted-foreground mb-6">Add crypto wallets for checkout payments. Prices in EUR/USD will be converted to crypto at checkout using live exchange rates.</p>
              {showCryptoForm && (
                <form onSubmit={addCryptoWallet} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cryptocurrency</label>
                      <select value={cryptoForm.currency} onChange={(e) => setCryptoForm({...cryptoForm, currency: e.target.value})} className="w-full px-3 py-2 rounded-md bg-input border border-border">
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="XMR">Monero (XMR)</option>
                        <option value="USDT">Tether (USDT)</option>
                        <option value="USDC">USD Coin (USDC)</option>
                        <option value="SOL">Solana (SOL)</option>
                        <option value="DOGE">Dogecoin (DOGE)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Wallet Address</label>
                      <Input value={cryptoForm.wallet_address} onChange={(e) => setCryptoForm({...cryptoForm, wallet_address: e.target.value})} placeholder="Enter wallet address" className="bg-input font-mono text-sm" required />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Wallet
                  </Button>
                </form>
              )}
              <div className="space-y-3">
                {cryptoWallets.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No crypto wallets configured. Add wallets to accept crypto payments.</div>
                ) : (
                  cryptoWallets.map((wallet) => (
                    <div key={wallet.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{wallet.currency}</div>
                          <div className="text-sm text-muted-foreground font-mono">{wallet.wallet_address.slice(0, 20)}...{wallet.wallet_address.slice(-8)}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-primary" onClick={() => deleteCryptoWallet(wallet.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Order Management</h2>
              <p className="text-muted-foreground mb-6">View and manage all customer orders. Update order status and track payments.</p>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No orders yet. Orders will appear here when customers place them.</div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="p-4 bg-secondary/50 rounded-lg border border-border">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="font-bold text-lg">{order.order_number}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.customer_name || 'Guest'} • {order.customer_email || 'No email'}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(order.created_at).toLocaleString('de-DE')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">€{Number(order.total_amount).toFixed(2)}</div>
                          <div className="flex gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(order.order_status)}`}>{order.order_status}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(order.payment_status)}`}>{order.payment_status}</span>
                          </div>
                        </div>
                      </div>
                      {order.customer_address && (
                        <div className="text-sm text-muted-foreground mb-3 p-2 bg-background/50 rounded">{order.customer_address}</div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                          <Check className="w-3 h-3" /> Confirm
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => updateOrderStatus(order.id, 'processing')}>
                          <Clock className="w-3 h-3" /> Processing
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => updateOrderStatus(order.id, 'shipped')}>
                          <Truck className="w-3 h-3" /> Shipped
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => updateOrderStatus(order.id, 'delivered')}>
                          <Check className="w-3 h-3" /> Delivered
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1 text-red-400 hover:text-red-300" onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                          <XCircle className="w-3 h-3" /> Cancel
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1 text-red-400 hover:bg-red-500/20" onClick={() => deleteOrder(order.id)}>
                          <Trash2 className="w-3 h-3" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Payment Management</h2>
              <p className="text-muted-foreground mb-6">Track and manage all payment transactions. Mark payments as completed or failed.</p>
              <div className="space-y-4">
                {payments.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No payments yet. Payment records will appear here.</div>
                ) : (
                  payments.map((payment) => (
                    <div key={payment.id} className="p-4 bg-secondary/50 rounded-lg border border-border">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="font-bold">{payment.order_number || `Payment #${payment.id}`}</div>
                          <div className="text-sm text-muted-foreground">{payment.customer_email || 'No email'}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {payment.payment_method} • {new Date(payment.created_at).toLocaleString('de-DE')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">{payment.currency} {Number(payment.amount).toFixed(2)}</div>
                          <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(payment.status)}`}>{payment.status}</span>
                        </div>
                      </div>
                      {payment.transaction_id && (
                        <div className="text-xs text-muted-foreground font-mono mb-2">TX: {payment.transaction_id}</div>
                      )}
                      {payment.crypto_address && (
                        <div className="text-xs text-muted-foreground font-mono mb-2">Wallet: {payment.crypto_address}</div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => updatePaymentStatus(payment.id, 'completed')}>
                          <Check className="w-3 h-3" /> Mark Paid
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1 text-red-400 hover:text-red-300" onClick={() => updatePaymentStatus(payment.id, 'failed')}>
                          <XCircle className="w-3 h-3" /> Mark Failed
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "themes" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Shop Design Themes</h2>
              <p className="text-muted-foreground mb-6">Choose from 5 pre-designed themes for your shop. Click "Activate" to apply a theme.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {shopThemes.map((theme) => (
                  <div key={theme.id} className={`p-4 rounded-lg border-2 transition-all ${theme.is_active ? 'border-primary bg-primary/10' : 'border-border bg-secondary/50 hover:border-primary/50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold">{theme.name}</h3>
                      {theme.is_active && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">Active</span>}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: theme.primary_color }} title="Primary" />
                      <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: theme.secondary_color }} title="Secondary" />
                      <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: theme.accent_color }} title="Accent" />
                      <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: theme.background_color }} title="Background" />
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">
                      <div>Style: {theme.header_style}</div>
                      <div>Font: {theme.font_family}</div>
                    </div>
                    {!theme.is_active && (
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90" onClick={() => activateTheme(theme.id)}>
                        Activate Theme
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "telegram" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Telegram Bot Integration</h2>
              <p className="text-muted-foreground mb-6">
                Connect a Telegram bot to manage orders and products directly from Telegram.
                You can view orders, update status, and even add new products with photo uploads.
              </p>
              <div className="max-w-2xl space-y-6">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Setup Instructions
                  </h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                      <span>Create a new bot with <strong>@BotFather</strong> on Telegram and get your bot token.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
                      <span>Add your bot token to your environment variables as <code className="bg-background px-1 rounded">TELEGRAM_BOT_TOKEN</code>.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
                      <span>Set the webhook URL in Telegram to: <code className="bg-background px-1 rounded break-all">{typeof window !== 'undefined' ? window.location.origin : ''}/api/telegram</code></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
                      <span>Start chatting with your bot! Use <code className="bg-background px-1 rounded">/start</code> to see all commands.</span>
                    </li>
                  </ol>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium mb-4">Available Bot Commands</h3>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex gap-4"><span className="text-primary">/start</span><span className="text-muted-foreground">Show help and commands</span></div>
                    <div className="flex gap-4"><span className="text-primary">/orders</span><span className="text-muted-foreground">List recent orders</span></div>
                    <div className="flex gap-4"><span className="text-primary">/products</span><span className="text-muted-foreground">List recent products</span></div>
                    <div className="flex gap-4"><span className="text-primary">/stats</span><span className="text-muted-foreground">Shop statistics</span></div>
                    <div className="flex gap-4"><span className="text-primary">/order_[ID]</span><span className="text-muted-foreground">View order details</span></div>
                    <div className="flex gap-4"><span className="text-primary">/confirm_[ID]</span><span className="text-muted-foreground">Confirm an order</span></div>
                    <div className="flex gap-4"><span className="text-primary">/ship_[ID]</span><span className="text-muted-foreground">Mark order as shipped</span></div>
                    <div className="flex gap-4"><span className="text-primary">/product_[ID]</span><span className="text-muted-foreground">View product details</span></div>
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-medium mb-4">Add Products via Telegram</h3>
                  <p className="text-sm text-muted-foreground">
                    Send a photo with a caption in this format to create a new product:
                  </p>
                  <pre className="mt-2 p-2 bg-background rounded text-sm">
{`Product Name
29.99
Category Name
Product description here...`}
                  </pre>
                </div>
                <form onSubmit={saveSettings} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telegram Bot Token</label>
                    <Input 
                      value={siteSettings.telegram_bot_token || ""} 
                      onChange={(e) => setSiteSettings({...siteSettings, telegram_bot_token: e.target.value})} 
                      placeholder="Enter your Telegram bot token"
                      className="bg-input font-mono text-sm"
                      type="password"
                    />
                    <p className="text-xs text-muted-foreground mt-1">This is stored securely and used for bot authentication.</p>
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Telegram Settings
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

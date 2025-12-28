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
  Key, LogOut, Terminal, Plus, Upload, X, Loader2
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

interface NavItem {
  id: number
  label: string
  href: string
  sort_order: number
}

interface ImageItem {
  id: number
  name: string
  url: string
  alt_text: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

interface Page {
  id: number
  slug: string
  title: string
  content: string
}

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
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "", category: "" })
  const [productImage, setProductImage] = useState<File | null>(null)

  const [pages, setPages] = useState<Page[]>([])
  const [showPageForm, setShowPageForm] = useState(false)
  const [pageForm, setPageForm] = useState({ slug: "", title: "", content: "" })

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
      const [navRes, imgRes, prodRes, pageRes] = await Promise.all([
        fetch('/api/navigation'),
        fetch('/api/images'),
        fetch('/api/products'),
        fetch('/api/pages')
      ])
      setNavItems(await navRes.json())
      setImages(await imgRes.json())
      setProducts(await prodRes.json())
      setPages(await pageRes.json())
    } catch (error) {
      console.error('Load error:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "demo123"
    if (password === adminPass) {
      setAdminToken(password)
      setIsAuthenticated(true)
    }
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
      formData.append('price', productForm.price)
      formData.append('category', productForm.category)
      if (productImage) {
        formData.append('image', productImage)
      }
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: formData
      })
      setProductForm({ name: "", description: "", price: "", category: "" })
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
                      <Input
                        value={navForm.label}
                        onChange={(e) => setNavForm({...navForm, label: e.target.value})}
                        placeholder="e.g. About Us"
                        className="bg-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">URL / Path</label>
                      <Input
                        value={navForm.href}
                        onChange={(e) => setNavForm({...navForm, href: e.target.value})}
                        placeholder="e.g. /about"
                        className="bg-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort Order</label>
                      <Input
                        type="number"
                        value={navForm.sort_order}
                        onChange={(e) => setNavForm({...navForm, sort_order: parseInt(e.target.value)})}
                        className="bg-input"
                      />
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
                  <div className="text-center py-12 text-muted-foreground">
                    No navigation items yet. Click "New Link" to add one.
                  </div>
                ) : (
                  navItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-muted-foreground">{item.href}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">
                          #{item.sort_order}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-primary/20 text-primary"
                          onClick={() => deleteNavItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Image Library</h2>
              </div>

              <form onSubmit={uploadImage} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Alt Text (optional)</label>
                    <Input
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Description of image"
                      className="bg-input"
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90 gap-2" disabled={loading || !imageFile}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload Image
                </Button>
              </form>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {images.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No images uploaded yet.
                  </div>
                ) : (
                  images.map((img) => (
                    <div key={img.id} className="relative group bg-secondary/50 rounded-lg border border-border overflow-hidden">
                      <img src={img.url} alt={img.alt_text || img.name} className="w-full h-32 object-cover" />
                      <div className="p-2">
                        <div className="text-sm font-medium truncate">{img.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{img.url}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-primary/20 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteImage(img.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Products</h2>
                <Button 
                  className="bg-primary hover:bg-primary/90 gap-2"
                  onClick={() => setShowProductForm(!showProductForm)}
                >
                  {showProductForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showProductForm ? "Cancel" : "Add Product"}
                </Button>
              </div>

              {showProductForm && (
                <form onSubmit={addProduct} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name</label>
                      <Input
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        placeholder="e.g. Premium Widget"
                        className="bg-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (EUR)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        placeholder="e.g. 29.99"
                        className="bg-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Input
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        placeholder="e.g. Electronics"
                        className="bg-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                        className="bg-input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        placeholder="Product description..."
                        className="bg-input"
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Product
                  </Button>
                </form>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No products yet. Click "Add Product" to create your first product.
                  </div>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="relative group bg-secondary/50 rounded-lg border border-border overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
                      ) : (
                        <div className="w-full h-40 bg-background flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-primary font-bold">EUR {Number(product.price).toFixed(2)}</div>
                        {product.category && (
                          <div className="text-xs text-muted-foreground mt-1">{product.category}</div>
                        )}
                        {product.description && (
                          <div className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-primary/20 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteProduct(product.id)}
                      >
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
                <Button 
                  className="bg-primary hover:bg-primary/90 gap-2"
                  onClick={() => setShowPageForm(!showPageForm)}
                >
                  {showPageForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showPageForm ? "Cancel" : "New Page"}
                </Button>
              </div>

              {showPageForm && (
                <form onSubmit={addPage} className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">Page Title</label>
                        <Input
                          value={pageForm.title}
                          onChange={(e) => setPageForm({...pageForm, title: e.target.value})}
                          placeholder="e.g. About Us"
                          className="bg-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">URL Slug</label>
                        <Input
                          value={pageForm.slug}
                          onChange={(e) => setPageForm({...pageForm, slug: e.target.value})}
                          placeholder="e.g. about-us"
                          className="bg-input"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <Textarea
                        value={pageForm.content}
                        onChange={(e) => setPageForm({...pageForm, content: e.target.value})}
                        placeholder="Page content..."
                        className="bg-input"
                        rows={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Create Page
                  </Button>
                </form>
              )}

              <div className="space-y-3">
                {pages.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No pages yet. Click "New Page" to create one.
                  </div>
                ) : (
                  pages.map((page) => (
                    <div 
                      key={page.id}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border"
                    >
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-muted-foreground">/{page.slug}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-background">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-background">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-primary/20 text-primary"
                          onClick={() => deletePage(page.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
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

          {!["navigation", "settings", "products", "categories", "crypto", "images", "pages"].includes(activeTab) && (
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

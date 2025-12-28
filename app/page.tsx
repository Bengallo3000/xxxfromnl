"use client"

import Link from "next/link"
import Image from "next/image"
import { Shield, Truck, Star, Check, Tag, Package, ShoppingCart, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { MatrixEffect } from "@/components/matrix-effect"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  is_free?: boolean
}

interface Category {
  id: number
  name: string
  slug: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Alle")
  const [freeProductsEnabled, setFreeProductsEnabled] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [prodRes, catRes, settingsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/settings')
      ])
      const prodData = await prodRes.json()
      const catData = await catRes.json()
      const settingsData = await settingsRes.json()
      if (Array.isArray(prodData)) {
        setProducts(prodData)
      }
      if (Array.isArray(catData)) {
        setCategories(catData)
      }
      if (settingsData && settingsData.free_products_enabled === 'true') {
        setFreeProductsEnabled(true)
      }
    } catch (error) {
      console.log('No data loaded')
    }
  }

  const freeProducts = products.filter(p => p.is_free === true)
  const premiumProducts = products.filter(p => !p.is_free)

  const displayCategories = [
    { name: "Alle", active: selectedCategory === "Alle" },
    ...categories.map(cat => ({ name: cat.name, active: selectedCategory === cat.name }))
  ]

  const filteredPremiumProducts = selectedCategory === "Alle" 
    ? premiumProducts 
    : premiumProducts.filter(p => p.category === selectedCategory)
  
  const filteredFreeProducts = selectedCategory === "Alle"
    ? freeProducts
    : freeProducts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background relative">
      <MatrixEffect opacity={0.08} />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-[1]" />
      
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fromnl-wallpaper.jpg"
            alt="FromNL Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/30 rounded-full bg-background/30 backdrop-blur">
            <p className="text-sm text-primary">★ Premium Dutch Quality</p>
          </div>
          
          <h1 className="text-8xl sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black mb-4 tracking-tight text-glow-white leading-none">
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">from</span>
              <span className="relative inline-block">
                <span 
                  style={{
                    background: 'linear-gradient(to bottom, #FF1E1E 0%, #FF1E1E 33%, #FFFFFF 33%, #FFFFFF 66%, #0033CC 66%, #0033CC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 40px rgba(255,30,30,0.6)) drop-shadow(0 0 60px rgba(0,51,204,0.5))'
                  }}
                >NL</span>
                <a 
                  href="https://theplug.u" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <img
                    src="/theplug-member.png"
                    alt="ThePlug.u Member"
                    className="h-32 md:h-48 lg:h-64 w-auto"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(100,150,255,1))'
                    }}
                  />
                </a>
              </span>
            </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 tracking-widest font-light">
            ONLY BEST DUTCH QUALITY
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Trusted Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Discrete Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Premium Products</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white btn-glow px-8">
              <Link href="/products" className="flex items-center gap-2">
                Explore Products
                <span>→</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
              <Link href="/products">Premium Collection</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/60">Dutch Origin</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/60">Support</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
              </div>
              <div className="text-sm text-white/60">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fromnl-background.jpg"
            alt="FromNL Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
      </section>

      <section className="py-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-y border-primary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Black Friday Sale</span>
            <span className="text-muted-foreground">50% off on all premium products! Limited time only.</span>
            <Link href="/products" className="ml-auto text-primary hover:underline text-sm flex items-center gap-1">
              Mehr erfahren →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">Categories</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {displayCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  cat.active 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/brande_es_als__FromNL.top__1766918480964.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">PREMIUM PRODUCTS</h2>
          </div>
          
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mb-8 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm">Premium products can be paid with cryptocurrency. Secure transactions with Bitcoin, Ethereum and more.</span>
          </div>
          
          {filteredPremiumProducts.length === 0 ? (
            <div className="bg-card/50 backdrop-blur rounded-lg p-12 text-center border border-border/50">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products in this category yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Add products in the admin panel to see them here.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPremiumProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-card/80 backdrop-blur rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors"
                >
                  {product.image_url ? (
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-secondary flex items-center justify-center">
                      <Package className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="p-4">
                    {product.category && (
                      <div className="text-xs text-primary mb-1">{product.category}</div>
                    )}
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        EUR {Number(product.price).toFixed(2)}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1">
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {freeProductsEnabled && filteredFreeProducts.length > 0 && (
        <section className="py-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h2 className="text-xl font-semibold">FREE PRODUCTS</h2>
              <Gift className="w-5 h-5 text-green-500 ml-2" />
            </div>
            
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-8 flex items-center gap-2">
              <Gift className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-400">Diese Produkte sind kostenlos! Bestelle sie gratis mit deiner Bestellung.</span>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredFreeProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-card/80 backdrop-blur rounded-lg border border-green-500/30 overflow-hidden hover:border-green-500/60 transition-colors"
                >
                  {product.image_url ? (
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
                        GRATIS
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square bg-secondary flex items-center justify-center relative">
                      <Gift className="w-16 h-16 text-green-500" />
                      <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
                        GRATIS
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    {product.category && (
                      <div className="text-xs text-green-500 mb-1">{product.category}</div>
                    )}
                    <h3 className="font-medium mb-1 group-hover:text-green-400 transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-500">
                        GRATIS
                      </span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-500 text-black gap-1">
                        <Gift className="w-4 h-4" />
                        Get Free
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Package, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (Array.isArray(data)) {
        setProducts(data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
    setLoading(false)
  }

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-primary">Products</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our premium selection of software and digital tools
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-primary" : ""}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-primary" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">No products available</h2>
            <p className="text-muted-foreground">
              Products will appear here once they are added in the admin panel.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors"
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
    </div>
  )
}

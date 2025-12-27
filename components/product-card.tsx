"use client"

import { ShoppingCart, Download, ExternalLink, Sparkles, Plus, Minus, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"

export interface PriceTier {
  minQty: number
  price: number
}

export interface Product {
  id: string
  title: string
  description: string
  image: string
  category: string
  price: number
  isFree?: boolean
  downloadUrl?: string
  priceTiers?: PriceTier[]
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
  onViewDetails?: (product: Product) => void
}

const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)

  // Calculate current price based on quantity and tiers
  const getCurrentPrice = () => {
    if (product.isFree) return 0
    if (!product.priceTiers || product.priceTiers.length === 0) {
      return product.price || 0
    }

    const sortedTiers = [...product.priceTiers].sort((a, b) => b.minQty - a.minQty)
    const applicableTier = sortedTiers.find((tier) => quantity >= tier.minQty)
    return applicableTier ? applicableTier.price : product.price || 0
  }

  const currentPrice = getCurrentPrice()
  const totalPrice = currentPrice * quantity
  const hasDiscount = product.priceTiers && product.priceTiers.length > 0 && currentPrice < (product.price || 0)

  return (
    <Card className="glass-card border-primary/30 hover:border-primary/50 transition-all group overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-muted/30">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 font-mono text-xs bg-background/90 backdrop-blur-sm border border-primary/40"
        >
          <span className="text-primary">#</span>
          {product.category}
        </Badge>

        <Badge
          className={`absolute top-2 right-2 font-display ${
            product.isFree
              ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,102,0,0.5)]"
              : "bg-accent text-accent-foreground shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          }`}
        >
          {product.isFree ? (
            <>
              <Sparkles className="w-3 h-3 mr-1" />
              {t.products.free.toUpperCase()}
            </>
          ) : (
            `€${currentPrice.toFixed(2)}`
          )}
        </Badge>

        {hasDiscount && (
          <Badge className="absolute top-12 right-2 bg-destructive text-destructive-foreground text-xs">
            <TrendingDown className="w-3 h-3 mr-1" />
            Bulk Discount
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        {!product.isFree && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 border-primary/40 bg-transparent"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="font-mono text-sm w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 border-primary/40 bg-transparent"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-display text-accent">€{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {product.isFree ? (
          <Button
            size="sm"
            className="flex-1 gap-2 font-mono text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => window.open(product.downloadUrl, "_blank")}
          >
            <Download className="w-4 h-4" />
            {t.products.download.toUpperCase()}
          </Button>
        ) : (
          <Button
            size="sm"
            className="flex-1 gap-2 font-mono text-xs bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => onAddToCart?.(product, quantity)}
          >
            <ShoppingCart className="w-4 h-4" />
            {t.products.buy.toUpperCase()}
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="px-3 border-primary/40 hover:border-primary hover:bg-primary/10 bg-transparent"
          onClick={() => onViewDetails?.(product)}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

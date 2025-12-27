"use client"

import { useState } from "react"
import { Download, ShoppingCart, Minus, Plus, TrendingDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/components/ProductCard"
import { useLanguage } from "@/contexts/LanguageContext"

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onBuy?: (product: Product, quantity: number) => void
}

const ProductDetailModal = ({ isOpen, onClose, product, onBuy }: ProductDetailModalProps) => {
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

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
  const basePrice = product.price || 0
  const hasDiscount = currentPrice < basePrice

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card border-primary/30 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary text-glow">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg bg-secondary/50">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

            {/* Category Badge */}
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 font-mono text-xs bg-background/90 backdrop-blur-sm border border-primary/40"
            >
              <span className="text-primary">#</span>
              {product.category}
            </Badge>

            {/* Free/Price Badge */}
            <Badge
              className={`absolute top-3 right-3 font-display ${
                product.isFree ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              {product.isFree ? (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  FREE
                </>
              ) : (
                `€${currentPrice.toFixed(2)}`
              )}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>

            {/* Price Tiers Display */}
            {!product.isFree && product.priceTiers && product.priceTiers.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-display text-sm text-foreground flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-accent" />
                  Volume Discounts
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-muted/30 border border-border/50">
                    <span className="text-xs text-muted-foreground">1+ pcs</span>
                    <p className="font-mono text-sm">€{basePrice.toFixed(2)}</p>
                  </div>
                  {[...product.priceTiers]
                    .sort((a, b) => a.minQty - b.minQty)
                    .map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded border ${
                          quantity >= tier.minQty ? "bg-accent/20 border-accent/50" : "bg-muted/30 border-border/50"
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">{tier.minQty}+ pcs</span>
                        <p className="font-mono text-sm text-accent">€{tier.price.toFixed(2)}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {!product.isFree && (
              <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-mono text-lg w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-border/50 pt-3">
                  <span className="text-sm">Unit Price:</span>
                  <div className="text-right">
                    {hasDiscount && (
                      <span className="text-sm text-muted-foreground line-through mr-2">€{basePrice.toFixed(2)}</span>
                    )}
                    <span className="font-mono text-accent">€{currentPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-border/50 pt-3">
                  <span className="font-display">Total:</span>
                  <span className="font-display text-2xl text-accent text-glow-accent">€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            {product.isFree ? (
              <Button
                className="w-full gap-2 font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(255,102,0,0.4)]"
                onClick={() => window.open(product.downloadUrl, "_blank")}
              >
                <Download className="w-5 h-5" />
                {t.products.download.toUpperCase()}
              </Button>
            ) : (
              <Button
                className="w-full gap-2 font-mono bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                onClick={() => {
                  onBuy?.(product, quantity)
                  onClose()
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                PAY WITH CRYPTO
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailModal

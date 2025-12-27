"use client"

import { useState } from "react"
import { CarIcon as CartIcon, Trash2, Plus, Minus, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product } from "@/components/product-card"

export interface CartItem {
  product: Product
  quantity: number
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: (email: string) => void
}

const ShoppingCart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const getUnitPrice = (product: Product, quantity: number) => {
    if (!product.priceTiers || product.priceTiers.length === 0) {
      return product.price || 0
    }
    const sortedTiers = [...product.priceTiers].sort((a, b) => b.minQty - a.minQty)
    const applicableTier = sortedTiers.find((tier) => quantity >= tier.minQty)
    return applicableTier ? applicableTier.price : product.price || 0
  }

  const getItemTotal = (item: CartItem) => {
    return getUnitPrice(item.product, item.quantity) * item.quantity
  }

  const cartTotal = items.reduce((sum, item) => sum + getItemTotal(item), 0)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleCheckout = () => {
    if (!email.trim()) {
      setEmailError("Email is required")
      return
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    setEmailError("")
    onCheckout(email)
  }

  if (items.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md glass-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary flex items-center gap-2">
              <CartIcon className="w-5 h-5" />
              Shopping Cart
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <CartIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" onClick={onClose} className="mt-4 bg-transparent">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-card border-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-primary flex items-center gap-2">
            <CartIcon className="w-5 h-5" />
            Shopping Cart ({items.length})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cart Items */}
          <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
            {items.map((item) => {
              const unitPrice = getUnitPrice(item.product, item.quantity)
              const itemTotal = getItemTotal(item)

              return (
                <div key={item.product.id} className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm text-foreground truncate">{item.product.title}</h4>
                    <p className="text-xs text-muted-foreground">€{unitPrice.toFixed(2)} each</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 bg-transparent"
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 bg-transparent"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-auto text-destructive hover:text-destructive"
                        onClick={() => onRemoveItem(item.product.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-accent">€{itemTotal.toFixed(2)}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center p-4 rounded-lg bg-accent/10 border border-accent/30">
            <span className="font-display text-lg">Total:</span>
            <span className="font-display text-2xl text-accent">€{cartTotal.toFixed(2)}</span>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="checkout-email" className="text-sm text-foreground">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="checkout-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError("")
              }}
              className={`bg-muted/50 border-border/50 focus:border-primary ${emailError ? "border-destructive" : ""}`}
            />
            {emailError && <p className="text-xs text-destructive">{emailError}</p>}
            <p className="text-xs text-muted-foreground">
              Your products will be sent to this email after payment confirmation.
            </p>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full gap-2 font-mono bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            onClick={handleCheckout}
          >
            <CreditCard className="w-5 h-5" />
            PROCEED TO PAYMENT
          </Button>

          <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShoppingCart

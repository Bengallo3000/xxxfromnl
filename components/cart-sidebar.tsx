"use client"

import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from './cart-provider'
import Link from 'next/link'

export function CartSidebar() {
  const { items, removeItem, updateQuantity, total, itemCount, isOpen, setIsOpen, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Cart ({itemCount})</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 bg-secondary/50 rounded-lg p-3">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    {item.category && (
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-sm font-semibold ${item.is_free ? 'text-green-500' : 'text-primary'}`}>
                        {item.is_free ? 'FREE' : `EUR ${(item.price * item.quantity).toFixed(2)}`}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">EUR {total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="/checkout">
                  Checkout
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

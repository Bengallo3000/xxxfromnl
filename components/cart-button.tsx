"use client"

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from './cart-provider'

export function CartButton() {
  const { itemCount, setIsOpen } = useCart()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Button>
  )
}

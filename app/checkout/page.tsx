"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, CreditCard, Bitcoin, Copy, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/components/cart-provider'
import { toast } from 'sonner'

interface CryptoWallet {
  id: number
  currency: string
  wallet_address: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [wallets, setWallets] = useState<CryptoWallet[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_email: '',
    customer_name: '',
    shipping_address: '',
    notes: ''
  })

  useEffect(() => {
    fetchWallets()
  }, [])

  const fetchWallets = async () => {
    try {
      const res = await fetch('/api/crypto')
      const data = await res.json()
      if (Array.isArray(data)) {
        setWallets(data)
      }
    } catch (error) {
      console.error('Error loading wallets')
    }
  }

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      toast.success('Address copied to clipboard')
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPayment) {
      toast.error('Please select a payment method')
      return
    }
    
    if (!formData.customer_email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)

    try {
      const orderData = {
        customer_email: formData.customer_email,
        customer_name: formData.customer_name,
        shipping_address: formData.shipping_address,
        notes: formData.notes,
        payment_method: selectedPayment,
        items: items.map(item => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (res.ok) {
        clearCart()
        toast.success('Order placed successfully!')
        router.push('/order-success')
      } else {
        toast.error('Failed to place order. Please try again.')
      }
    } catch (error) {
      toast.error('Error placing order')
    }

    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to continue</p>
          <Button onClick={() => router.push('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-white">Check</span>
          <span className="text-primary">out</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {item.image_url && (
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${item.is_free ? 'text-green-500' : 'text-primary'}`}>
                      {item.is_free ? 'FREE' : `EUR ${(item.price * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">EUR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.customer_email}
                  onChange={e => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.customer_name}
                  onChange={e => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">Shipping Address (optional)</Label>
                <Textarea
                  id="address"
                  placeholder="Your address (for physical products)"
                  value={formData.shipping_address}
                  onChange={e => setFormData(prev => ({ ...prev, shipping_address: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="notes">Order Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions..."
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading || !selectedPayment}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Method
            </h2>

            {wallets.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No payment methods available</p>
                <p className="text-sm text-muted-foreground mt-2">Contact support for payment options</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wallets.map(wallet => (
                  <div 
                    key={wallet.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedPayment === wallet.currency 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPayment(wallet.currency)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bitcoin className="w-5 h-5 text-primary" />
                        <span className="font-medium">{wallet.currency}</span>
                      </div>
                      {selectedPayment === wallet.currency && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    {selectedPayment === wallet.currency && (
                      <div className="mt-3 p-3 bg-secondary rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">Send to this address:</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs break-all flex-1 text-primary">
                            {wallet.wallet_address}
                          </code>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(wallet.wallet_address)
                            }}
                          >
                            {copiedAddress === wallet.wallet_address ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-primary">
                After sending payment, click "Place Order" to complete your purchase. 
                You will receive a confirmation email with your order details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

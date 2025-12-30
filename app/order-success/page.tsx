"use client"

import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We have received your order and will process it shortly.
            You will receive a confirmation email with your order details.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

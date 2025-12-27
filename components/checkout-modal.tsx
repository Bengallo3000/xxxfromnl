"use client"

import { useState } from "react"
import { Copy, Check, Bitcoin, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import type { CartItem } from "@/components/ShoppingCart"

export interface CryptoWallet {
  id: string
  name: string
  symbol: string
  address: string
  qrCode?: string
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  totalAmount: number
  customerEmail: string
  wallets: CryptoWallet[]
}

const cryptoIcons: Record<string, string> = {
  BTC: "₿",
  XMR: "ɱ",
  LTC: "Ł",
  TRX: "◎",
}

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount, customerEmail, wallets }: CheckoutModalProps) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    toast({
      title: "Address copied",
      description: "The wallet address has been copied to clipboard.",
    })
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  if (cartItems.length === 0) return null

  const activeWallets = wallets.filter((w) => w.address)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-primary flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Crypto Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Summary */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50 space-y-2">
            <h4 className="font-display text-foreground mb-2">Order Summary</h4>
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}x {item.product.title}
                </span>
              </div>
            ))}
            <div className="border-t border-border/50 pt-2 mt-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Email:</span>
                <span>{customerEmail}</span>
              </div>
            </div>
            <p className="text-2xl font-display text-primary text-glow pt-2">€{totalAmount.toFixed(2)}</p>
          </div>

          {activeWallets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bitcoin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No payment methods available.</p>
              <p className="text-sm">Please contact support.</p>
            </div>
          ) : (
            <Tabs defaultValue={activeWallets[0]?.symbol} className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-muted/50">
                {activeWallets.map((wallet) => (
                  <TabsTrigger
                    key={wallet.id}
                    value={wallet.symbol}
                    className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span className="mr-1">{cryptoIcons[wallet.symbol] || "◈"}</span>
                    {wallet.symbol}
                  </TabsTrigger>
                ))}
              </TabsList>

              {activeWallets.map((wallet) => (
                <TabsContent key={wallet.id} value={wallet.symbol} className="space-y-4 mt-4">
                  <div className="text-center">
                    <h4 className="font-display text-lg text-foreground mb-2">{wallet.name}</h4>

                    {/* QR Code */}
                    {wallet.qrCode && (
                      <div className="mx-auto w-48 h-48 bg-white rounded-lg p-2 mb-4">
                        <img
                          src={wallet.qrCode}
                          alt={`${wallet.name} QR Code`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Wallet Address */}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                      <code className="flex-1 text-xs text-foreground break-all font-mono">{wallet.address}</code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyAddress(wallet.address)}
                        className="shrink-0"
                      >
                        {copiedAddress === wallet.address ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">Note:</span> Send exactly{" "}
                      <span className="text-foreground font-mono">€{totalAmount.toFixed(2)}</span> worth of{" "}
                      {wallet.name} to the address above. Your products will be sent to{" "}
                      <span className="text-foreground">{customerEmail}</span> after payment confirmation.
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutModal

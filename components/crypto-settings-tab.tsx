"use client"

import { useState } from "react"
import { Bitcoin, Save, Trash2, QrCode, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { CryptoWallet } from "./CheckoutModal"

interface CryptoSettingsTabProps {
  wallets: CryptoWallet[]
  onSave: (wallets: CryptoWallet[]) => void
}

const defaultWallets: CryptoWallet[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", address: "", qrCode: "" },
  { id: "xmr", name: "Monero", symbol: "XMR", address: "", qrCode: "" },
  { id: "ltc", name: "Litecoin", symbol: "LTC", address: "", qrCode: "" },
  { id: "trx", name: "TRON", symbol: "TRX", address: "", qrCode: "" },
]

const cryptoColors: Record<string, string> = {
  BTC: "text-orange-500",
  XMR: "text-orange-400",
  LTC: "text-gray-400",
  TRX: "text-red-500",
}

const CryptoSettingsTab = ({ wallets, onSave }: CryptoSettingsTabProps) => {
  const [editedWallets, setEditedWallets] = useState<CryptoWallet[]>(
    defaultWallets.map((dw) => {
      const existing = wallets.find((w) => w.symbol === dw.symbol)
      return existing || dw
    }),
  )
  const { toast } = useToast()

  const handleChange = (symbol: string, field: "address" | "qrCode", value: string) => {
    setEditedWallets((prev) => prev.map((w) => (w.symbol === symbol ? { ...w, [field]: value } : w)))
  }

  const handleSave = () => {
    onSave(editedWallets)
    toast({
      title: "Gespeichert",
      description: "Krypto-Wallet-Einstellungen wurden aktualisiert.",
    })
  }

  const handleClear = (symbol: string) => {
    setEditedWallets((prev) => prev.map((w) => (w.symbol === symbol ? { ...w, address: "", qrCode: "" } : w)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-primary" />
          <h2 className="font-display text-xl text-foreground">Krypto-Zahlungen</h2>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Alle speichern
        </Button>
      </div>

      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-primary" />
            Wallet-Adressen
          </CardTitle>
          <CardDescription>
            Trage deine Wallet-Adressen und optional QR-Code URLs ein. Diese werden Kunden beim Checkout angezeigt.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {editedWallets.map((wallet) => (
            <div key={wallet.id} className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${cryptoColors[wallet.symbol]}`}>
                    {wallet.symbol === "BTC" && "₿"}
                    {wallet.symbol === "XMR" && "ɱ"}
                    {wallet.symbol === "LTC" && "Ł"}
                    {wallet.symbol === "TRX" && "◎"}
                  </span>
                  <span className="font-display text-foreground">{wallet.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">({wallet.symbol})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleClear(wallet.symbol)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Wallet className="w-3 h-3" />
                    Wallet-Adresse
                  </Label>
                  <Input
                    value={wallet.address}
                    onChange={(e) => handleChange(wallet.symbol, "address", e.target.value)}
                    placeholder={`${wallet.name} Adresse...`}
                    className="bg-input font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <QrCode className="w-3 h-3" />
                    QR-Code URL (optional)
                  </Label>
                  <Input
                    value={wallet.qrCode || ""}
                    onChange={(e) => handleChange(wallet.symbol, "qrCode", e.target.value)}
                    placeholder="https://..."
                    className="bg-input text-sm"
                  />
                </div>
              </div>

              {wallet.address && (
                <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded font-mono break-all">
                  Aktiv: {wallet.address}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card border-accent/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent font-medium">Tipp:</span> Du kannst QR-Code Bilder auf Diensten wie
            <a
              href="https://imgur.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline ml-1"
            >
              Imgur
            </a>{" "}
            hochladen und die Bild-URL hier einfügen.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CryptoSettingsTab

"use client"

import Link from "next/link"
import { ShoppingBag, Shield, Truck, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import MatrixRain from "@/components/matrix-rain"
import Banner from "@/components/banner"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      <MatrixRain />

      {/* Hero Section with neon cityscape wallpaper */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/fromnlwall.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-[0_0_30px_rgba(255,102,0,0.8)]">
            <span className="text-dutch-orange">FROM</span>
            <span className="text-white">NL</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Best Quality Dutch Premium Products. From Utrecht to the World.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-dutch-orange hover:bg-dutch-orange/90 text-white shadow-[0_0_20px_rgba(255,102,0,0.5)]"
          >
            <Link href="#premium">Explore Products</Link>
          </Button>
        </div>
      </section>

      {/* Minimalist Dutch flag cityscape section */}
      <section className="relative py-20 overflow-hidden border-t border-dutch-orange/30">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/brande-20es-20als-20-fromnl.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center py-8">
          <h2 className="text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,102,0,0.5)]">
            Premium Dutch Quality Guaranteed
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-dutch-orange" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Only the finest Dutch products</p>
            </Card>

            <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-dutch-blue" />
              </div>
              <h3 className="font-semibold mb-2">Discrete Shipping</h3>
              <p className="text-sm text-muted-foreground">Worldwide delivery available</p>
            </Card>

            <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-dutch-red/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-dutch-red" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-sm text-muted-foreground">Guaranteed competitive pricing</p>
            </Card>

            <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Language</h3>
              <p className="text-sm text-muted-foreground">German, English, Dutch support</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience Dutch Quality?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers worldwide who trust FromNL.pro
          </p>
          <Button asChild size="lg" className="bg-dutch-orange hover:bg-dutch-orange/90 text-white">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <Banner />
    </div>
  )
}

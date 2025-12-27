"use client"

import Link from "next/link"
import { ShoppingBag, Shield, Truck, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import MatrixRain from "@/components/matrix-rain"
import Banner from "@/components/banner"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      <MatrixRain />

      <HeroSection />

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

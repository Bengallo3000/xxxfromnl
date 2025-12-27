import Link from "next/link"
import { ShoppingBag, Shield, Truck, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/modern-abstract-orange-blue-gradient-background.jpg')] bg-cover bg-center bg-fixed" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <p className="text-sm font-medium text-primary">From Utrecht to the World</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Best Quality Dutch Production
            <span className="block mt-2 bg-gradient-to-r from-dutch-orange via-dutch-red to-dutch-blue bg-clip-text text-transparent">
              Premium Products from Utrecht
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Experience the finest Dutch craftsmanship. Premium quality production from the heart of the Netherlands,
            delivered discreetly worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-dutch-orange hover:bg-dutch-orange/90 text-white">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
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
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingBag, Shield, Truck, Globe, Star, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import MatrixRain from "@/components/matrix-rain"
import Banner from "@/components/banner"

interface SectionSettings {
  showFreeTools: boolean
  showPremiumProducts: boolean
}

export default function HomePage() {
  const [sections, setSections] = useState<SectionSettings>({
    showFreeTools: true,
    showPremiumProducts: true,
  })

  useEffect(() => {
    const loadSections = () => {
      const saved = localStorage.getItem("site_sections")
      if (saved) {
        setSections(JSON.parse(saved))
      }
    }

    loadSections()

    const handleSectionsUpdate = () => {
      loadSections()
    }

    window.addEventListener("sections-updated", handleSectionsUpdate)
    return () => window.removeEventListener("sections-updated", handleSectionsUpdate)
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <MatrixRain />

      {/* Hero Section with neon cityscape wallpaper */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/fromnl-wallpaper.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-sm text-cyan-300 mb-8 tracking-widest">Hi, Premium Dutch Quality</p>
          <h1 className="text-9xl lg:text-[280px] font-black mb-8 text-white drop-shadow-[0_0_120px_rgba(255,255,255,0.95)] drop-shadow-[0_0_60px_rgba(255,255,255,0.8)] tracking-tighter leading-none">
            fromNL
          </h1>
          <p className="text-2xl md:text-4xl text-white font-light tracking-widest mb-16 drop-shadow-[0_0_30px_rgba(0,0,0,0.7)]">
            ONLY BEST DUTCH
            <br />
            QUALITY
          </p>

          {/* Trust badges */}
          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center gap-2 text-slate-300">
              <Trophy className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Trusted Quality</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Truck className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Discrete Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShoppingBag className="w-5 h-5 text-slate-400" />
              <span className="text-sm">Premium Products</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg">▼ Explore Products</Button>
            <Button
              variant="outline"
              className="border-slate-300 text-slate-300 hover:bg-slate-800/50 px-8 py-3 text-lg bg-transparent backdrop-blur"
            >
              Premium Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-800/50 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-400">Dutch Origin</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-400">Support</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-slate-400">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Black Friday Sale Banner */}
      <section className="py-8 px-4 bg-red-900/30 border-l-4 border-red-500">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎉</div>
            <div>
              <h3 className="text-xl font-bold text-white">Black Friday Sale</h3>
              <p className="text-slate-300 text-sm">50% off on all premium products! Limited time only.</p>
            </div>
            <Button variant="link" className="text-red-400 hover:text-red-300 ml-auto">
              Mehr erfahren →
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🏷️</span>
            <h2 className="text-2xl font-bold text-white">Categories</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {["All", "Development", "Security", "Utilities", "AI Tools", "Accounts", "Gaming"].map((cat) => (
              <Button
                key={cat}
                size="sm"
                className={
                  cat === "All"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {sections.showFreeTools && (
        <section className="py-12 border-t border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-bold text-white">FREE TOOLS & SOFTWARE</h2>
            </div>
            <div className="bg-slate-800 rounded p-8 text-center text-slate-400">
              <p>No free products in this category.</p>
            </div>
          </div>
        </section>
      )}

      {sections.showPremiumProducts && (
        <section id="premium" className="py-12 border-t border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">👑</span>
              <h2 className="text-2xl font-bold text-white">PREMIUM PRODUCTS</h2>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded p-4 mb-8 flex items-center gap-3">
              <span className="text-blue-400">ℹ️</span>
              <p className="text-blue-300 text-sm">
                Premium products can be paid with cryptocurrency. Secure transactions with Bitcoin, Ethereum and more.
              </p>
            </div>

            <div className="bg-slate-800 rounded p-8 text-center text-slate-400">
              <p>No premium products in this category.</p>
            </div>
          </div>
        </section>
      )}

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

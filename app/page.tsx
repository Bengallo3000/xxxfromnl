import Link from "next/link"
import Image from "next/image"
import { Shield, Truck, Star, Check, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Alle", active: true },
  { name: "Development", active: false },
  { name: "Security", active: false },
  { name: "Utilities", active: false },
  { name: "AI Tools", active: false },
  { name: "Accounts", active: false },
  { name: "Gaming", active: false },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fromnl-wallpaper.jpg"
            alt="FromNL Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <div className="inline-block mb-4 px-4 py-1 border border-primary/30 rounded-full bg-background/30 backdrop-blur">
            <p className="text-sm text-primary">★ Premium Dutch Quality</p>
          </div>
          
          <div className="mb-4">
            <Image
              src="/fromnl-logo.png"
              alt="FromNL Logo"
              width={280}
              height={280}
              className="mx-auto rounded-lg"
              style={{ width: 'auto', height: 'auto', maxWidth: '280px' }}
            />
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 tracking-widest font-light">
            ONLY BEST DUTCH QUALITY
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Trusted Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Discrete Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Premium Products</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white btn-glow px-8">
              <Link href="/products" className="flex items-center gap-2">
                Explore Products
                <span>→</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
              <Link href="/products">Premium Collection</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/60">Dutch Origin</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/60">Support</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
              </div>
              <div className="text-sm text-white/60">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-y border-primary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Black Friday Sale</span>
            <span className="text-muted-foreground">50% off on all premium products! Limited time only.</span>
            <Link href="/products" className="ml-auto text-primary hover:underline text-sm flex items-center gap-1">
              Mehr erfahren →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">Categories</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  cat.active 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/brande_es_als__FromNL.top__1766918480964.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">FREE TOOLS & SOFTWARE</h2>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-lg p-12 text-center border border-border/50">
            <p className="text-muted-foreground">No free products in this category.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-semibold">PREMIUM PRODUCTS</h2>
          </div>
          
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mb-8 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm">Premium products can be paid with cryptocurrency. Secure transactions with Bitcoin, Ethereum and more.</span>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-lg p-12 text-center border border-border/50">
            <p className="text-muted-foreground">No premium products in this category.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

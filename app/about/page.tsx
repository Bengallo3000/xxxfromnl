import { Card } from "@/components/ui/card"
import { Shield, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About TechVerseHub.xyz</h1>
            <p className="text-xl text-muted-foreground">Your trusted source for premium software and digital tools</p>
          </div>

          <Card className="p-8 mb-8 border-primary/20 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              TechVerseHub.xyz was founded with a simple mission: to bring the finest software and digital tools directly to
              customers worldwide. We believe in providing high-quality digital products that empower users.
            </p>
            <p className="text-muted-foreground">
              With years of experience in sourcing and distributing premium software, we have built a reputation for
              reliability, security, and exceptional customer service. Our commitment to quality ensures that every
              product meets the highest standards.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-dutch-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Every product is carefully vetted to ensure it meets our strict quality standards.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-dutch-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
              <p className="text-muted-foreground">
                Only the finest products from trusted Dutch sources make it to our catalog.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-dutch-red/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-dutch-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Worldwide Shipping</h3>
              <p className="text-muted-foreground">Discrete and reliable shipping to customers around the globe.</p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-muted-foreground">Your satisfaction and privacy are our top priorities.</p>
            </Card>
          </div>

          <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">Multi-Language Support</h2>
            <p className="text-muted-foreground mb-4">
              We proudly serve customers in multiple languages including German, English, and Dutch. Our customer
              service team is available to assist you in your preferred language.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-dutch-orange/10 text-dutch-orange font-medium">
                🇩🇪 Deutsch
              </span>
              <span className="px-4 py-2 rounded-full bg-dutch-blue/10 text-dutch-blue font-medium">🇬🇧 English</span>
              <span className="px-4 py-2 rounded-full bg-dutch-red/10 text-dutch-red font-medium">🇳🇱 Nederlands</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

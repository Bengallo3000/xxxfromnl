import { Card } from "@/components/ui/card"
import { Shield, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About FromNL.pro</h1>
            <p className="text-xl text-muted-foreground">Best quality Dutch production from Utrecht to the world</p>
          </div>

          <Card className="p-8 mb-8 border-primary/20 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              FromNL.pro was founded in the historic city of Utrecht with a singular vision: to bring the finest Dutch
              quality products directly to customers worldwide. We represent the best of Dutch production, combining
              centuries of craftsmanship with modern excellence.
            </p>
            <p className="text-muted-foreground mb-4">
              Based in Utrecht, the beating heart of the Netherlands, we have built our reputation on delivering only
              the highest quality products. Every item in our collection represents the pinnacle of Dutch craftsmanship
              and production standards that have made the Netherlands famous worldwide.
            </p>
            <p className="text-muted-foreground">
              From Utrecht to the world - we are proud to share Dutch excellence with customers on every continent,
              maintaining the same commitment to quality and discretion that has defined our brand since day one.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-dutch-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Dutch Quality</h3>
              <p className="text-muted-foreground">
                Every product meets the strictest Dutch production standards. Only the best quality makes it to our
                catalog.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-dutch-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Utrecht Excellence</h3>
              <p className="text-muted-foreground">
                Sourced directly from trusted producers in Utrecht and throughout the Netherlands.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-dutch-red/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-dutch-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Worldwide Distribution</h3>
              <p className="text-muted-foreground">
                From Utrecht to every corner of the world - discrete, reliable, and secure shipping.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
              <p className="text-muted-foreground">
                Years of experience delivering Dutch quality products to satisfied customers globally.
              </p>
            </Card>
          </div>

          <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">Multi-Language Support</h2>
            <p className="text-muted-foreground mb-4">
              We proudly serve customers in multiple languages including German, English, and Dutch. Our customer
              service team is available to assist you in your preferred language, ensuring a seamless experience from
              Utrecht to your doorstep.
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

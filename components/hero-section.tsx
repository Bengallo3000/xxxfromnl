"use client"

import { ChevronDown, Package, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("premium")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/brande-20es-20als-20-fromnl.jpg)` }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 bg-gradient-to-t from-dutch-orange/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center pt-20">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8 animate-fade-in">
          <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-full text-sm font-medium border border-dutch-orange/50 shadow-lg shadow-dutch-orange/20">
            🇳🇱 Premium Dutch Quality
          </span>
        </div>

        {/* Title - styled for FromNL */}
        <div className="relative mb-10 animate-fade-in text-center">
          <h1 className="font-display text-[6rem] md:text-[10rem] lg:text-[14rem] font-black tracking-tight leading-none">
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]">From</span>
            <span className="text-dutch-orange drop-shadow-[0_0_60px_rgba(255,102,0,1)]">NL</span>
          </h1>
          <p className="mt-8 text-2xl md:text-4xl lg:text-5xl text-white font-display tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(255,102,0,0.8)]">
            Only Best Dutch Quality
          </p>
        </div>

        {/* Features row */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in">
          {[
            { icon: Shield, label: "Trusted Quality" },
            { icon: Truck, label: "Discrete Shipping" },
            { icon: Package, label: "Premium Products" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-dutch-orange/30 shadow-lg shadow-dutch-orange/10"
            >
              <feature.icon className="w-4 h-4 text-dutch-orange" />
              <span className="text-sm font-medium text-white">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 animate-fade-in">
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="font-display text-base px-10 py-6 gap-3 bg-gradient-to-r from-dutch-orange to-dutch-red hover:from-dutch-orange/90 hover:to-dutch-red/90 text-white shadow-lg shadow-dutch-orange/50 hover:shadow-dutch-orange/70 transition-all"
          >
            <Package className="w-5 h-5" />
            Explore Products
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById("premium")?.scrollIntoView({ behavior: "smooth" })}
            className="font-display text-base px-10 py-6 border-dutch-orange/50 text-dutch-orange hover:bg-dutch-orange/20 hover:border-dutch-orange transition-all backdrop-blur-md bg-black/30"
          >
            Premium Collection
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in">
          {[
            { value: "100%", label: "Dutch Origin" },
            { value: "24/7", label: "Support" },
            { value: "★★★★★", label: "Reviews" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-black/50 backdrop-blur-md rounded-xl p-4 border border-dutch-orange/30 shadow-lg shadow-dutch-orange/10"
            >
              <div className="font-display text-2xl md:text-3xl text-dutch-orange font-bold drop-shadow-[0_0_20px_rgba(255,102,0,1)]">
                {stat.value}
              </div>
              <div className="text-sm text-white/70 mt-1 font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-white/60 font-medium">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-dutch-orange/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-dutch-orange rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

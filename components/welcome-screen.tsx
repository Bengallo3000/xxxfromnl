"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe } from "lucide-react"
import MatrixRain from "@/components/matrix-rain"

interface WelcomeScreenProps {
  onContinue: () => void
}

const WelcomeScreen = ({ onContinue }: WelcomeScreenProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(/fromnl-wallpaper.jpg)` }}
      />
      <MatrixRain />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-blue-600 z-10" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo Animation */}
        <div className="mb-8 animate-fade-in">
          <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <img
              src="/fromnl-logo.png"
              alt="FromNL Logo"
              className={`w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(255,102,0,0.8)] transition-all duration-500 ${isHovering ? "scale-110" : ""}`}
            />
            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-display text-5xl md:text-7xl text-center mb-4 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(255,102,0,0.8)]">FROM</span>
          <span className="text-foreground">NL</span>
          <span className="text-blue-600">.PRO</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-muted-foreground text-lg md:text-xl text-center max-w-md mb-8 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Premium Dutch Quality. Direct from Netherlands. Best Products.
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xs text-muted-foreground">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs text-muted-foreground">Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <Globe className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xs text-muted-foreground">Worldwide</span>
          </div>
        </div>

        {/* Enter Button */}
        <Button
          size="lg"
          onClick={onContinue}
          className="gap-3 text-lg px-8 py-6 bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-500 hover:to-blue-500 text-white shadow-[0_0_30px_rgba(255,102,0,0.5)] hover:shadow-[0_0_50px_rgba(255,102,0,0.7)] transition-all animate-fade-in group border border-orange-400/30"
          style={{ animationDelay: "0.8s" }}
        >
          Enter Shop
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Age Verification Notice */}
        <p
          className="text-xs text-muted-foreground mt-8 text-center max-w-sm animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          By entering, you confirm that you are of legal age in your country.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-blue-600 z-10" />
    </div>
  )
}

export default WelcomeScreen

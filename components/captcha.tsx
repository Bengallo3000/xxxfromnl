"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, RefreshCw, Terminal, Lock } from "lucide-react"
import MatrixRain from "@/components/matrix-rain"

interface CaptchaProps {
  onVerified: () => void
}

const Captcha = ({ onVerified }: CaptchaProps) => {
  const [captchaCode, setCaptchaCode] = useState("")
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState(false)

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let code = ""
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(code)
    setUserInput("")
    setError(false)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = () => {
    if (userInput.toUpperCase() === captchaCode) {
      onVerified()
    } else {
      setError(true)
      generateCaptcha()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: `url(/captcha-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Matrix Rain Effect */}
      <MatrixRain />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 scanlines opacity-20" />

      <div className="relative z-10 data-panel p-8 rounded-lg max-w-md w-full mx-4 animate-scale-in border border-primary/30">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">security_check.exe</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Shield className="w-10 h-10 text-primary animate-pulse-glow" />
            <Lock className="w-4 h-4 text-primary absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-primary text-glow">SECURITY CHECK</h2>
            <p className="font-mono text-xs text-muted-foreground">access_verification.protocol</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-mono">
          <Terminal className="w-4 h-4 text-primary" />
          <span>&gt; Verify your identity_</span>
        </div>

        <div className="relative mb-6">
          <div className="bg-secondary/50 p-6 rounded border border-primary/20 flex items-center justify-center gap-2 select-none">
            {captchaCode.split("").map((char, i) => (
              <span
                key={i}
                className="font-display text-4xl text-primary"
                style={{
                  transform: `rotate(${Math.random() * 16 - 8}deg) translateY(${Math.random() * 4 - 2}px)`,
                  display: "inline-block",
                  textShadow: "0 0 20px hsl(175 100% 50% / 0.8), 0 0 40px hsl(175 100% 50% / 0.4)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <button
            onClick={generateCaptcha}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="> ENTER CODE..."
          className="mb-4 bg-secondary/50 border-primary/30 text-foreground placeholder:text-muted-foreground uppercase tracking-[0.3em] font-mono focus:border-primary focus:ring-primary/30"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm mb-4 animate-fade-in font-mono">
            <span className="w-2 h-2 bg-destructive rounded-full" />
            ERROR: Wrong code. Please try again.
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full font-display bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all btn-cyber"
        >
          GRANT ACCESS
        </Button>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="text-xs text-muted-foreground font-mono">TECHVERSEHUB.XYZ © {new Date().getFullYear()}</p>
          <p className="text-xs text-primary/60 mt-1 font-display tracking-widest">PREMIUM TECH TOOLS</p>
        </div>
      </div>
    </div>
  )
}

export default Captcha

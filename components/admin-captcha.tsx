"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, RefreshCw, Terminal, Lock, X } from "lucide-react"

interface AdminCaptchaProps {
  onVerified: () => void
  onCancel: () => void
}

const AdminCaptcha = ({ onVerified, onCancel }: AdminCaptchaProps) => {
  const [captchaCode, setCaptchaCode] = useState("")
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState(0)

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
      setAttempts((prev) => prev + 1)
      generateCaptcha()

      // After 3 failed attempts, close the captcha
      if (attempts >= 2) {
        setTimeout(() => {
          onCancel()
        }, 1500)
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundImage: `url(/captcha-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative data-panel p-8 rounded-lg max-w-md w-full mx-4 animate-scale-in border border-accent/30">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
          </div>
          <span className="font-mono text-xs text-muted-foreground ml-2">admin_verify.exe</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Shield className="w-10 h-10 text-accent animate-pulse-glow" />
            <Lock className="w-4 h-4 text-accent absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-accent text-glow-accent">ADMIN VERIFICATION</h2>
            <p className="font-mono text-xs text-muted-foreground">secure_access.protocol</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-mono">
          <Terminal className="w-4 h-4 text-accent" />
          <span>&gt; Enter the code to proceed_</span>
        </div>

        <div className="relative mb-6">
          <div className="bg-secondary/50 p-6 rounded border border-accent/20 flex items-center justify-center gap-2 select-none">
            {captchaCode.split("").map((char, i) => (
              <span
                key={i}
                className="font-display text-4xl text-accent"
                style={{
                  transform: `rotate(${Math.random() * 16 - 8}deg) translateY(${Math.random() * 4 - 2}px)`,
                  display: "inline-block",
                  textShadow: "0 0 20px hsl(45 100% 50% / 0.8), 0 0 40px hsl(45 100% 50% / 0.4)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <button
            onClick={generateCaptcha}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-accent transition-colors hover:bg-accent/10 rounded"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="> ENTER CODE..."
          className="mb-4 bg-secondary/50 border-accent/30 text-foreground placeholder:text-muted-foreground uppercase tracking-[0.3em] font-mono focus:border-accent focus:ring-accent/30"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm mb-4 animate-fade-in font-mono">
            <span className="w-2 h-2 bg-destructive rounded-full" />
            ERROR: Wrong code. {3 - attempts} attempts remaining.
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full font-display bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all btn-cyber"
        >
          VERIFY ACCESS
        </Button>

        <div className="mt-6 pt-4 border-t border-accent/10 text-center">
          <p className="text-xs text-muted-foreground font-mono">Secure Admin Access</p>
        </div>
      </div>
    </div>
  )
}

export default AdminCaptcha

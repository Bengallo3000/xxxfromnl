"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MatrixEffect } from '@/components/matrix-effect'
import { Button } from '@/components/ui/button'
import { Shield, Lock } from 'lucide-react'

export default function EnterPage() {
  const router = useRouter()
  const [captchaCode, setCaptchaCode] = useState('')
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    generateCaptcha()
    const hasAccess = sessionStorage.getItem('shop_access')
    if (hasAccess === 'granted') {
      router.push('/')
    }
  }, [router])

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(code)
    setUserInput('')
    setError('')
  }

  const handleVerify = () => {
    if (userInput.toUpperCase() === captchaCode) {
      setVerified(true)
      sessionStorage.setItem('shop_access', 'granted')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      setError('Falscher Code. Bitte erneut versuchen.')
      generateCaptcha()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify()
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <MatrixEffect opacity={0.3} />
      
      <div className="relative z-10 text-center p-8">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-black mb-2 tracking-tight">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">from</span>
            <span className="bg-gradient-to-b from-[#FF1E1E] via-[#FFFFFF] to-[#0033CC] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,30,30,0.6)]">NL</span>
          </h1>
          <p className="text-green-400/80 text-sm tracking-[0.3em] font-mono">PREMIUM DUTCH QUALITY</p>
        </div>

        <div className="bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 max-w-md mx-auto shadow-[0_0_50px_rgba(0,255,0,0.1)]">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-green-400">Sicherheitsüberprüfung</h2>
          </div>

          {!verified ? (
            <>
              <p className="text-gray-400 mb-6 text-sm">
                Bitte geben Sie den Code ein, um fortzufahren
              </p>

              <div className="bg-black/60 border border-green-500/50 rounded-lg p-4 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5" />
                <div className="font-mono text-4xl tracking-[0.5em] text-green-400 select-none relative"
                     style={{
                       textShadow: '0 0 10px rgba(0,255,0,0.5)',
                       letterSpacing: '0.5em'
                     }}>
                  {captchaCode.split('').map((char, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      transform: `rotate(${Math.random() * 20 - 10}deg) translateY(${Math.random() * 4 - 2}px)`,
                    }}>
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Code eingeben..."
                maxLength={6}
                className="w-full bg-black/60 border border-green-500/30 rounded-lg p-3 text-center text-xl font-mono text-green-400 placeholder-green-400/30 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/50 mb-4 tracking-widest"
              />

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={generateCaptcha}
                  variant="outline"
                  className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  Neuer Code
                </Button>
                <Button
                  onClick={handleVerify}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Verifizieren
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-400 text-lg font-bold mb-2">Verifiziert!</p>
              <p className="text-gray-400 text-sm">Weiterleitung zum Shop...</p>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-xs mt-8">
          Mit dem Betreten bestätigst du, dass du 18+ Jahre alt bist
        </p>
      </div>
    </div>
  )
}

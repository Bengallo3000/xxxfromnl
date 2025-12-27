"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, InstagramIcon as TelegramIcon, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupportSettings {
  telegramId: string
  sessionId: string
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<SupportSettings>({ telegramId: "", sessionId: "" })

  useEffect(() => {
    const saved = localStorage.getItem("support_settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error("[v0] Failed to parse support settings:", e)
        setSettings({ telegramId: "fromnl_support", sessionId: "" })
      }
    } else {
      setSettings({ telegramId: "fromnl_support", sessionId: "" })
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-black/90 backdrop-blur-xl rounded-lg border border-dutch-orange/30 overflow-hidden animate-scale-in mb-2 shadow-xl shadow-dutch-orange/20">
          <div className="bg-dutch-orange/20 p-4 border-b border-dutch-orange/30">
            <h4 className="font-display text-dutch-orange text-glow-accent">Live Support</h4>
            <p className="text-xs text-white/60">Wähle einen Kanal</p>
          </div>

          <div className="p-4 space-y-3">
            <a
              href={settings.telegramId ? `https://t.me/${settings.telegramId}` : "https://t.me/fromnl_support"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded bg-white/5 hover:bg-white/10 transition-colors group border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
                <TelegramIcon className="w-5 h-5 text-[#0088cc]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-dutch-orange transition-colors">
                  Telegram
                </p>
                <p className="text-xs text-white/60">Schnelle Antworten 24/7</p>
              </div>
            </a>

            {settings.sessionId && (
              <>
                <a
                  href="https://getsession.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded bg-white/5 hover:bg-white/10 transition-colors group border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00F782]/20 flex items-center justify-center">
                    <Hash className="w-5 h-5 text-[#00F782]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-dutch-orange transition-colors">
                      Session
                    </p>
                    <p className="text-xs text-white/60">Maximale Privatsphäre</p>
                  </div>
                </a>

                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-xs text-white/60 mb-1">Session ID:</p>
                  <p className="text-xs font-mono text-dutch-orange break-all select-all">{settings.sessionId}</p>
                </div>
              </>
            )}
          </div>

          <div className="p-3 bg-white/5 border-t border-white/10">
            <p className="text-xs text-white/60 text-center">Antwortzeit: ~5 Minuten</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="w-14 h-14 rounded-full bg-dutch-orange hover:bg-dutch-orange/90 cyber-glow-orange"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  )
}

export default ChatWidget

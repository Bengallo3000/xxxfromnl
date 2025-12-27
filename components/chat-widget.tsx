"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send as TelegramIcon, Hash } from "lucide-react"
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
      setSettings(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 glass-card rounded-lg border border-primary/30 overflow-hidden animate-scale-in mb-2">
          <div className="bg-primary/10 p-4 border-b border-border/50">
            <h4 className="font-display text-primary text-glow">Live Support</h4>
            <p className="text-xs text-muted-foreground">Wähle einen Kanal</p>
          </div>

          <div className="p-4 space-y-3">
            <a
              href={settings.telegramId ? `https://t.me/${settings.telegramId}` : "https://t.me/your_bot"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
                <TelegramIcon className="w-5 h-5 text-[#0088cc]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Telegram
                </p>
                <p className="text-xs text-muted-foreground">Schnelle Antworten 24/7</p>
              </div>
            </a>

            <a
              href={settings.sessionId ? `https://getsession.org/` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#00F782]/20 flex items-center justify-center">
                <Hash className="w-5 h-5 text-[#00F782]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Session
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {settings.sessionId || "ID im Admin festlegen"}
                </p>
              </div>
            </a>

            {settings.sessionId && (
              <div className="p-2 bg-card/50 rounded border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Session ID:</p>
                <p className="text-xs font-mono text-primary break-all select-all">{settings.sessionId}</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-muted/30 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">Antwortzeit: ~5 Minuten</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="w-14 h-14 rounded-full neon-glow animate-pulse-glow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  )
}

export default ChatWidget

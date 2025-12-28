"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

interface SiteSettings {
  [key: string]: string
}

export function SupportButton() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(data)
      if (data.messenger_id) {
        setIsVisible(true)
      }
    } catch (error) {
      console.log('Error loading settings')
    }
  }

  if (!isVisible || !settings.messenger_id) {
    return null
  }

  return (
    <a
      href={`https://m.me/${settings.messenger_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center gap-2"
      title={settings.support_button_text || "Contact Support"}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}

"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

interface Popup {
  id: number
  title: string
  content: string
  image_url: string
  button_text: string
  button_url: string
  popup_type: string
  position: string
  bg_color: string
  text_color: string
  is_active: boolean
}

export function ShopPopup() {
  const [popups, setPopups] = useState<Popup[]>([])
  const [dismissedPopups, setDismissedPopups] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchPopups()
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('dismissed_popups')
      if (dismissed) {
        try {
          setDismissedPopups(JSON.parse(dismissed))
        } catch (e) {
          console.log('Error parsing dismissed popups')
        }
      }
    }
  }, [])

  const fetchPopups = async () => {
    try {
      const res = await fetch('/api/popups')
      const data = await res.json()
      if (Array.isArray(data)) {
        setPopups(data.filter((p: Popup) => p.is_active))
      }
    } catch (error) {
      console.log('Error loading popups')
    }
  }

  const dismissPopup = (id: number) => {
    const newDismissed = [...dismissedPopups, id]
    setDismissedPopups(newDismissed)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dismissed_popups', JSON.stringify(newDismissed))
    }
  }

  if (!mounted) return null

  const bannerPopups = popups.filter(p => p.popup_type === 'banner' && !dismissedPopups.includes(p.id))
  const floatingPopups = popups.filter(p => p.popup_type === 'floating' && !dismissedPopups.includes(p.id))
  const modalPopups = popups.filter(p => p.popup_type === 'modal' && !dismissedPopups.includes(p.id))
  const slidePopups = popups.filter(p => p.popup_type === 'slide' && !dismissedPopups.includes(p.id))

  return (
    <>
      {bannerPopups.map((popup) => (
        <div
          key={popup.id}
          className="relative w-full py-3 px-4 text-center"
          style={{ backgroundColor: popup.bg_color, color: popup.text_color }}
        >
          <div className="container mx-auto flex items-center justify-center gap-4">
            <div>
              <span className="font-bold">{popup.title}</span>
              {popup.content && <span className="ml-2">{popup.content}</span>}
            </div>
            {popup.button_text && popup.button_url && (
              <Link
                href={popup.button_url}
                className="px-4 py-1 rounded-full text-sm font-medium transition-colors"
                style={{ backgroundColor: popup.text_color, color: popup.bg_color }}
              >
                {popup.button_text}
              </Link>
            )}
          </div>
          <button
            onClick={() => dismissPopup(popup.id)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70"
            style={{ color: popup.text_color }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {floatingPopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-2xl animate-pulse"
          style={{ backgroundColor: popup.bg_color, color: popup.text_color }}
        >
          <button
            onClick={() => dismissPopup(popup.id)}
            className="absolute top-2 right-2 p-1 hover:opacity-70"
            style={{ color: popup.text_color }}
          >
            <X className="w-4 h-4" />
          </button>
          <div className="font-bold text-lg mb-1">{popup.title}</div>
          {popup.content && <div className="text-sm opacity-90 mb-3">{popup.content}</div>}
          {popup.button_text && popup.button_url && (
            <Link
              href={popup.button_url}
              className="inline-block px-4 py-2 rounded text-sm font-medium transition-colors"
              style={{ backgroundColor: popup.text_color, color: popup.bg_color }}
            >
              {popup.button_text}
            </Link>
          )}
        </div>
      ))}

      {slidePopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 shadow-2xl transform transition-transform"
          style={{ backgroundColor: popup.bg_color, color: popup.text_color }}
        >
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="font-bold">{popup.title}</div>
              {popup.content && <div className="text-sm opacity-90">{popup.content}</div>}
            </div>
            <div className="flex items-center gap-4">
              {popup.button_text && popup.button_url && (
                <Link
                  href={popup.button_url}
                  className="px-4 py-2 rounded text-sm font-medium transition-colors"
                  style={{ backgroundColor: popup.text_color, color: popup.bg_color }}
                >
                  {popup.button_text}
                </Link>
              )}
              <button
                onClick={() => dismissPopup(popup.id)}
                className="p-1 hover:opacity-70"
                style={{ color: popup.text_color }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {modalPopups.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          {modalPopups.slice(0, 1).map((popup) => (
            <div
              key={popup.id}
              className="relative max-w-md w-full mx-4 p-6 rounded-lg shadow-2xl"
              style={{ backgroundColor: popup.bg_color, color: popup.text_color }}
            >
              <button
                onClick={() => dismissPopup(popup.id)}
                className="absolute top-4 right-4 p-1 hover:opacity-70"
                style={{ color: popup.text_color }}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="font-bold text-2xl mb-2">{popup.title}</div>
              {popup.content && <div className="text-lg opacity-90 mb-4">{popup.content}</div>}
              {popup.button_text && popup.button_url && (
                <Link
                  href={popup.button_url}
                  onClick={() => dismissPopup(popup.id)}
                  className="inline-block w-full text-center px-6 py-3 rounded text-lg font-medium transition-colors"
                  style={{ backgroundColor: popup.text_color, color: popup.bg_color }}
                >
                  {popup.button_text}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

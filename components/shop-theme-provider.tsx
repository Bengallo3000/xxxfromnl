"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface ShopTheme {
  id: number
  name: string
  is_active: boolean
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  text_color: string
  header_style: string
  font_family: string
}

const ShopThemeContext = createContext<ShopTheme | null>(null)

export function useShopTheme() {
  return useContext(ShopThemeContext)
}

export function ShopThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ShopTheme | null>(null)

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch('/api/themes')
        const themes = await response.json()
        if (Array.isArray(themes)) {
          const activeTheme = themes.find((t: ShopTheme) => t.is_active)
          if (activeTheme) {
            setTheme(activeTheme)
            applyTheme(activeTheme)
          }
        }
      } catch (error) {
        console.error('Failed to load theme:', error)
      }
    }

    fetchTheme()
  }, [])

  const applyTheme = (theme: ShopTheme) => {
    const root = document.documentElement
    
    if (theme.primary_color) {
      root.style.setProperty('--shop-primary', theme.primary_color)
    }
    if (theme.secondary_color) {
      root.style.setProperty('--shop-secondary', theme.secondary_color)
    }
    if (theme.accent_color) {
      root.style.setProperty('--shop-accent', theme.accent_color)
    }
    if (theme.background_color) {
      root.style.setProperty('--shop-background', theme.background_color)
    }
    if (theme.text_color) {
      root.style.setProperty('--shop-text', theme.text_color)
    }
    if (theme.font_family) {
      root.style.setProperty('--shop-font', theme.font_family)
    }
  }

  return (
    <ShopThemeContext.Provider value={theme}>
      {children}
    </ShopThemeContext.Provider>
  )
}

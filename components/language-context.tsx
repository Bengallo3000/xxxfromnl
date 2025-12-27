"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "de" | "nl" | "ru" | "zh" | "ur"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: any
  isRTL: boolean
}

const translations = {
  en: {
    products: {
      free: "Free",
      download: "Download",
      buy: "Buy Now",
    },
  },
  de: {
    products: {
      free: "Kostenlos",
      download: "Herunterladen",
      buy: "Jetzt kaufen",
    },
  },
  nl: {
    products: {
      free: "Gratis",
      download: "Downloaden",
      buy: "Koop nu",
    },
  },
  ru: {
    products: {
      free: "Бесплатно",
      download: "Скачать",
      buy: "Купить",
    },
  },
  zh: {
    products: {
      free: "免费",
      download: "下载",
      buy: "立即购买",
    },
  },
  ur: {
    products: {
      free: "مفت",
      download: "ڈاؤن لوڈ",
      buy: "خریدیں",
    },
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const isRTL = language === "ur"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

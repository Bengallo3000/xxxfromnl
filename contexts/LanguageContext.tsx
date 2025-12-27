"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "de" | "nl" | "ru" | "zh" | "ur"

interface Translations {
  nav: {
    home: string
    products: string
    about: string
    admin: string
  }
  footer: {
    rights: string
  }
  products: {
    free: string
    download: string
    buy: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About",
      admin: "Admin",
    },
    footer: {
      rights: "All rights reserved",
    },
    products: {
      free: "Free",
      download: "Download",
      buy: "Buy Now",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      products: "Produkte",
      about: "Über uns",
      admin: "Admin",
    },
    footer: {
      rights: "Alle Rechte vorbehalten",
    },
    products: {
      free: "Kostenlos",
      download: "Herunterladen",
      buy: "Jetzt kaufen",
    },
  },
  nl: {
    nav: {
      home: "Home",
      products: "Producten",
      about: "Over ons",
      admin: "Admin",
    },
    footer: {
      rights: "Alle rechten voorbehouden",
    },
    products: {
      free: "Gratis",
      download: "Downloaden",
      buy: "Koop nu",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      products: "Продукты",
      about: "О нас",
      admin: "Админ",
    },
    footer: {
      rights: "Все права защищены",
    },
    products: {
      free: "Бесплатно",
      download: "Скачать",
      buy: "Купить",
    },
  },
  zh: {
    nav: {
      home: "首页",
      products: "产品",
      about: "关于",
      admin: "管理",
    },
    footer: {
      rights: "版权所有",
    },
    products: {
      free: "免费",
      download: "下载",
      buy: "立即购买",
    },
  },
  ur: {
    nav: {
      home: "گھر",
      products: "مصنوعات",
      about: "کے بارے میں",
      admin: "ایڈمن",
    },
    footer: {
      rights: "تمام حقوق محفوظ ہیں",
    },
    products: {
      free: "مفت",
      download: "ڈاؤن لوڈ",
      buy: "خریدیں",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  const isRTL = language === "ur"

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || translations.en,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

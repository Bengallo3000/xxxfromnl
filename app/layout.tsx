import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SupportButton } from "@/components/support-button"
import { ShopThemeProvider } from "@/components/shop-theme-provider"
import { ShopPopup } from "@/components/shop-popup"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechVerseHub.xyz | Premium Software & Tools | Digital Downloads",
  description:
    "TechVerseHub.xyz - Your trusted source for premium software, tools and digital products. Instant delivery. Secure transactions. Best prices guaranteed.",
  keywords:
    "techversehub, software, tools, digital products, premium software, instant download, secure, best prices, tech hub",
  authors: [{ name: "TechVerseHub.xyz" }],
  creator: "TechVerseHub.xyz",
  icons: {
    icon: "/techverse-logo.jpg",
    shortcut: "/techverse-logo.jpg",
    apple: "/techverse-logo.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://techversehub.xyz/",
    title: "TechVerseHub.xyz | Premium Software & Tools",
    description:
      "Your trusted source for premium software and digital tools. Instant delivery. Secure transactions worldwide.",
    siteName: "TechVerseHub.xyz",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechVerseHub.xyz | Premium Software & Tools",
    description: "Premium software and digital tools. Instant delivery. Secure transactions worldwide.",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#00FFFF",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ShopThemeProvider>
          <ShopPopup />
          <Header />
          <main>{children}</main>
          <Footer />
          <SupportButton />
          <Toaster />
          <Analytics />
        </ShopThemeProvider>
      </body>
    </html>
  )
}

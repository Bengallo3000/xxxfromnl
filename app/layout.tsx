import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SupportButton } from "@/components/support-button"
import { ShopThemeProvider } from "@/components/shop-theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FromNL.pro | Best Dutch Premium Quality | Direct from Netherlands",
  description:
    "FromNL.pro - Your trusted source for premium Dutch quality products. Direct from the Netherlands. Discrete shipping worldwide. Best prices guaranteed.",
  keywords:
    "fromnl, dutch quality, premium products, netherlands, from nl, dutch shop, premium quality, discrete shipping, best prices",
  authors: [{ name: "FromNL.pro" }],
  creator: "FromNL.pro",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://fromnl.pro/",
    title: "FromNL.pro | Best Dutch Premium Quality",
    description:
      "Your trusted source for premium Dutch quality products. Direct from the Netherlands. Discrete shipping worldwide.",
    siteName: "FromNL.pro",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "FromNL.pro | Best Dutch Premium Quality",
    description: "Premium Dutch quality products. Direct from the Netherlands. Discrete shipping worldwide.",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#FF6600",
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

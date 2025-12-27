import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/LanguageContext"
import ChatWidget from "@/components/chat-widget"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://fromnl.pro"),
  title: {
    default: "FromNL.pro | Best Dutch Premium Quality | Direct from Netherlands",
    template: "%s | FromNL.pro",
  },
  description:
    "FromNL.pro - Your trusted source for premium Dutch quality products. Direct from the Netherlands. Discrete shipping worldwide. Best prices guaranteed. Experience authentic Dutch excellence.",
  keywords: [
    "fromnl",
    "from nl",
    "dutch quality",
    "premium products",
    "netherlands",
    "dutch shop",
    "premium quality",
    "discrete shipping",
    "best prices",
    "dutch products",
    "authentic dutch",
    "netherlands shop",
    "online shop",
    "e-commerce",
  ],
  authors: [{ name: "FromNL.pro" }],
  creator: "FromNL.pro",
  publisher: "FromNL.pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "https://fromnl.pro/",
    title: "FromNL.pro | Best Dutch Premium Quality",
    description:
      "Your trusted source for premium Dutch quality products. Direct from the Netherlands. Discrete shipping worldwide. Best prices guaranteed.",
    siteName: "FromNL.pro",
    locale: "en_US",
    alternateLocale: ["de_DE", "nl_NL"],
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FromNL.pro - Premium Dutch Quality Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FromNL.pro | Best Dutch Premium Quality",
    description:
      "Premium Dutch quality products. Direct from the Netherlands. Discrete shipping worldwide. Best prices guaranteed.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
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
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}

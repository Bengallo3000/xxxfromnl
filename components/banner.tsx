"use client"

import { X } from "lucide-react"

export interface BannerData {
  id: string
  title: string
  description: string
  image?: string
  link?: string
  bgColor?: string
}

interface BannerProps {
  banner?: BannerData
  onClose?: () => void
}

const defaultBanner: BannerData = {
  id: "default",
  title: "🔥 Black Friday Sale",
  description: "50% off on all premium products! Limited time only.",
  image: "/images/fromnlwall.jpg",
  link: "/products",
  bgColor: "linear-gradient(135deg, rgba(255, 102, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)",
}

const Banner = ({ banner = defaultBanner, onClose }: BannerProps) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-dutch-orange/30 bg-black/80 backdrop-blur-xl p-4 md:p-6 animate-fade-in shadow-xl shadow-dutch-orange/10"
      style={banner.bgColor ? { background: banner.bgColor } : undefined}
    >
      <div className="absolute inset-0 scanlines opacity-20" />

      <div className="relative flex flex-col md:flex-row items-center gap-4">
        {banner.image && (
          <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded overflow-hidden border border-dutch-orange/20">
            <img src={banner.image || "/placeholder.svg"} alt={banner.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display text-xl md:text-2xl text-dutch-orange text-glow-accent mb-2">{banner.title}</h3>
          <p className="text-white/80 text-sm md:text-base">{banner.description}</p>
          {banner.link && (
            <a
              href={banner.link}
              className="inline-block mt-3 text-sm text-dutch-orange hover:text-dutch-orange/80 transition-colors underline underline-offset-4"
            >
              Mehr erfahren →
            </a>
          )}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-white/60 hover:text-dutch-orange transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default Banner

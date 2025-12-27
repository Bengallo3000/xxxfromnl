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
  banner: BannerData
  onClose?: () => void
}

const Banner = ({ banner, onClose }: BannerProps) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-4 md:p-6 animate-fade-in"
      style={banner.bgColor ? { background: banner.bgColor } : undefined}
    >
      <div className="absolute inset-0 scanlines opacity-30" />

      <div className="relative flex flex-col md:flex-row items-center gap-4">
        {banner.image && (
          <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded overflow-hidden">
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display text-xl md:text-2xl text-primary text-glow mb-2">{banner.title}</h3>
          <p className="text-muted-foreground text-sm md:text-base">{banner.description}</p>
          {banner.link && (
            <a
              href={banner.link}
              className="inline-block mt-3 text-sm text-accent hover:text-accent/80 transition-colors underline underline-offset-4"
            >
              Mehr erfahren →
            </a>
          )}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default Banner

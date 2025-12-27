"use client"

import { useRef, useState } from "react"

interface VideoIntroProps {
  onComplete: () => void
}

const VideoIntro = ({ onComplete }: VideoIntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isEnding, setIsEnding] = useState(false)

  const handleVideoEnd = () => {
    setIsEnding(true)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  const handleSkip = () => {
    setIsEnding(true)
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isEnding ? "opacity-0" : "opacity-100"
      }`}
    >
      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline onEnded={handleVideoEnd}>
        <source src="/videos/welcome.mp4" type="video/mp4" />
      </video>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 px-6 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/50 text-cyan-400 font-display text-sm rounded hover:bg-cyan-500/20 transition-all duration-300 hover:border-cyan-400"
      >
        SKIP →
      </button>

      {/* Branding */}
      <div className="absolute bottom-8 left-8">
        <p className="text-cyan-400/60 font-display text-xs tracking-widest">TECHVERSEHUB.XYZ</p>
      </div>
    </div>
  )
}

export default VideoIntro

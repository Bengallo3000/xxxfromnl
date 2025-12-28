"use client"

import { useEffect, useRef } from 'react'

interface MatrixEffectProps {
  opacity?: number
  className?: string
}

export function MatrixEffect({ opacity = 0.4, className = "" }: MatrixEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$€£¥₿@#%&*<>[]{}|/\\~^'
    const charArray = chars.split('')
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    const speeds: number[] = Array(columns).fill(0).map(() => 0.5 + Math.random() * 1.5)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const brightness = 0.6 + Math.random() * 0.4
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00ff00'
        ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`
        ctx.font = `bold ${fontSize}px monospace`
        ctx.fillText(char, x, y)

        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#ffffff'
          ctx.fillText(char, x, y)
        }

        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0
        }
        drops[i] += speeds[i]
      }
    }

    const interval = setInterval(draw, 25)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  )
}

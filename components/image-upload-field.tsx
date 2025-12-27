"use client"
import { useState, useRef } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadFieldProps {
  label: string
  value: string
  onChange: (path: string) => void
  hint?: string
  id: string
}

const UPLOADED_IMAGES_KEY = "special_bot_uploaded_images"

export function ImageUploadField({ label, value, onChange, hint, id }: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setPreview(base64)

      // Store in localStorage with a unique key
      const imageKey = `img_${id}_${Date.now()}`
      const storedImages = JSON.parse(localStorage.getItem(UPLOADED_IMAGES_KEY) || "{}")
      storedImages[imageKey] = base64
      localStorage.setItem(UPLOADED_IMAGES_KEY, JSON.stringify(storedImages))

      // Return the key as reference
      onChange(imageKey)
      toast.success("Image uploaded successfully")
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Load preview from stored images if value is a key
  useState(() => {
    if (value && value.startsWith("img_")) {
      const storedImages = JSON.parse(localStorage.getItem(UPLOADED_IMAGES_KEY) || "{}")
      if (storedImages[value]) {
        setPreview(storedImages[value])
      }
    } else if (value && (value.startsWith("data:") || value.startsWith("http"))) {
      setPreview(value)
    }
  })

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            if (e.target.value.startsWith("http") || e.target.value.startsWith("data:")) {
              setPreview(e.target.value)
            }
          }}
          placeholder="Enter URL or upload image"
          className="flex-1"
        />
        <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4" />
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
      </div>

      {preview && (
        <div className="relative inline-block mt-2">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-lg border border-border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {!preview && (
        <div
          className="h-20 w-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Upload, Trash2, Copy, Loader2, ImageIcon, FolderOpen, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface UploadedImage {
  id: string
  name: string
  url: string
  size: number
  created_at: string
  folder: string
}

const STORAGE_KEY = "uploaded_images"

const ImageUploadTab = () => {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [folder, setFolder] = useState("uploads")
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadImages()
  }, [folder])

  const loadImages = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const allImages: UploadedImage[] = JSON.parse(saved)
      setImages(allImages.filter((img) => img.folder === folder))
    } else {
      setImages([])
    }
  }

  const saveImages = (newImages: UploadedImage[]) => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const allImages: UploadedImage[] = saved ? JSON.parse(saved) : []

    // Remove images from current folder and add new ones
    const otherImages = allImages.filter((img) => img.folder !== folder)
    const updatedImages = [...otherImages, ...newImages]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
    setImages(newImages)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: UploadedImage[] = []

    for (const file of Array.from(files)) {
      const reader = new FileReader()

      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          const base64 = reader.result as string
          newImages.push({
            id: `${Date.now()}_${Math.random().toString(36).substring(7)}`,
            name: file.name,
            url: base64,
            size: file.size,
            created_at: new Date().toISOString(),
            folder: folder,
          })
          resolve()
        }
        reader.readAsDataURL(file)
      })
    }

    const allNewImages = [...images, ...newImages]
    saveImages(allNewImages)
    toast({ title: `${newImages.length} Bild(er) hochgeladen` })
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleDelete = (image: UploadedImage) => {
    const updatedImages = images.filter((img) => img.id !== image.id)
    saveImages(updatedImages)
    toast({ title: "Bild gelöscht" })
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    toast({ title: "URL kopiert" })
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">Bilder verwalten</h2>
        <div className="flex items-center gap-2">
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          <Button onClick={() => inputRef.current?.click()} disabled={uploading} className="gap-2">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Bilder hochladen
          </Button>
        </div>
      </div>

      {/* Folder Selection */}
      <Card className="glass-card border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <FolderOpen className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2">
              {["uploads", "products", "banners", "site"].map((f) => (
                <Button key={f} variant={folder === f ? "default" : "outline"} size="sm" onClick={() => setFolder(f)}>
                  {f}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      {images.length === 0 ? (
        <Card className="glass-card border-border/50">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Keine Bilder in diesem Ordner</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="glass-card border-border/50 overflow-hidden group">
              <div className="relative aspect-square bg-muted">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => copyUrl(image.url)} className="h-8 w-8">
                    {copiedUrl === image.url ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(image)} className="h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-xs text-muted-foreground truncate">{image.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUploadTab

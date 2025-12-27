"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Save, X, Upload, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image?: string
}

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const saved = localStorage.getItem("products")
      if (saved) {
        setProducts(JSON.parse(saved))
      }
    } catch (error) {
      console.error("[v0] Failed to load products:", error)
      toast({ title: "Fehler beim Laden von Produkten", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    setProducts(updatedProducts)
    window.dispatchEvent(new Event("products-updated"))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const response = await fetch("/api/admin/products/upload", {
        method: "POST",
        body: uploadFormData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      setFormData({ ...formData, image: data.url })
      toast({ title: "Foto hochgeladen" })
    } catch (error) {
      console.error("[v0] Upload error:", error)
      toast({ title: "Foto-Upload fehlgeschlagen", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  const handleAdd = async () => {
    if (!formData.name || !formData.price) {
      toast({ title: "Bitte Name und Preis ausfüllen", variant: "destructive" })
      return
    }

    try {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
      }
      const updated = [...products, newProduct]
      saveProducts(updated)
      setFormData({ name: "", price: "", description: "", category: "", image: "" })
      setShowForm(false)
      toast({ title: "Produkt hinzugefügt" })
    } catch (error) {
      console.error("[v0] Failed to add product:", error)
      toast({ title: "Fehler beim Hinzufügen", variant: "destructive" })
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const updated = products.map((p) =>
        p.id === id
          ? {
              ...p,
              name: formData.name,
              price: Number.parseFloat(formData.price),
              description: formData.description,
              category: formData.category,
              image: formData.image,
            }
          : p,
      )
      saveProducts(updated)
      setEditingId(null)
      setFormData({ name: "", price: "", description: "", category: "", image: "" })
      toast({ title: "Produkt aktualisiert" })
    } catch (error) {
      console.error("[v0] Failed to update product:", error)
      toast({ title: "Fehler beim Aktualisieren", variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const updated = products.filter((p) => p.id !== id)
      saveProducts(updated)
      toast({ title: "Produkt gelöscht" })
    } catch (error) {
      console.error("[v0] Failed to delete product:", error)
      toast({ title: "Fehler beim Löschen", variant: "destructive" })
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.image || "",
    })
    setShowForm(true)
  }

  if (loading) {
    return <div className="text-muted-foreground">Lade Produkte...</div>
  }

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display text-primary">Produkte verwalten</h2>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="font-mono gap-2">
              <Plus className="w-4 h-4" />
              Neues Produkt
            </Button>
          )}
        </div>

        {(showForm || editingId) && (
          <div className="mb-6 p-4 border border-border rounded-lg bg-background/50 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Produktname</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="z.B. Premium Käse"
                />
              </div>
              <div>
                <Label>Preis (€)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Kategorie</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="z.B. Lebensmittel"
                />
              </div>
              <div>
                <Label>Beschreibung</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Produktbeschreibung"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Produktfoto</Label>
              {formData.image ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 bg-muted rounded overflow-hidden">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <Button asChild variant="outline" disabled={uploading} className="cursor-pointer bg-transparent">
                        <span className="gap-2">
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          Ändern
                        </span>
                      </Button>
                    </label>
                    <Button variant="destructive" size="icon" onClick={() => setFormData({ ...formData, image: "" })}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Button
                    asChild
                    variant="outline"
                    disabled={uploading}
                    className="w-full cursor-pointer gap-2 bg-transparent"
                  >
                    <span>
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      Foto hochladen
                    </span>
                  </Button>
                </label>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={() => (editingId ? handleUpdate(editingId) : handleAdd())} className="gap-2">
                <Save className="w-4 h-4" />
                {editingId ? "Aktualisieren" : "Hinzufügen"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: "", price: "", description: "", category: "", image: "" })
                }}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Abbrechen
              </Button>
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono">Keine Produkte vorhanden.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 border border-border rounded-lg flex gap-4 items-start justify-between hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-4 flex-1 min-w-0">
                  {product.image ? (
                    <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {product.category} • €{product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(product)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default ProductsTab

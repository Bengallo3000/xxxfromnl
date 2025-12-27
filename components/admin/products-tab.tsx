"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProduct, deleteProduct, getProducts, updateProduct } from "@/app/api/admin/products/crud"

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
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("[v0] Failed to load products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!formData.name || !formData.price) return

    try {
      const newProduct = await createProduct({
        ...formData,
        price: Number.parseFloat(formData.price),
      })
      setProducts([...products, newProduct])
      setFormData({ name: "", price: "", description: "", category: "" })
      setShowForm(false)
    } catch (error) {
      console.error("[v0] Failed to add product:", error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const updated = await updateProduct(id, {
        ...formData,
        price: Number.parseFloat(formData.price),
      })
      setProducts(products.map((p) => (p.id === id ? updated : p)))
      setEditingId(null)
      setFormData({ name: "", price: "", description: "", category: "" })
    } catch (error) {
      console.error("[v0] Failed to update product:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete product:", error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
    })
  }

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display text-primary">Manage Products</h2>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="font-mono gap-2">
              <Plus className="w-4 h-4" />
              New Product
            </Button>
          )}
        </div>

        {/* Add/Edit Form */}
        {(showForm || editingId) && (
          <div className="mb-6 p-4 border border-border rounded-lg bg-background/50">
            <div className="grid gap-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Category"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => (editingId ? handleUpdate(editingId) : handleAdd())} className="gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? "Update" : "Add"} Product
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ name: "", price: "", description: "", category: "" })
                  }}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono">No products yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="p-4 border border-border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category} - €{product.price}
                  </p>
                </div>
                <div className="flex gap-2">
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

export async function getProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/products`, {
      cache: "no-store",
    })
    if (!response.ok) throw new Error("Failed to fetch products")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
}

export async function createProduct(data: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create product")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    throw error
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update product")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    throw error
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/products/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete product")
    return await response.json()
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    throw error
  }
}

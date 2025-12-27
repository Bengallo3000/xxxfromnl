import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET all products
export async function GET() {
  try {
    const connection = await db.getConnection()
    const [products] = await connection.query("SELECT * FROM products ORDER BY created_at DESC")
    connection.release()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category_id, image_url } = body

    const connection = await db.getConnection()
    await connection.query(
      "INSERT INTO products (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, category_id, image_url],
    )
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

// PUT update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, price, category_id, image_url, visible } = body

    const connection = await db.getConnection()
    await connection.query(
      "UPDATE products SET name=?, description=?, price=?, category_id=?, image_url=?, visible=? WHERE id=?",
      [name, description, price, category_id, image_url, visible, id],
    )
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const connection = await db.getConnection()
    await connection.query("DELETE FROM products WHERE id=?", [id])
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

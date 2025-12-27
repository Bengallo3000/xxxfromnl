import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const connection = await db.getConnection()
    const [categories] = await connection.query("SELECT * FROM categories ORDER BY order_index ASC")
    connection.release()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug } = body

    const connection = await db.getConnection()
    await connection.query("INSERT INTO categories (name, slug) VALUES (?, ?)", [
      name,
      slug || name.toLowerCase().replace(/\s+/g, "-"),
    ])
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const connection = await db.getConnection()
    await connection.query("DELETE FROM categories WHERE id=?", [id])
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}

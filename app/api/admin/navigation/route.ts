import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const connection = await db.getConnection()
    const [items] = await connection.query("SELECT * FROM navigation ORDER BY order_index ASC")
    connection.release()
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { label, path, order_index } = body

    const connection = await db.getConnection()
    await connection.query("INSERT INTO navigation (label, path, order_index) VALUES (?, ?, ?)", [
      label,
      path,
      order_index || 0,
    ])
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create navigation item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, label, path, order_index, visible } = body

    const connection = await db.getConnection()
    await connection.query("UPDATE navigation SET label=?, path=?, order_index=?, visible=? WHERE id=?", [
      label,
      path,
      order_index,
      visible,
      id,
    ])
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update navigation" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const connection = await db.getConnection()
    await connection.query("DELETE FROM navigation WHERE id=?", [id])
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete navigation item" }, { status: 500 })
  }
}

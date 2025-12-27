import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const connection = await db.getConnection()
    const [settings] = await connection.query("SELECT * FROM site_settings WHERE id=1")
    connection.release()
    return NextResponse.json(settings[0] || {})
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { site_name, logo_url, og_image_url, telegram_id, session_id } = body

    const connection = await db.getConnection()
    await connection.query(
      "UPDATE site_settings SET site_name=?, logo_url=?, og_image_url=?, telegram_id=?, session_id=? WHERE id=1",
      [site_name, logo_url, og_image_url, telegram_id, session_id],
    )
    connection.release()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

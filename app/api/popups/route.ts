import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  try {
    const result = await query('SELECT * FROM popups ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    const result = await query(
      `INSERT INTO popups (title, content, image_url, button_text, button_url, popup_type, position, bg_color, text_color, is_active, show_on_pages, start_date, end_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        data.title,
        data.content || '',
        data.image_url || '',
        data.button_text || '',
        data.button_url || '',
        data.popup_type || 'banner',
        data.position || 'top',
        data.bg_color || '#D64545',
        data.text_color || '#ffffff',
        data.is_active !== false,
        data.show_on_pages || 'all',
        data.start_date || null,
        data.end_date || null
      ]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create popup' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await request.json()
    await query(
      `UPDATE popups SET title=$1, content=$2, image_url=$3, button_text=$4, button_url=$5, popup_type=$6, position=$7, bg_color=$8, text_color=$9, is_active=$10, show_on_pages=$11, start_date=$12, end_date=$13 WHERE id=$14`,
      [
        data.title,
        data.content,
        data.image_url,
        data.button_text,
        data.button_url,
        data.popup_type,
        data.position,
        data.bg_color,
        data.text_color,
        data.is_active,
        data.show_on_pages,
        data.start_date || null,
        data.end_date || null,
        data.id
      ]
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await query('DELETE FROM popups WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  try {
    const result = await query('SELECT * FROM categories ORDER BY sort_order ASC, name ASC')
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
    const { name, slug, image_url } = await request.json()
    const result = await query(
      'INSERT INTO categories (name, slug, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, slug || name.toLowerCase().replace(/\s+/g, '-'), image_url]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, name, slug, image_url, sort_order } = await request.json()
    const result = await query(
      'UPDATE categories SET name = $1, slug = $2, image_url = $3, sort_order = $4 WHERE id = $5 RETURNING *',
      [name, slug || name.toLowerCase().replace(/\s+/g, '-'), image_url, sort_order || 0, id]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await query('DELETE FROM categories WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import formidable from 'formidable'

export async function GET() {
  try {
    const result = await query('SELECT * FROM banners ORDER BY position, sort_order ASC')
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
    const formData = await request.formData()
    const name = formData.get('name') as string
    const link_url = formData.get('link_url') as string
    const position = formData.get('position') as string || 'header'
    const size = formData.get('size') as string || 'medium'
    const image = formData.get('image') as File
    
    let image_url = ''
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'banners')
      await mkdir(uploadDir, { recursive: true })
      const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)
      image_url = `/uploads/banners/${filename}`
    }
    
    const result = await query(
      'INSERT INTO banners (name, image_url, link_url, position, size) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, image_url, link_url, position, size]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, is_active } = await request.json()
    await query('UPDATE banners SET is_active = $1 WHERE id = $2', [is_active, id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await query('DELETE FROM banners WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 })
  }
}

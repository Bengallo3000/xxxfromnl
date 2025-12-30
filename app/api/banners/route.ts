import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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
      const uint8Array = new Uint8Array(bytes)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'banners')
      await mkdir(uploadDir, { recursive: true })
      const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, uint8Array)
      image_url = `/uploads/banners/${filename}`
    }
    
    const result = await query(
      'INSERT INTO banners (name, image_url, link_url, position, size) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, image_url, link_url, position, size]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Banner upload error:', error)
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const contentType = request.headers.get('content-type') || ''
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const id = formData.get('id') as string
      const name = formData.get('name') as string
      const link_url = formData.get('link_url') as string
      const position = formData.get('position') as string
      const size = formData.get('size') as string
      const is_active = formData.get('is_active') === 'true'
      const image = formData.get('image') as File
      let image_url = formData.get('existing_image_url') as string || ''
      
      if (image && image.size > 0) {
        const bytes = await image.arrayBuffer()
        const uint8Array = new Uint8Array(bytes)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'banners')
        await mkdir(uploadDir, { recursive: true })
        const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const filepath = path.join(uploadDir, filename)
        await writeFile(filepath, uint8Array)
        image_url = `/uploads/banners/${filename}`
      }
      
      await query(
        'UPDATE banners SET name = $1, image_url = $2, link_url = $3, position = $4, size = $5, is_active = $6 WHERE id = $7',
        [name, image_url, link_url, position, size, is_active, id]
      )
      return NextResponse.json({ success: true })
    } else {
      const { id, is_active, name, link_url, position, size } = await request.json()
      
      if (name !== undefined) {
        await query(
          'UPDATE banners SET name = $1, link_url = $2, position = $3, size = $4, is_active = $5 WHERE id = $6',
          [name, link_url, position, size, is_active, id]
        )
      } else {
        await query('UPDATE banners SET is_active = $1 WHERE id = $2', [is_active, id])
      }
      return NextResponse.json({ success: true })
    }
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

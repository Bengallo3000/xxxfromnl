import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  try {
    const result = await query('SELECT * FROM shop_themes ORDER BY id ASC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    
    await query('UPDATE shop_themes SET is_active = false')
    await query('UPDATE shop_themes SET is_active = true WHERE id = $1', [id])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to activate theme' }, { status: 500 })
  }
}

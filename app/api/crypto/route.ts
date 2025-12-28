import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  try {
    const result = await query('SELECT * FROM crypto_wallets WHERE is_active = true ORDER BY sort_order ASC')
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
    const { currency, wallet_address } = await request.json()
    const result = await query(
      'INSERT INTO crypto_wallets (currency, wallet_address) VALUES ($1, $2) RETURNING *',
      [currency, wallet_address]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add wallet' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, is_active, wallet_address } = await request.json()
    if (wallet_address !== undefined) {
      await query('UPDATE crypto_wallets SET wallet_address = $1 WHERE id = $2', [wallet_address, id])
    }
    if (is_active !== undefined) {
      await query('UPDATE crypto_wallets SET is_active = $1 WHERE id = $2', [is_active, id])
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update wallet' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await query('DELETE FROM crypto_wallets WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete wallet' }, { status: 500 })
  }
}

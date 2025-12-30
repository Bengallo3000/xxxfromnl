import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json([])
  }
  try {
    const result = await query(`
      SELECT p.*, o.order_number, o.customer_email 
      FROM payments p 
      LEFT JOIN orders o ON p.order_id = o.id 
      ORDER BY p.created_at DESC
    `)
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, payment_method, amount, currency, transaction_id, crypto_address, notes } = body
    
    const result = await query(
      `INSERT INTO payments (order_id, payment_method, amount, currency, transaction_id, crypto_address, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [order_id, payment_method, amount, currency || 'EUR', transaction_id, crypto_address, notes]
    )
    
    if (order_id) {
      await query('UPDATE orders SET payment_status = $1 WHERE id = $2', ['processing', order_id])
    }
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, status, transaction_id, notes } = await request.json()
    
    const result = await query(
      'UPDATE payments SET status = COALESCE($1, status), transaction_id = COALESCE($2, transaction_id), notes = COALESCE($3, notes), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [status, transaction_id, notes, id]
    )
    
    if (result.rows[0] && result.rows[0].order_id) {
      const paymentStatus = status === 'completed' ? 'paid' : status === 'failed' ? 'failed' : 'processing'
      await query('UPDATE orders SET payment_status = $1 WHERE id = $2', [paymentStatus, result.rows[0].order_id])
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await query('DELETE FROM payments WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json([])
  }
  try {
    const result = await query('SELECT * FROM orders ORDER BY created_at DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_email, customer_name, customer_address, items, total_amount, payment_method } = body
    
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    
    const result = await query(
      `INSERT INTO orders (order_number, customer_email, customer_name, customer_address, items, total_amount, payment_method) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [orderNumber, customer_email, customer_name, customer_address, JSON.stringify(items), total_amount, payment_method]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, order_status, payment_status, notes } = await request.json()
    await query(
      'UPDATE orders SET order_status = COALESCE($1, order_status), payment_status = COALESCE($2, payment_status), notes = COALESCE($3, notes), updated_at = CURRENT_TIMESTAMP WHERE id = $4',
      [order_status, payment_status, notes, id]
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await request.json()
    await query('DELETE FROM payments WHERE order_id = $1', [id])
    await query('DELETE FROM orders WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}

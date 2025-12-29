import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import crypto from 'crypto'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'techversehub_salt').digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    let storedPasswordHash = null
    try {
      const result = await pool.query(
        `SELECT value FROM site_settings WHERE key = 'admin_password_hash'`
      )
      if (result.rows.length > 0) {
        storedPasswordHash = result.rows[0].value
      }
    } catch (dbError) {
      console.log('Database not initialized yet, using env password')
    }

    const envPassword = process.env.ADMIN_PASSWORD || 'demo123'
    const inputHash = hashPassword(password)
    
    const isValid = storedPasswordHash 
      ? inputHash === storedPasswordHash 
      : password === envPassword
    
    if (isValid) {
      const token = crypto.createHash('sha256').update(`${Date.now()}-${password}-session`).digest('hex').slice(0, 32)
      return NextResponse.json({ success: true, token, password })
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

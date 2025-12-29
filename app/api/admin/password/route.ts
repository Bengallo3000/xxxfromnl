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
    const { currentPassword, newPassword } = await request.json()

    let storedPasswordHash = null
    try {
      const result = await pool.query(
        `SELECT value FROM site_settings WHERE key = 'admin_password_hash'`
      )
      if (result.rows.length > 0) {
        storedPasswordHash = result.rows[0].value
      }
    } catch (dbError) {
      console.log('Database query failed')
    }

    const envPassword = process.env.ADMIN_PASSWORD || 'demo123'
    const currentHash = hashPassword(currentPassword)
    
    const isValid = storedPasswordHash 
      ? currentHash === storedPasswordHash 
      : currentPassword === envPassword
    
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 })
    }

    const newPasswordHash = hashPassword(newPassword)
    
    await pool.query(`
      INSERT INTO site_settings (key, value) 
      VALUES ('admin_password_hash', $1)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `, [newPasswordHash])

    return NextResponse.json({ success: true, message: 'Password changed successfully!' })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}

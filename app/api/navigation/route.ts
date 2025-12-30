import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const result = await query('SELECT * FROM navigation ORDER BY sort_order ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { label, href, sort_order } = await request.json();
    const result = await query(
      'INSERT INTO navigation (label, href, sort_order) VALUES ($1, $2, $3) RETURNING *',
      [label, href, sort_order || 0]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { id } = await request.json();
    await query('DELETE FROM navigation WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

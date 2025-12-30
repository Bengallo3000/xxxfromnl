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

export async function PUT(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { id, label, href, sort_order, items } = await request.json();
    
    if (items && Array.isArray(items)) {
      for (const item of items) {
        await query(
          'UPDATE navigation SET sort_order = $1 WHERE id = $2',
          [item.sort_order, item.id]
        );
      }
      return NextResponse.json({ success: true });
    }
    
    if (id) {
      const result = await query(
        'UPDATE navigation SET label = $1, href = $2, sort_order = $3 WHERE id = $4 RETURNING *',
        [label, href, sort_order || 0, id]
      );
      return NextResponse.json(result.rows[0]);
    }
    
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
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

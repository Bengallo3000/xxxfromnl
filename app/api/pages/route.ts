import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const result = await query('SELECT * FROM pages ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { slug, title, content } = await request.json();
    const result = await query(
      'INSERT INTO pages (slug, title, content) VALUES ($1, $2, $3) RETURNING *',
      [slug, title, content]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { id, slug, title, content } = await request.json();
    const result = await query(
      'UPDATE pages SET slug = $1, title = $2, content = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [slug, title, content, id]
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
    await query('DELETE FROM pages WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

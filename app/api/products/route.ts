import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string || '';
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string || '';
    const file = formData.get('image') as File | null;

    let imageUrl = '';
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const uint8Array = new Uint8Array(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
      await mkdir(uploadDir, { recursive: true });

      const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, uint8Array);
      imageUrl = `/uploads/products/${uniqueName}`;
    }

    const result = await query(
      'INSERT INTO products (name, description, price, image_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, imageUrl, category]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string || '';
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string || '';
    const file = formData.get('image') as File | null;

    let imageUrl = formData.get('existing_image_url') as string || '';
    
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const uint8Array = new Uint8Array(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
      await mkdir(uploadDir, { recursive: true });

      const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, uint8Array);
      imageUrl = `/uploads/products/${uniqueName}`;
    }

    const result = await query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, category = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [name, description, price, imageUrl, category, id]
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
    await query('DELETE FROM products WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

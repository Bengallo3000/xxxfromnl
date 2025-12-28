import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'demo123';

export function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-token');
  return authHeader === ADMIN_PASSWORD;
}

export const verifyAuth = checkAdminAuth;

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

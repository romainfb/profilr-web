import { NextRequest, NextResponse } from 'next/server';
import { registerNewUser } from '@/app/api/auth/auth.service';

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const { username, email, password } = await request.json();
    const user = await registerNewUser({ username, email, password });
    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

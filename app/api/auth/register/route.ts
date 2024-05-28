import { NextRequest, NextResponse } from 'next/server';
import { registerNewUser } from '@/app/api/auth/auth.service';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { username, email, password } = await request.json();
    const user = await registerNewUser({ username, email, password });
    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    if (e instanceof Error) return NextResponse.json({ message: e.message }, { status: 400 });
    return NextResponse.json({ message: 'Server error. Please try again later.' }, { status: 500 });
  }
}

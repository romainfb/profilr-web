import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
}
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    return NextResponse.json({}, { status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e}, { status: 500 });
  }
}

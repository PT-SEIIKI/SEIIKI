import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:5000';

  if (error) {
    return NextResponse.redirect(new URL('/login?error=google_denied', baseUrl));
  }

  const storedState = request.cookies.get('google_oauth_state')?.value;
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL('/login?error=invalid_state', baseUrl));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', baseUrl));
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/login?error=token_exchange', baseUrl));
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userInfoRes.ok) {
      return NextResponse.redirect(new URL('/login?error=userinfo', baseUrl));
    }

    const googleUser = await userInfoRes.json();
    const { email, name } = googleUser;

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=no_email', baseUrl));
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          password: crypto.randomBytes(32).toString('hex'),
          role: 'USER',
        },
      });
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const redirectTo =
      user.role === 'ADMIN_KONSULTASI' ? '/dashboard/konsultasi' :
      user.role === 'ADMIN_INTEK' ? '/dashboard/intek' :
      ['ADMIN', 'EDITOR'].includes(user.role) ? '/dashboard' : '/';

    const response = NextResponse.redirect(new URL(redirectTo, baseUrl));
    response.headers.set('Set-Cookie', setAuthCookie(token));
    response.cookies.delete('google_oauth_state');

    return response;
  } catch (err) {
    console.error('Google OAuth error:', err);
    return NextResponse.redirect(new URL('/login?error=server_error', baseUrl));
  }
}

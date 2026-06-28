import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required');
}

const JWT_SECRET = new TextEncoder().encode(jwtSecret);

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function signToken(payload: UserPayload): Promise<string> {
  return new SignJWT({ ...payload } as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserPayload;
  } catch (error) {
    return null;
  }
}

export async function getUser(request?: NextRequest): Promise<UserPayload | null> {
  let token: string | undefined;

  if (request) {
    // For API routes and middleware
    token = request.cookies.get('auth-token')?.value;
  } else {
    // For server components
    const cookieStore = await cookies();
    token = cookieStore.get('auth-token')?.value;
  }

  if (!token) return null;

  return verifyToken(token);
}

export function setAuthCookie(token: string, isProduction = process.env.NODE_ENV === 'production'): string {
  const secure = isProduction ? '; Secure' : '';
  return `auth-token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${secure}`;
}

export function clearAuthCookie(isProduction = process.env.NODE_ENV === 'production'): string {
  const secure = isProduction ? '; Secure' : '';
  return `auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${secure}`;
}
import { NextRequest, NextResponse } from 'next/server';

// Rate limiting configuration (simple implementation for Next.js)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(request: NextRequest, maxRequests: number = 100, windowMs: number = 900000) {
  const ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown';
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  
  // Check current IP
  const current = rateLimitStore.get(ip);
  if (current) {
    if (current.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests from this IP, please try again later.' },
        { status: 429 }
      );
    }
    current.count++;
  } else {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
  }
  
  return null;
}

// CORS middleware
export function corsMiddleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return null;
}

// Security headers middleware
export function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  };
}

// Input validation helper
export function validateInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }
  
  // Remove potentially dangerous characters
  const sanitized = input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
  
  if (sanitized.length > maxLength) {
    throw new Error('Input too long');
  }
  
  return sanitized;
}

// File upload validation
export function validateFileUpload(file: File) {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [];
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
  
  return true;
}

// JWT token validation
export function validateJWTToken(token: string): boolean {
  try {
    // Basic JWT format validation
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    
    // Check if header and payload are valid base64
    JSON.parse(atob(parts[0]));
    JSON.parse(atob(parts[1]));
    
    return true;
  } catch (error) {
    return false;
  }
}

// SQL injection prevention
export function sanitizeSQLInput(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }
  
  // Remove SQL injection patterns
  return input
    .replace(/['"\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/;/g, '') // Remove semicolons
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b/gi, '') // Remove SQL keywords
    .trim();
}

# Security Hardening Guide for SEIIKI Website

## 🚨 Critical Security Issues Addressed

### 1. React2Shell Vulnerability (CVE-2025-66478)
- **Issue**: Remote code execution vulnerability in Next.js
- **Fix**: Updated Next.js configuration and middleware
- **Status**: ✅ PATCHED

### 2. Environment Variable Security
- **Issue**: Sensitive data exposed in .env file
- **Fix**: Created secure .env.example template
- **Status**: ✅ IMPLEMENTED

## 🔐 Security Measures Implemented

### 1. **Rate Limiting**
- API endpoints protected with rate limiting
- 100 requests per 15 minutes per IP
- Prevents brute force attacks

### 2. **Input Validation & Sanitization**
- All user inputs validated and sanitized
- SQL injection prevention
- XSS protection
- File upload validation

### 3. **Security Headers**
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security
- Permissions-Policy

### 4. **JWT Token Security**
- Enhanced JWT validation
- Token format verification
- Secure token handling

### 5. **CORS Protection**
- Allowed origins configuration
- Prevents cross-origin attacks

## 📋 Deployment Security Checklist

### Before Deploying to VPS:

1. **Update Environment Variables**
   ```bash
   # Copy the secure template
   cp .env.example .env.production
   
   # Update with production values
   DATABASE_URL="postgresql://user:STRONG_PASSWORD@localhost:5432/SEIIKI"
   JWT_SECRET="GENERATE_NEW_STRONG_SECRET_256_CHARS"
   NEXTAUTH_SECRET="GENERATE_NEW_STRONG_SECRET_256_CHARS"
   ```

2. **Generate Strong Secrets**
   ```bash
   # Generate JWT secret
   openssl rand -base64 32
   
   # Generate NextAuth secret
   openssl rand -base64 32
   ```

3. **Update Admin Credentials**
   ```bash
   SEED_ADMIN_EMAIL="admin@your-domain.com"
   SEED_ADMIN_PASSWORD="CHANGE_THIS_STRONG_PASSWORD"
   ```

4. **Configure Domain Settings**
   ```bash
   NEXTAUTH_URL="https://your-domain.com"
   ALLOWED_ORIGINS="https://your-domain.com"
   ```

### Production Deployment Steps:

1. **Build with Security**
   ```bash
   npm run build
   ```

2. **Set Production Environment**
   ```bash
   export NODE_ENV=production
   ```

3. **Start Secure Server**
   ```bash
   npm start
   ```

## 🛡️ Security Features

### Rate Limiting Configuration
- Window: 15 minutes (900000ms)
- Max Requests: 100 per IP
- Auto-cleanup of old entries

### Input Validation Rules
- Max title length: 200 chars
- Max subtitle length: 300 chars
- Max description length: 1000 chars
- Max URL length: 500 chars
- SQL injection pattern removal

### File Upload Security
- Allowed types: JPEG, PNG, PDF, DOCX
- Max file size: 10MB
- Type validation
- Size validation

### JWT Security
- Format validation
- Secret verification
- Role-based access control
- Token expiration handling

## 🚨 Important Security Notes

### NEVER Commit These Files:
- `.env` - Contains production secrets
- `.env.local` - Local development secrets
- Database backup files
- SSL certificates

### ALWAYS Monitor:
- Failed login attempts
- API rate limit hits
- Unusual traffic patterns
- Error logs for security issues

### Regular Security Tasks:
1. Update dependencies weekly
2. Rotate JWT secrets monthly
3. Review access logs
4. Update admin passwords
5. Backup database securely

## 🔍 Security Testing

### Test Rate Limiting:
```bash
# Quick test script
for i in {1..150}; do
  curl -X GET http://localhost:5000/api/admin/hero-slides
done
```

### Test Input Validation:
```bash
# Test XSS attempts
curl -X POST http://localhost:5000/api/admin/hero-slides \
  -H "Content-Type: application/json" \
  -d '{"title":"<script>alert(1)</script>"}'
```

### Test SQL Injection:
```bash
# Test SQL injection attempts
curl -X POST http://localhost:5000/api/admin/hero-slides \
  -H "Content-Type: application/json" \
  -d '{"title":"\'; DROP TABLE users; --"}'
```

## 📞 Emergency Contacts

If security breach is detected:
1. Immediately change all secrets
2. Rotate database credentials
3. Review access logs
4. Contact hosting provider
5. Enable maintenance mode

## 🔄 Maintenance Schedule

- **Daily**: Review error logs
- **Weekly**: Update dependencies
- **Monthly**: Rotate secrets
- **Quarterly**: Security audit
- **Yearly**: Penetration testing

---

**⚠️ WARNING**: This security hardening addresses common vulnerabilities but doesn't guarantee 100% protection. Always follow security best practices and consider professional security audits for production systems.

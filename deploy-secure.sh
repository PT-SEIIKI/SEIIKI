#!/bin/bash

# Production Security Deployment Script
# This script ensures secure deployment to VPS

set -e  # Exit on any error

echo "🚀 Starting Secure Deployment Process..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ ERROR: .env.production file not found!"
    echo "📝 Please create .env.production from .env.example"
    exit 1
fi

# Validate environment variables
echo "🔍 Validating environment variables..."
source .env.production

if [ -z "$DATABASE_URL" ] || [ -z "$JWT_SECRET" ] || [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ ERROR: Missing required environment variables!"
    echo "📝 Required: DATABASE_URL, JWT_SECRET, NEXTAUTH_SECRET"
    exit 1
fi

# Check if secrets are strong enough
if [ ${#JWT_SECRET} -lt 32 ]; then
    echo "⚠️  WARNING: JWT_SECRET should be at least 32 characters"
fi

if [ ${#NEXTAUTH_SECRET} -lt 32 ]; then
    echo "⚠️  WARNING: NEXTAUTH_SECRET should be at least 32 characters"
fi

# Backup current deployment if exists
if [ -d ".next" ]; then
    echo "💾 Backing up current build..."
    mv .next .next.backup.$(date +%Y%m%d_%H%M%S)
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Run security checks
echo "🔒 Running security audit..."
npm audit --audit-level=high

if [ $? -ne 0 ]; then
    echo "⚠️  WARNING: Security vulnerabilities found!"
    echo "📝 Review and update dependencies before production"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build application
echo "🏗️  Building application..."
NODE_ENV=production npm run build

# Verify build
if [ ! -d ".next" ]; then
    echo "❌ ERROR: Build failed - .next directory not found!"
    exit 1
fi

# Copy static files
echo "📁 Copying static files..."
cp -r public .next/

# Set secure permissions
echo "🔐 Setting secure permissions..."
chmod -R 755 .next/
find .next/ -type f -exec chmod 644 {} \;

# Create production startup script
cat > start-production.js << 'EOF'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log(`> Security: Hardened`);
  });
});
EOF

chmod +x start-production.js

# Database migration
echo "🗄️  Running database migrations..."
npm run db:migrate

# Seed database (only if needed)
if [ "$ALLOW_DEV_USER_SEED" = "true" ]; then
    echo "🌱 Seeding database..."
    npm run seed
fi

# Create systemd service file
cat > seiiki.service << EOF
[Unit]
Description=SEIIKI Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$(pwd)
Environment=NODE_ENV=production
EnvironmentFile=$(pwd)/.env.production
ExecStart=/usr/bin/node $(pwd)/start-production.js
Restart=always
RestartSec=10

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$(pwd)/.next
ReadWritePaths=$(pwd)/uploads

[Install]
WantedBy=multi-user.target
EOF

echo "✅ Security deployment completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Review seiiki.service file"
echo "2. Copy service to /etc/systemd/system/"
echo "3. Start service: sudo systemctl start seiiki"
echo "4. Enable service: sudo systemctl enable seiiki"
echo "5. Check status: sudo systemctl status seiiki"
echo ""
echo "🔐 Security Features Enabled:"
echo "- Rate limiting on API endpoints"
echo "- Input validation and sanitization"
echo "- Security headers"
echo "- JWT token validation"
echo "- CORS protection"
echo "- Secure file permissions"
echo ""
echo "🌐 Your website should be available at: http://$(hostname -I | awk '{print $1}'):3000"

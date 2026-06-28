# Generate Strong Secrets Script
# Use this to generate secure secrets for production

import crypto from 'crypto';
import fs from 'fs';

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('base64');
}

function generateJWTSecret() {
  return crypto.randomBytes(32).toString('hex');
}

console.log('🔐 Generating Secure Secrets...\n');

const secrets = {
  JWT_SECRET: generateJWTSecret(),
  NEXTAUTH_SECRET: generateSecret(),
  DATABASE_URL: 'postgresql://postgres:CHANGE_THIS_PASSWORD@localhost:5432/SEIIKI',
  JWT_EXPIRES_IN: '7d',
  NEXTAUTH_URL: 'https://your-domain.com',
  ALLOWED_ORIGINS: 'https://your-domain.com',
  NODE_ENV: 'production',
  RATE_LIMIT_WINDOW_MS: '900000',
  RATE_LIMIT_MAX_REQUESTS: '100',
  UPLOAD_DIR: './uploads',
  MAX_FILE_SIZE: '10485760',
  ALLOWED_FILE_TYPES: 'image/jpeg,image/png,image/jpg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  DISABLE_SSR: 'false',
  SEED_ADMIN_EMAIL: 'admin@your-domain.com',
  SEED_ADMIN_PASSWORD: generateSecret(16),
};

console.log('📝 Copy these secrets to your .env.production file:\n');
console.log('# === SECURITY SECRETS ===');
Object.entries(secrets).forEach(([key, value]) => {
  console.log(`${key}="${value}"`);
});

console.log('\n⚠️  IMPORTANT SECURITY NOTES:');
console.log('1. Change DATABASE_URL password');
console.log('2. Update NEXTAUTH_URL to your actual domain');
console.log('3. Update ALLOWED_ORIGINS to your actual domain');
console.log('4. Change SEED_ADMIN_EMAIL to your admin email');
console.log('5. Change SEED_ADMIN_PASSWORD to a strong password');
console.log('6. NEVER commit .env.production to version control');

// Save to file
const envContent = Object.entries(secrets)
  .map(([key, value]) => `${key}="${value}"`)
  .join('\n');

fs.writeFileSync('.env.production.template', envContent);
console.log('\n💾 Saved template to .env.production.template');
console.log('📋 Copy this file to .env.production and update the values');

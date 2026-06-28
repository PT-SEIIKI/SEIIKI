#!/bin/bash

# Script untuk deployment VPS - memastikan static files tercopy dengan benar

echo "Starting deployment process..."

# 1. Build aplikasi
echo "Building Next.js app..."
npm run build

# 2. Copy public folder ke .next/public (untuk standalone build)
if [ -d ".next" ]; then
    echo "Copying public files to .next/public..."
    cp -r public .next/
fi

# 3. Buat script untuk start production
cat > start-server.js << 'EOF'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

// When using middleware, it's recommended to create the app manually
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` for "parse body". When you're using
      // middleware in your app, this is required.
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
  });
});
EOF

echo "Deployment setup complete!"
echo "To start the server, run: node start-server.js"

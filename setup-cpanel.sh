#!/bin/bash

# FromNL cPanel Setup Script
echo "=== FromNL Shop Setup ==="

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Build Next.js
echo "🏗️  Building Next.js..."
npm run build

# 3. Create uploads folder
echo "📁 Creating uploads folder..."
mkdir -p public/uploads
chmod 755 public/uploads

# 4. Check environment
echo "✅ Checking environment..."
if [ ! -f .env.local ]; then
  echo "⚠️  .env.local nicht gefunden! Bitte .env.local Datei erstellen"
  exit 1
fi

echo "✅ Setup complete!"
echo "Nächster Schritt: npm start"

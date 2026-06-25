#!/bin/bash

# Setup script untuk Web Portfolio CMS Template
# Membantu inisialisasi deployment di VPS Linux secara instan.

set -e

echo "=== Starting Zagoour Portfolio CMS Setup ==="

# 1. Periksa ketersediaan Docker
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Error: Docker is not installed. Please install Docker first." >&2
  exit 1
fi

# 2. Salin .env.example jika .env belum ada
if [ ! -f .env ]; then
  echo "📝 Copying .env.example to .env..."
  cp .env.example .env
  
  # Generate random 32 chars secret untuk AUTH_SECRET
  RAND_SECRET=$(openssl rand -base64 32)
  # Replace placeholder dengan key asli
  sed -i "s/generate_a_random_32_characters_secret_key/$RAND_SECRET/g" .env
  echo "✅ Created .env configuration file with auto-generated AUTH_SECRET."
else
  echo "ℹ️ .env file already exists. Skipping copy."
fi

# 3. Jalankan Docker Compose build dan up
echo "🚀 Building and launching Docker containers..."
docker compose up -d --build

# 4. Tunggu container database postgres siap
echo "⏳ Waiting for PostgreSQL container to start..."
docker compose exec postgres pg_isready -U postgres -d porto_cms -t 30

# 5. Jalankan Database Seeder
echo "🌱 Seeding database default records (Admin & dummy data)..."
docker compose exec -T frontend npx prisma db seed

echo "=== Setup Completed Successfully! ==="
echo "Your portfolio is live at: http://localhost (default port 80)"
echo "Admin panel: http://localhost/login (default user: admin@porto.com / password123)"
echo "Don't forget to change the default admin credentials and PostgreSQL password in production!"

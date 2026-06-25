#!/bin/sh

echo "Running prisma migration deploy..."
npx prisma migrate deploy

echo "Starting Next.js application..."
exec node server.js

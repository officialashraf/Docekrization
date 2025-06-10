#!/bin/bash

APP_DIR="/root/0mvp/Docekrization"
GIT_REPO="https://github.com/officialashraf/Docekrization.git"
IMAGE_NAME="da-react-app-image"
CONTAINER_NAME="da-react-container-image"

echo "👉 Cleaning up old app..."
rm -rf "$APP_DIR"

echo "📦 Cloning latest code..."
git clone $GIT_REPO "$APP_DIR"

cd "$APP_DIR" || exit

echo "📂 Installing packages..."
npm install

echo "🔧 Generating build info..."
node generate-build-info.js

echo "🏗️   Building React app..."
npm run build

echo "🐳 Building Docker image..."
docker build -t $IMAGE_NAME .  # <- FIXED HERE

echo "🧹 Removing old container (if exists)..."
docker rm -f $CONTAINER_NAME || true

echo "🚀 Running Docker container..."
docker run -d -p 9013:80 --name $CONTAINER_NAME $IMAGE_NAME  # <- Port fixed for consistency

echo "✅ Deployment complete. Visit http://5.180.148.40:9013"

#!/bin/bash

# Script to start the React development server with proper configuration

echo "🚀 Starting Global Pickups Development Server..."
echo "⚙️ Checking environment..."

# Check if environment files exist
if [ ! -f .env.development ]; then
  echo "⚠️ .env.development file not found. Creating one with default settings..."
  cat > .env.development << EOF
# React app runs on port 3000 by default
PORT=3000

# Backend API configuration - change this to match your backend port
REACT_APP_API_PORT=5000
REACT_APP_API_URL=http://localhost:5000

# Set to true to force use of mock API responses even if server is available
REACT_APP_USE_MOCK_API=true

# Enable debugging
REACT_APP_DEBUG=true
FAST_REFRESH=false
CHOKIDAR_USEPOLLING=true
EOF
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "⚠️ node_modules not found. Running npm install..."
  npm install
fi

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
  echo "⚠️ Port 3000 is already in use. Attempting to free it..."
  # Try to kill the process using port 3000
  lsof -ti:3000 | xargs kill -9
  echo "✅ Port 3000 freed."
fi

echo "🔍 Checking network connectivity..."
# Ping localhost to verify it's resolving correctly
ping -c 1 localhost > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "⚠️ localhost is not resolving correctly. Adding to /etc/hosts..."
  # This requires sudo, so it may prompt for password
  echo "127.0.0.1 localhost" | sudo tee -a /etc/hosts
fi

echo "✅ Environment ready. Starting development server..."
echo "🌐 The app will be available at http://localhost:3000"
echo "⚙️ Using mock API data (REACT_APP_USE_MOCK_API=true)"

# Start React development server with debug output
BROWSER=none npm start

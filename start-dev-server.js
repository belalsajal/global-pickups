const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing to start Global Pickups development server...');

// Check if .env file exists, if not create one with default values
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating default .env file...');
  const defaultEnv = 
`REACT_APP_API_URL=http://localhost:5000
REACT_APP_DEBUG=true
PORT=3000
BROWSER=none
`;
  fs.writeFileSync(envPath, defaultEnv);
  console.log('✅ Default .env file created');
}

// Clear any potential port conflicts
const clearPort = spawn('npx', ['kill-port', '3000']);
clearPort.on('close', (code) => {
  if (code !== 0) {
    console.log('⚠️ Could not clear port 3000, but continuing anyway...');
  } else {
    console.log('🧹 Port 3000 cleared successfully');
  }
  
  // Start the development server with additional memory allocation
  console.log('🌐 Starting development server...');
  const startServer = spawn('npm', ['start'], {
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
    shell: true,
    stdio: 'inherit'
  });
  
  startServer.on('error', (err) => {
    console.error('❌ Failed to start development server:', err);
    process.exit(1);
  });
});

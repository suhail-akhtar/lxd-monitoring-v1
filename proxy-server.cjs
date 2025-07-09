// proxy-server.js - Development proxy server for LXD API
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5175', 'http://127.0.0.1:5175'], // Vite dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create HTTPS agent with client certificates
const createHttpsAgent = () => {
  try {
    // Load client certificate and key
    const cert = fs.readFileSync('./certs/client.crt');
    const key = fs.readFileSync('./certs/client.key');
    
    return new https.Agent({
      cert: cert,
      key: key,
      // For development, ignore certificate validation
      // In production, you should properly validate certificates
      rejectUnauthorized: false,
      keepAlive: true,
      timeout: 10000,
    });
  } catch (error) {
    console.error('Failed to load client certificates:', error.message);
    console.log('Please ensure client certificates are available in ./certs/ directory:');
    console.log('  - ./certs/client.crt');
    console.log('  - ./certs/client.key');
    process.exit(1);
  }
};

// Configure proxy to LXD API
const lxdProxy = createProxyMiddleware({
  target: 'https://172.21.200.18:8443',
  changeOrigin: true,
  pathRewrite: {
    '^/api/lxd': '', // Remove /api/lxd prefix when forwarding
  },
  agent: createHttpsAgent(),
  onProxyReq: (proxyReq, req, res) => {
    // Add any additional headers if needed
    proxyReq.setHeader('User-Agent', 'MicroCloud-Dashboard/1.0');
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(500).json({
      error: 'Proxy Error',
      message: err.message,
      target: 'https://172.21.200.18:8443',
    });
  },
  logLevel: 'debug',
});

// Apply proxy middleware to /api/lxd routes
app.use('/api/lxd', lxdProxy);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 LXD API Proxy Server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to: https://172.21.200.18:8443`);
  console.log(`🔒 Using client certificates from ./certs/ directory\n`);
  console.log('Available endpoints:');
  console.log(`  Health Check: http://localhost:${PORT}/health`);
  console.log(`  LXD API:      http://localhost:${PORT}/api/lxd/*`);
  console.log('\nExample request:');
  console.log(`  curl http://localhost:${PORT}/api/lxd/1.0\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully');
  process.exit(0);
});
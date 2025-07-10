// proxy-server.cjs - Improved development proxy server for LXD API
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const LXD_URL = process.env.LXD_SERVER_URL || 'https://172.21.200.18:8443';

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5175', 'http://127.0.0.1:5175'], // Vite dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Middleware to log requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    lxd_target: LXD_URL,
    proxy_port: PORT
  });
});

// Check if certificates exist
const checkCertificates = () => {
  const certPath = path.resolve('./certs/client.crt');
  const keyPath = path.resolve('./certs/client.key');
  
  if (!fs.existsSync(certPath)) {
    console.error(`❌ Client certificate not found: ${certPath}`);
    return false;
  }
  
  if (!fs.existsSync(keyPath)) {
    console.error(`❌ Client key not found: ${keyPath}`);
    return false;
  }
  
  console.log(`✅ Found client certificate: ${certPath}`);
  console.log(`✅ Found client key: ${keyPath}`);
  return true;
};

// Create HTTPS agent with client certificates
const createHttpsAgent = () => {
  if (!checkCertificates()) {
    console.log('\n📋 To set up client certificates:');
    console.log('1. Generate certificates using: lxc config trust add');
    console.log('2. Or copy existing certificates to ./certs/ directory');
    console.log('3. Ensure files are named client.crt and client.key\n');
    process.exit(1);
  }

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
      timeout: 15000,
    });
  } catch (error) {
    console.error('❌ Failed to load client certificates:', error.message);
    process.exit(1);
  }
};

// Configure proxy to LXD API with better error handling
const lxdProxy = createProxyMiddleware({
  target: LXD_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/lxd': '', // Remove /api/lxd prefix when forwarding
  },
  agent: createHttpsAgent(),
  timeout: 15000,
  onProxyReq: (proxyReq, req, res) => {
    // Add any additional headers if needed
    proxyReq.setHeader('User-Agent', 'MicroCloud-Dashboard/1.0');
    console.log(`🔄 Proxying: ${req.method} ${req.url} -> ${LXD_URL}${req.url.replace('/api/lxd', '')}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    const statusCode = proxyRes.statusCode || 0;
    const statusText = statusCode >= 400 ? '❌' : '✅';
    console.log(`${statusText} Response: ${statusCode} for ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error(`❌ Proxy error for ${req.method} ${req.url}:`, err.message);
    
    // More detailed error response
    const errorResponse = {
      error: 'Proxy Error',
      message: err.message,
      target: LXD_URL,
      path: req.url,
      timestamp: new Date().toISOString(),
      code: err.code,
    };

    // Check for common error types
    if (err.code === 'ECONNREFUSED') {
      errorResponse.suggestion = 'LXD server appears to be down or unreachable';
    } else if (err.code === 'CERT_HAS_EXPIRED') {
      errorResponse.suggestion = 'Client certificate has expired';
    } else if (err.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
      errorResponse.suggestion = 'Certificate verification failed';
    }

    res.status(500).json(errorResponse);
  },
  logLevel: process.env.DEBUG_PROXY ? 'debug' : 'warn',
});

// Apply proxy middleware to /api/lxd routes
app.use('/api/lxd', lxdProxy);

// Test endpoint to check LXD connectivity
app.get('/test-lxd', async (req, res) => {
  try {
    const agent = createHttpsAgent();
    const https = require('https');
    
    const options = {
      hostname: new URL(LXD_URL).hostname,
      port: new URL(LXD_URL).port,
      path: '/1.0',
      method: 'GET',
      agent: agent,
    };

    const testReq = https.request(options, (testRes) => {
      let data = '';
      testRes.on('data', (chunk) => data += chunk);
      testRes.on('end', () => {
        res.json({
          status: 'success',
          statusCode: testRes.statusCode,
          headers: testRes.headers,
          data: data ? JSON.parse(data) : null,
        });
      });
    });

    testReq.on('error', (error) => {
      res.status(500).json({
        status: 'error',
        error: error.message,
        code: error.code,
      });
    });

    testReq.end();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚀 LXD API Proxy Server Status:');
  console.log(`   Running on: http://localhost:${PORT}`);
  console.log(`   Target LXD: ${LXD_URL}`);
  console.log(`   Certificates: ./certs/ directory\n`);
  
  console.log('📋 Available endpoints:');
  console.log(`   Health Check: http://localhost:${PORT}/health`);
  console.log(`   LXD API:      http://localhost:${PORT}/api/lxd/*`);
  console.log(`   Test LXD:     http://localhost:${PORT}/test-lxd\n`);
  
  console.log('🔧 Example requests:');
  console.log(`   curl http://localhost:${PORT}/health`);
  console.log(`   curl http://localhost:${PORT}/test-lxd`);
  console.log(`   curl http://localhost:${PORT}/api/lxd/1.0\n`);
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

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
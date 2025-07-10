import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LXD_CONFIG = {
  host: '172.21.200.18',
  port: 8443,
  protocol: 'https',
  
  // Load certificates
  cert: fs.readFileSync(path.join(__dirname, '../../certs/client.crt')),
  key: fs.readFileSync(path.join(__dirname, '../../certs/client.key')),
  
  // LXD API settings
  rejectUnauthorized: false, // For self-signed certificates
  timeout: 30000,
  
  get baseUrl() {
    return `${this.protocol}://${this.host}:${this.port}/1.0`;
  }
};

export default LXD_CONFIG;
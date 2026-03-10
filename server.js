const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  // Remove query string and decode URL
  let filePath = req.url.split('?')[0];
  
  // Default to index.html for root
  if (filePath === '/') {
    filePath = '/index.html';
  }

  if (filePath === '/faqs' || filePath === '/faq') {
    filePath = '/faqs.html';
  }
  
  // Construct full file path
  const fullPath = path.join(PUBLIC_DIR, filePath);
  
  // Get file extension for MIME type
  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Check if file exists
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found - serve custom 404 page
      const notFoundPath = path.join(PUBLIC_DIR, '404.html');
      fs.readFile(notFoundPath, (err404, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(err404 ? '<h1>404 - Page Not Found</h1><p><a href="/">Back to Home</a></p>' : data);
      });
      return;
    }
    
    // Read and serve file
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Internal Server Error</h1>');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server is running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${PUBLIC_DIR}`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});


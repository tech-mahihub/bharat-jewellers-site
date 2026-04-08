const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

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
  const base = `http://${req.headers.host || 'localhost'}`;
  let urlObj;
  try {
    urlObj = new URL(req.url, base);
  } catch {
    urlObj = new URL('/', base);
  }

  const pathname = decodeURIComponent(urlObj.pathname.replace(/\\/g, '/'));

  // 410 Gone – legacy /products/* (not part of this site)
  if (pathname === '/products' || pathname.startsWith('/products/')) {
    const body = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Gone</title></head><body><h1>410 Gone</h1><p>This URL is permanently removed.</p><p><a href="/">Back to home</a></p></body></html>';
    res.writeHead(410, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=86400' });
    res.end(body);
    return;
  }

  // 301 /category.html?category={slug} → /{slug}
  if (pathname === '/category.html' && urlObj.searchParams.has('category')) {
    const slug = urlObj.searchParams.get('category');
    if (slug && /^[a-z0-9-]+$/.test(slug)) {
      res.writeHead(301, { Location: `/${slug}` });
      res.end();
      return;
    }
  }

  let filePath = pathname;

  if (filePath === '/') {
    filePath = '/index.html';
  }

  if (filePath === '/faqs' || filePath === '/faq') {
    filePath = '/faqs.html';
  }

  // Clean path without extension → serve matching .html (mirrors .htaccess)
  if (!path.extname(filePath)) {
    filePath = `${filePath}.html`;
  }

  const rel = filePath.replace(/^\/+/, '');
  const fullPath = path.join(PUBLIC_DIR, rel);
  
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


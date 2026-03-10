/**
 * Downloads external bharatjewellers.ca images into public/assets/images/locations/
 * Run: node download-images.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'public', 'assets', 'images', 'locations');

const IMAGES = [
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/11/New-bg-image-for-bj.webp', file: 'New-bg-image-for-bj.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/11/Gold-Jewellery-Collections.webp', file: 'Gold-Jewellery-Collections.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/11/Diamond-Jewellery-Collections.webp', file: 'Diamond-Jewellery-Collections.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/11/Gold-Bridal-Sets.webp', file: 'Gold-Bridal-Sets.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/11/Custom-Jewellery-Surrey-BC.webp', file: 'Custom-Jewellery-Surrey-BC.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/07/Bharat-Jewellers-Surrey-Store1.webp', file: 'Bharat-Jewellers-Surrey-Store1.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/07/Bharat-Jewellers-Calgary.webp', file: 'Bharat-Jewellers-Calgary.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/07/Jewelry-Stores-Edmonton-1.webp', file: 'Jewelry-Stores-Edmonton-1.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/07/Bridal-Jewelry-Shopping-Tips.webp', file: 'Bridal-Jewelry-Shopping-Tips.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/11/24K-Gold-Jewellery-%E2%80%93-Best-for-Investment.webp', file: '24K-Gold-Jewellery-Best-for-Investment.webp' },
  { url: 'https://bharatjewellers.ca/wp-content/uploads/2025/10/holiday-jewelry-gifts.jpg', file: 'holiday-jewelry-gifts.jpg' },
];

function download({ url, file }) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(OUT_DIR, file);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://bharatjewellers.ca/',
      },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirect = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        return download({ url: redirect, file }).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`${file}: HTTP ${res.statusCode}`));
        return;
      }
      const stream = fs.createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(file); });
      stream.on('error', reject);
    });
    req.on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('Downloading to', OUT_DIR);
  for (const item of IMAGES) {
    try {
      await download(item);
      console.log('OK', item.file);
    } catch (e) {
      console.error('FAIL', item.file, e.message);
    }
  }
  console.log('Done.');
}

main();

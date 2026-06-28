const fs = require('fs');
const path = require('path');

// Check if public images exist
const publicDir = path.join(__dirname, '..', 'public');
const requiredImages = [
  'header-1.jpg',
  'header-2.jpg', 
  'header-3.jpg'
];

console.log('Checking public images...');
console.log('Public directory:', publicDir);

if (!fs.existsSync(publicDir)) {
  console.error('Public directory not found!');
  process.exit(1);
}

const files = fs.readdirSync(publicDir);
console.log('Files in public directory:', files);

requiredImages.forEach(image => {
  const imagePath = path.join(publicDir, image);
  const exists = fs.existsSync(imagePath);
  console.log(`${image}: ${exists ? 'EXISTS' : 'MISSING'}`);
  
  if (exists) {
    const stats = fs.statSync(imagePath);
    console.log(`  Size: ${stats.size} bytes`);
  }
});

// Also check if .next/public exists (for standalone builds)
const nextPublicDir = path.join(__dirname, '..', '.next', 'public');
if (fs.existsSync(nextPublicDir)) {
  console.log('\nChecking .next/public directory...');
  const nextFiles = fs.readdirSync(nextPublicDir);
  console.log('Files in .next/public:', nextFiles);
  
  requiredImages.forEach(image => {
    const imagePath = path.join(nextPublicDir, image);
    const exists = fs.existsSync(imagePath);
    console.log(`${image}: ${exists ? 'EXISTS' : 'MISSING'}`);
  });
} else {
  console.log('\n.next/public directory not found (build may not have run)');
}

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const artifactDir = 'C:\\Users\\Ariel\\.gemini\\antigravity\\brain\\2632a944-a5fe-44a8-8700-cddc4f76cbc7';

const files = [
  { src: 'cabin_sendero_1784641234987.jpg', dest: 'cabin-sendero.jpg' },
  { src: 'cabin_rio_1784641248740.jpg', dest: 'cabin-rio.jpg' },
  { src: 'cabin_cumbres_1784641263073.jpg', dest: 'cabin-cumbres.jpg' }
];

files.forEach(({ src, dest }) => {
  const srcPath = path.join(artifactDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${destPath}`);
  } else {
    console.warn(`File not found: ${srcPath}`);
  }
});

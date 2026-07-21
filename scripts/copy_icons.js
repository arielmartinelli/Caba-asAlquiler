const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\Ariel\\.gemini\\antigravity\\brain\\2632a944-a5fe-44a8-8700-cddc4f76cbc7\\cabin_logo_icon_1784643755330.jpg';
const publicDir = path.join(__dirname, '..', 'public');

if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, path.join(publicDir, 'logo.jpg'));
  fs.copyFileSync(srcPath, path.join(publicDir, 'icon.png'));
  fs.copyFileSync(srcPath, path.join(publicDir, 'apple-icon.png'));
  fs.copyFileSync(srcPath, path.join(publicDir, 'og-image.jpg'));
  console.log('Successfully copied logo icons to public directory');
} else {
  console.error('Source icon file not found');
}

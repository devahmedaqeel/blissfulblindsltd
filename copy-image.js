const fs = require('fs');
const src = 'C:/Users/user/.gemini/antigravity-ide/brain/b8d3df98-4e34-467d-8410-aafca623a6ed/media__1785343060730.png';
const dst = 'C:/Users/user/Downloads/Blissful Blinds Co 369/images/products/perfect-fit-venetian-blind-french-door.png';
fs.copyFileSync(src, dst);
console.log('Image copied successfully to:', dst);

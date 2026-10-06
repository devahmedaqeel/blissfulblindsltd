const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res.push(...walk(p));
    } else {
      res.push(p);
    }
  }
  return res;
}

const files = walk('.');
for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.ico') || file.endsWith('.css')) continue;
  try {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /(https?:\/\/[^\s"'<>]+(?:google|review|trustpilot|g\.page|maps)[^\s"'<>]*)/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      console.log(`${file}: ${match[1]}`);
    }
  } catch (e) {}
}

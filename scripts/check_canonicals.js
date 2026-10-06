const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === 'dev-tools' || f === 'old-static-html') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res.push(...walk(p));
    } else if (f.endsWith('.html')) {
      res.push(p);
    }
  }
  return res;
}

const files = walk('.');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (match) {
    console.log(`${file}: ${match[1]}`);
  } else {
    console.log(`${file}: NO CANONICAL FOUND`);
  }
}

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
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.ico') || file.endsWith('.webp')) continue;
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (/google.*review|review.*google|g\.page|maps.*place|cid=|maps\/place/i.test(line)) {
        console.log(`${file}:${idx+1}: ${line.trim()}`);
      }
    });
  } catch (e) {}
}

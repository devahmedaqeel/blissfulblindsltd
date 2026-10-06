const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  try {
    for (const f of fs.readdirSync(dir)) {
      if (f === 'node_modules') continue;
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) {
        res.push(...walk(p));
      } else {
        res.push(p);
      }
    }
  } catch(e){}
  return res;
}

const allFiles = walk('.');
const googleLinks = new Set();
for (const file of allFiles) {
  try {
    const text = fs.readFileSync(file, 'utf8');
    const matches = text.match(/https?:\/\/[^\s"'<>\)]+/gi) || [];
    for (const m of matches) {
      if (m.toLowerCase().includes('google') || m.toLowerCase().includes('review') || m.toLowerCase().includes('g.page') || m.toLowerCase().includes('g.co') || m.toLowerCase().includes('maps')) {
        googleLinks.add(`${file} -> ${m}`);
      }
    }
  } catch(e){}
}

for (const l of googleLinks) {
  console.log(l);
}

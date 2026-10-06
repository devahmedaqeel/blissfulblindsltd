const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === 'dev-tools' || f === 'old-static-html') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res.push(...walk(p));
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.md')) {
      res.push(p);
    }
  }
  return res;
}

const files = walk('.');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  ['watford', 'milton-keynes', 'milton keynes'].forEach(term => {
    let idx = 0;
    while ((idx = content.toLowerCase().indexOf(term, idx)) !== -1) {
      const line = content.substring(0, idx).split('\n').length;
      const snippet = content.substring(Math.max(0, idx - 40), Math.min(content.length, idx + 80)).replace(/\r?\n/g, ' ');
      console.log(`${file}:${line} [${term}] ${snippet}`);
      idx += term.length;
    }
  });
}

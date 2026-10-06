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
  try {
    const content = fs.readFileSync(file, 'utf8');
    ['g.page', 'google.com/maps', 'search.google.com', 'review', 'google review', 'place_id', 'cid'].forEach(term => {
      let idx = 0;
      while ((idx = content.toLowerCase().indexOf(term, idx)) !== -1) {
        if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.ico')) {
          const line = content.substring(0, idx).split('\n').length;
          const snippet = content.substring(Math.max(0, idx - 40), Math.min(content.length, idx + 100)).replace(/\r?\n/g, ' ');
          if (snippet.includes('http') || snippet.includes('google') || snippet.includes('review')) {
            console.log(`${file}:${line} [${term}] ${snippet}`);
          }
        }
        idx += term.length;
      }
    });
  } catch (e) {}
}

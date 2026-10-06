const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === 'dev-tools' || f === 'old-static-html') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res.push(...walk(p));
    } else if (f.endsWith('.html') || f.endsWith('.md')) {
      res.push(p);
    }
  }
  return res;
}

const usTerms = [
  /\bcolors\b/gi,
  /\bcolor\b(?!\s*[:=])/gi, // avoid css color:
  /\bcolorings\b/gi,
  /\bcolored\b/gi,
  /\bmotorized\b/gi,
  /\bspecialized\b/gi,
  /\bcustomized\b/gi,
  /\bcustomizing\b/gi,
  /\bcatalog\b/gi,
  /\bcanceled\b/gi,
  /\btheater\b/gi,
  /\bcenter\b(?!\s*[-=:"])/gi, // avoid text-center, center center
  /\bgray\b/gi
];

const files = walk('.');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // skip purely CSS/JS lines in html
    if (line.includes('<style') || line.includes('<script') || line.includes('class="') && !line.includes('>') && line.endsWith('"')) return;
    for (const term of usTerms) {
      if (term.test(line)) {
        // filter out HTML attributes and CSS
        console.log(`${file}:${idx+1} [${term.source}]: ${line.trim()}`);
      }
    }
  });
}

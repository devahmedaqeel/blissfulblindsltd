const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (/(\bcolors\b|\bcolorings\b|\bcolored\b|\bmotorized\b|\bspecialized\b|\bcustomized\b|\bgray\b)/i.test(l)) {
    if (!l.includes('style=') && !l.includes('var(--') && !l.includes('theme-color')) {
      console.log((i+1) + ': ' + l.trim());
    }
  }
});

const fs = require('fs');
const content = fs.readFileSync('src/data/courses.ts', 'utf8');

const m1 = content.match(/\\\\+\s/g) || [];
console.log('Double backslashes before space:', [...new Set(m1)]);

const m2 = content.match(/\\[^\\]\s/g) || [];
console.log('Single backslash before space:', [...new Set(m2)].slice(0, 10));

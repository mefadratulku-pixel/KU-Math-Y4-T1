const fs = require('fs');
const content = fs.readFileSync('src/data/courses.ts', 'utf8');

const matches = content.match(/\\\\+(?![a-zA-Z])/g) || [];
const m1 = content.match(/\\[^\\](?![a-zA-Z])/g) || [];
console.log('Multiple backslashes not followed by letter:', [...new Set(matches)]);
console.log('Single backslash not followed by letter:', [...new Set(m1)].slice(0, 10));

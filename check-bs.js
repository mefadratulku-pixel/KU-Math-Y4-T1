const fs = require('fs');
const content = fs.readFileSync('src/data/courses.ts', 'utf8');

// Find all matches of 2 or more backslashes
const matches = content.match(/\\\\+./g) || [];
const unique = [...new Set(matches)];
console.log("Sequences of multiple backslashes:");
console.log(unique.slice(0, 30));

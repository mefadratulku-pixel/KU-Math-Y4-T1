const fs = require('fs');

const content = fs.readFileSync('src/data/courses.ts', 'utf8');

// A very naive parser just to extract questions to see if there are exact duplicates.
// We can use a regex to grab all `question: "..."` or `question: \`...\``
const questionRegex = /question:\s*(["`])(.*?)\1/gs;
let match;
let questions = [];

while ((match = questionRegex.exec(content)) !== null) {
  const qText = match[2].trim();
  questions.push(qText);
}

const counts = {};
questions.forEach(q => {
  counts[q] = (counts[q] || 0) + 1;
});

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`Total questions: ${questions.length}`);
console.log(`Unique questions: ${sorted.length}`);
console.log("Most frequent questions:");
sorted.slice(0, 10).forEach(([q, count]) => {
  if (count > 1) {
    console.log(`(${count} times) ${q.substring(0, 80)}...`);
  }
});

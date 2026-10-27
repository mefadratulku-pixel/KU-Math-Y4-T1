// Reproduction script: render every $...$ / $$...$$ segment from the course data
// with the project's own KaTeX and list every segment that fails to parse.
// Usage: node scripts/check-katex.mjs [--json]  (prints failures + per-course counts)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function loadData() {
  let hydro = fs.readFileSync(path.join(root, 'src/data/hydrodynamics.ts'), 'utf8');
  let courses = fs.readFileSync(path.join(root, 'src/data/courses.ts'), 'utf8');
  // Strip imports and the interface declarations (types only, no runtime effect).
  hydro = hydro.replace(/^import.*$/m, '').replace('export const hydrodynamicsData: Course', 'const hydrodynamicsData');
  courses = courses
    .replace(/^import.*$/m, '')
    .replace(/export interface Question \{[\s\S]*?\n\}\n\n/, '')
    .replace(/export interface ExamSection \{[\s\S]*?\n\}\n\n/, '')
    .replace(/export interface PYQYear \{[\s\S]*?\n\}\n\n/, '')
    .replace(/export interface Course \{[\s\S]*?\n\}\n\n/, '')
    .replace('export const coursesData: Course[]', 'const coursesData');
  const fn = new Function(`${hydro}\n${courses}\nreturn coursesData;`);
  return fn();
}

// Extract math segments the way the rendered page sees them: display $$...$$
// first, then inline $...$ from what remains. Empty segments are skipped.
function extractMath(text) {
  const segments = [];
  const withoutDisplay = text.replace(/\$\$([\s\S]+?)\$\$/g, (m, body) => {
    if (body.trim()) segments.push({ display: true, math: body });
    return ' ';
  });
  withoutDisplay.replace(/(?<!\$)\$(?!\$)([^$]+?)\$/g, (m, body) => {
    if (body.trim()) segments.push({ display: false, math: body });
    return m;
  });
  return segments;
}

const coursesData = loadData();
const failures = [];
const counts = {};
let totalSegments = 0;

for (const [ci, course] of coursesData.entries()) {
  const key = `${course.id}#${ci}`;
  counts[key] = { tested: 0, failed: 0 };
  for (const year of course.years) {
    for (const section of year.sections) {
      for (const q of section.questions) {
        for (const field of ['question', 'solution']) {
          const text = q[field] || '';
          for (const seg of extractMath(text)) {
            counts[key].tested += 1;
            totalSegments += 1;
            try {
              katex.renderToString(seg.math, { displayMode: seg.display, throwOnError: true });
            } catch (e) {
              counts[key].failed += 1;
              failures.push({
                course: course.id,
                courseTitle: course.title,
                year: year.year,
                session: year.session || '(missing)',
                section: section.title,
                qid: q.id,
                part: q.part,
                field,
                display: seg.display,
                math: seg.math.length > 300 ? seg.math.slice(0, 300) + '…' : seg.math,
                error: String(e.message).split('\n')[0],
              });
            }
          }
        }
      }
    }
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ totalSegments, counts, failures }, null, 2));
} else {
  console.log(`Total math segments tested: ${totalSegments}`);
  for (const [id, c] of Object.entries(counts)) {
    console.log(`  ${id}: tested=${c.tested} failed=${c.failed}`);
  }
  console.log(`\nFailures: ${failures.length}`);
  for (const f of failures) {
    console.log(`\n--- ${f.course} | ${f.year} | ${f.section} | Q ${f.part} (${f.qid}) | ${f.field} | display=${f.display}`);
    console.log(`    ERROR: ${f.error}`);
    console.log(`    MATH: ${JSON.stringify(f.math)}`);
  }
}

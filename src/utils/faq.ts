import { Course, Question } from '@/data/courses';

export interface FAQ {
  questionText: string;
  solution: string;
  marks: number;
  frequency: number;
  yearsAppeared: string[];
  hash: string;
}

/**
 * Normalizes a question string to help identify duplicates.
 * Removes all spaces, newlines, and punctuation for comparison.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\\s\\W_]+/g, ''); // Removes spaces, punctuation, special chars
}

/**
 * Generates a consistent hash for a question text
 */
export function generateQuestionHash(text: string): string {
  const normalized = normalizeText(text);
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(36); // Convert to base36 alphanumeric string
}

/**
 * Analyzes a course and extracts frequently asked questions.
 */
export function getFrequentQuestions(course: Course): FAQ[] {
  const questionMap = new Map<string, FAQ>();

  // Iterate through all years, sections, and questions
  course.years.forEach((yearData) => {
    yearData.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const hash = generateQuestionHash(q.question);

        if (questionMap.has(hash)) {
          // Question already exists, increment frequency and add year if not present
          const existing = questionMap.get(hash)!;
          existing.frequency += 1;
          if (!existing.yearsAppeared.includes(yearData.year)) {
            existing.yearsAppeared.push(yearData.year);
          }
          // Optionally, keep the longest solution or highest marks
          if (q.solution.length > existing.solution.length) {
            existing.solution = q.solution;
          }
          if (q.marks > existing.marks) {
            existing.marks = q.marks;
          }
        } else {
          // New unique question
          questionMap.set(hash, {
            questionText: q.question,
            solution: q.solution,
            marks: q.marks,
            frequency: 1,
            yearsAppeared: [yearData.year],
            hash: hash
          });
        }
      });
    });
  });

  // Convert to array and filter out questions asked only once
  // Then sort by frequency (highest first)
  const faqList = Array.from(questionMap.values())
    .filter(faq => faq.frequency > 1)
    .sort((a, b) => b.frequency - a.frequency);

  return faqList;
}

import Link from 'next/link';
import { coursesData } from '@/data/courses';
import { notFound } from 'next/navigation';
import { getFrequentQuestions } from '@/utils/faq';
import CourseTabsView from '@/components/CourseTabsView';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    notFound();
  }

  const frequentQuestions = getFrequentQuestions(course);

  return (
    <main className="min-h-screen bg-white bg-grid-pattern py-16 px-6 font-space text-black">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12">
          <Link href="/" className="inline-block px-4 py-2 bg-[#FDE047] border-2 border-black shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 font-bold text-sm uppercase transition-all">
            ← BACK TO HOME
          </Link>
        </div>

        <header className="mb-12 relative">
          <div className="absolute -top-4 -left-4 -rotate-6 bg-[#86EFAC] px-3 py-1 border-2 border-black shadow-brutal z-10 font-kalam font-bold text-lg">
            {course.code}
          </div>
          <div className="relative inline-block border-2 border-black p-8 bg-white shadow-brutal-lg w-full">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-lg font-bold">
                {course.description}
              </p>
            )}
          </div>
        </header>

        <CourseTabsView course={course} frequentQuestions={frequentQuestions} />
      </div>
    </main>
  );
}

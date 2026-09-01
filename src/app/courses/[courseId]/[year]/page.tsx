import Link from 'next/link';
import { coursesData } from '@/data/courses';
import { notFound } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';

export default async function YearSolutionsPage({ params }: { params: Promise<{ courseId: string, year: string }> }) {
  const { courseId, year } = await params;
  
  const course = coursesData.find(c => c.id === courseId);
  if (!course) notFound();

  const yearData = course.years.find(y => y.year === year);
  if (!yearData) notFound();

  return (
    <main className="min-h-screen bg-white bg-grid-pattern py-16 px-6 font-space text-black">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-10">
          <Link href={`/courses/${course.id}`} className="inline-block px-4 py-2 bg-[#F9A8D4] border-2 border-black shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 font-bold text-sm uppercase transition-all">
            ← BACK TO {course.title}
          </Link>
        </div>

        <header className="mb-16 border-b-4 border-black pb-10 relative">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
            {course.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#5EEAD4] border-2 border-black shadow-brutal px-4 py-1 text-sm font-black uppercase">
              {course.code}
            </span>
            <span className="bg-white border-2 border-black shadow-brutal px-4 py-1 text-sm font-black uppercase">
              SESSION: {yearData.session}
            </span>
          </div>
        </header>

        <div className="space-y-20">
          {yearData.sections.map((section, idx) => (
            <section key={idx} className="relative">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 inline-flex items-center gap-4 bg-[#FDE047] px-6 py-3 border-2 border-black shadow-brutal">
                <span className="bg-black text-[#FDE047] w-10 h-10 flex items-center justify-center font-black">
                  {String.fromCharCode(65 + idx)}
                </span>
                {section.title}
              </h2>
              
              <div className="space-y-10">
                {section.questions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

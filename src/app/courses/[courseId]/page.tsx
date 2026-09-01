import Link from 'next/link';
import { coursesData } from '@/data/courses';
import { notFound } from 'next/navigation';
import { getFrequentQuestions } from '@/utils/faq';
import FAQSection from '@/components/FAQSection';

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

        <header className="mb-20 relative">
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

        {frequentQuestions.length > 0 && (
          <FAQSection faqs={frequentQuestions} />
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 inline-block bg-[#F9A8D4] px-4 py-2 border-2 border-black shadow-brutal">
            Available Sessions
          </h2>
          <div className="space-y-6">
            {course.years.map((yearData) => (
              <Link 
                key={yearData.year}
                href={`/courses/${course.id}/${yearData.year}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border-2 border-black shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all duration-200"
              >
                <div className="mb-4 sm:mb-0">
                  <div className="font-black text-2xl uppercase mb-1">{yearData.session}</div>
                  <div className="font-bold text-sm">Explore step-by-step solutions</div>
                </div>
                <div className="self-start sm:self-auto shrink-0 flex items-center gap-2 bg-[#5EEAD4] border-2 border-black px-4 py-2 font-bold uppercase transition-all group-hover:bg-black group-hover:text-[#5EEAD4]">
                  View Solutions →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

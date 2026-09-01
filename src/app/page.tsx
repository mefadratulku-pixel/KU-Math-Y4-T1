import Link from 'next/link';
import { coursesData } from '@/data/courses';

export default function Home() {
  const stickerColors = ['bg-[#5EEAD4]', 'bg-[#FDE047]', 'bg-[#F9A8D4]', 'bg-[#86EFAC]'];

  return (
    <main className="min-h-screen bg-white bg-grid-pattern overflow-hidden font-space">
      {/* Top Navigation - Brutalist Style */}
      <nav className="border-b-2 border-black bg-white flex items-center justify-between px-6 h-16 sticky top-0 z-50">
        <div className="flex items-center h-full border-x-2 border-black">
          <div className="px-6 h-full flex items-center justify-center border-r-2 border-black hover:bg-[#5EEAD4] cursor-pointer transition-colors bg-[#5EEAD4]">
            <span className="font-black text-sm uppercase tracking-widest">HOME</span>
          </div>
          <div className="px-6 h-full flex items-center justify-center border-r-2 border-black hover:bg-[#FDE047] cursor-pointer transition-colors">
            <span className="font-black text-sm uppercase tracking-widest">COURSES</span>
          </div>
          <div className="px-6 h-full flex items-center justify-center hover:bg-[#F9A8D4] cursor-pointer transition-colors">
            <span className="font-black text-sm uppercase tracking-widest">ABOUT</span>
          </div>
        </div>
        <div className="flex items-center h-full border-x-2 border-black">
          <div className="px-6 h-full flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition-colors">
            <span className="font-black text-sm uppercase tracking-widest">CONTACT</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-24 relative">
        {/* Hero Section */}
        <header className="mb-32 text-center relative mt-10">
          <div className="absolute top-[-40px] left-1/4 -rotate-6 bg-[#86EFAC] px-4 py-2 border-2 border-black shadow-brutal z-10 font-kalam text-xl">
            Pass your exams easily!
          </div>
          <div className="absolute top-[-20px] right-1/4 rotate-3 bg-[#FDE047] px-4 py-2 border-2 border-black shadow-brutal z-10 font-kalam text-xl">
            Previous Year Questions
          </div>
          
          <div className="relative inline-block border-2 border-black p-8 bg-white shadow-brutal-lg">
            {/* Resize handles decoration */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#5EEAD4] border-2 border-black"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#5EEAD4] border-2 border-black"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#5EEAD4] border-2 border-black"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#5EEAD4] border-2 border-black"></div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              4.1 TERM<br/>PREVIOUS YEAR<br/>QUESTION SOLVE.
            </h1>
          </div>

          <div className="mt-12 flex justify-center items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#5EEAD4] border-2 border-black"></div>
            <p className="font-bold uppercase tracking-widest text-sm">
              prepared by Mefad.
            </p>
          </div>
        </header>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {coursesData.map((course, idx) => {
            const color = stickerColors[idx % stickerColors.length];
            return (
              <Link 
                key={course.id} 
                href={`/courses/${course.id}`}
                className="group relative block bg-white border-2 border-black p-8 shadow-brutal hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all duration-200"
              >
                {/* Decorative floating sticker */}
                <div className={`absolute -top-4 -right-4 ${color} px-3 py-1 border-2 border-black shadow-brutal rotate-3 font-kalam font-bold text-lg`}>
                  {course.code?.split('-')[1] || course.code || 'CODE'}
                </div>

                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl mb-6">
                  {idx + 1}
                </div>
                
                <h2 className="text-2xl font-black uppercase leading-tight mb-4 group-hover:underline decoration-4 underline-offset-4">
                  {course.title}
                </h2>
                <p className="font-bold text-sm bg-gray-100 border-2 border-black inline-block px-3 py-1 mb-8">
                  {course.code || 'Code N/A'}
                </p>
                
                <div className="border-t-2 border-black pt-4 flex justify-between items-center font-bold">
                  <span>{course.years.length} SESSIONS</span>
                  <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-[#F9A8D4] transition-colors">
                    →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

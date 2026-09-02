'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/data/courses';
import { FAQ } from '@/utils/faq';
import FAQSection from './FAQSection';
import CourseAdvancedSearch from './CourseAdvancedSearch';

interface CourseTabsViewProps {
  course: Course;
  frequentQuestions: FAQ[];
}

type Tab = 'priority' | 'pyq' | 'search';

export default function CourseTabsView({ course, frequentQuestions }: CourseTabsViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('priority');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'priority', label: 'Top Priority', icon: '🔥' },
    { id: 'pyq', label: 'PYQ Sessions', icon: '📚' },
    { id: 'search', label: 'Advanced Search', icon: '🔍' },
  ];

  return (
    <div className="mt-8">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-4 mb-12 border-b-4 border-black pb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-all
                ${isActive 
                  ? 'bg-black text-white shadow-none translate-y-1 translate-x-1' 
                  : 'bg-white text-black shadow-brutal hover:bg-gray-100 hover:-translate-y-0.5 hover:-translate-x-0.5'
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[50vh]">
        {/* Priority Tab */}
        {activeTab === 'priority' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {frequentQuestions.length > 0 ? (
              <FAQSection faqs={frequentQuestions} />
            ) : (
              <div className="bg-white border-2 border-black p-10 text-center shadow-brutal">
                <h3 className="text-2xl font-black uppercase mb-2">No Priority Questions Yet</h3>
                <p className="font-bold text-gray-600">Check back later or explore other sessions.</p>
              </div>
            )}
          </div>
        )}

        {/* PYQ Sessions Tab */}
        {activeTab === 'pyq' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
        )}

        {/* Advanced Search Tab */}
        {activeTab === 'search' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CourseAdvancedSearch course={course} />
          </div>
        )}
      </div>
    </div>
  );
}

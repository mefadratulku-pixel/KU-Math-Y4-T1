'use client';

import React, { useState } from 'react';
import { FAQ } from '@/utils/faq';
import MathRenderer from './MathRenderer';
import { useProgress } from '@/hooks/useProgress';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const { isQuestionMarked, toggleQuestion, isLoaded } = useProgress();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isLoaded || faqs.length === 0) return null;

  return (
    <div className="mb-16 relative">
      <div className="absolute -top-4 -right-4 rotate-3 bg-[#FDE047] px-4 py-2 border-2 border-black shadow-brutal z-10 font-kalam font-bold text-xl">
        High Yield!
      </div>
      <div className="bg-white border-2 border-black shadow-brutal-lg overflow-hidden">
        <div className="px-8 py-6 bg-[#86EFAC] border-b-2 border-black">
          <h2 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center gap-3">
            <span className="text-2xl">🔥</span> Top Priority Questions
          </h2>
          <p className="text-black font-bold mt-2 text-sm">
            These questions have appeared multiple times across different years. Focus on these first!
          </p>
        </div>
        
        <div className="p-8 bg-white space-y-6">
          {faqs.map((faq) => {
            const isDone = isQuestionMarked(faq.hash);
            const isExpanded = expandedId === faq.hash;

            return (
              <div 
                key={faq.hash}
                className={`bg-white border-2 border-black shadow-brutal transition-all duration-300 ${
                  isDone ? 'opacity-80' : ''
                }`}
              >
                <div 
                  className={`border-b-2 border-black px-6 py-5 flex justify-between items-start gap-4 cursor-pointer ${
                    isDone ? 'bg-[#86EFAC]' : 'bg-[#F9A8D4] hover:bg-black hover:text-[#F9A8D4]'
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : faq.hash)}
                >
                  {/* Checkbox */}
                  <div 
                    className="mt-1 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuestion(faq.hash);
                    }}
                  >
                    <div className={`w-8 h-8 border-2 flex items-center justify-center transition-all ${
                      isDone 
                        ? 'bg-black border-black' 
                        : 'border-black bg-white hover:bg-black group'
                    }`}>
                      {isDone ? (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 hidden group-hover:block bg-[#5EEAD4]"></div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-sm font-black px-4 py-1 border-2 border-black shadow-brutal transition-colors ${
                        isDone ? 'bg-white text-black' : 'bg-[#FDE047] text-black'
                      }`}>
                        🔥 {faq.frequency} TIMES
                      </span>
                      <span className="text-black text-sm font-black bg-white border-2 border-black px-4 py-1 shadow-brutal">
                        {faq.yearsAppeared.sort().join(', ')}
                      </span>
                    </div>
                    <div className={`font-bold text-lg leading-relaxed transition-all ${isDone ? 'line-through' : ''}`}>
                      <MathRenderer content={faq.questionText} />
                    </div>
                  </div>
                  
                  {/* Expand icon */}
                  <div className={`shrink-0 mt-2 font-black text-2xl transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
                    +
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-6 py-8 bg-white border-t-2 border-black border-dashed">
                    <h4 className="text-sm font-black tracking-widest text-black uppercase mb-6 inline-block bg-[#5EEAD4] px-3 py-1 border-2 border-black shadow-brutal">
                      SOLUTION
                    </h4>
                    <div className={isDone ? 'opacity-80' : ''}>
                      <MathRenderer content={faq.solution} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

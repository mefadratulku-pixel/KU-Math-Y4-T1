'use client';

import React, { useState } from 'react';
import MathRenderer from './MathRenderer';
import { Question } from '@/data/courses';
import { useProgress } from '@/hooks/useProgress';
import { generateQuestionHash } from '@/utils/faq';

export default function QuestionCard({ question }: { question: Question }) {
  const { isQuestionMarked, toggleQuestion, isLoaded } = useProgress();
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (!isLoaded) return null;

  const hash = generateQuestionHash(question.question);
  const isDone = isQuestionMarked(hash);

  return (
    <div className={`bg-white border-2 border-black shadow-brutal mb-10 transition-all duration-300 ${
      isDone ? 'opacity-80' : ''
    }`}>
      <div 
        className={`border-b-2 border-black px-6 py-5 flex justify-between items-start gap-4 cursor-pointer ${
          isDone ? 'bg-[#86EFAC]' : 'bg-[#F9A8D4] hover:bg-black hover:text-[#F9A8D4]'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Checkbox */}
        <div 
          className="mt-1 shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            toggleQuestion(hash);
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
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-black px-4 py-1 border-2 border-black shadow-brutal transition-colors ${
              isDone ? 'bg-white text-black' : 'bg-[#FDE047] text-black'
            }`}>
              Q {question.part}
            </span>
            <span className="text-black text-sm font-black bg-white border-2 border-black px-4 py-1 shadow-brutal">
              MARKS: {question.marks}
            </span>
          </div>
          <div className={`font-bold text-lg leading-relaxed transition-all ${isDone ? 'line-through' : ''}`}>
            <MathRenderer content={question.question} />
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
            <MathRenderer content={question.solution} />
          </div>
        </div>
      )}
    </div>
  );
}

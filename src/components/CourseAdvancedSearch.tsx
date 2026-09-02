'use client';

import React, { useState, useMemo } from 'react';
import { Course } from '@/data/courses';
import QuestionCard from './QuestionCard';

interface AdvancedSearchProps {
  course: Course;
}

export default function AdvancedSearch({ course }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState('ALL');

  // Flatten all questions
  const allQuestions = useMemo(() => {
    return course.years.flatMap(year => 
      year.sections.flatMap(section => 
        section.questions.map(q => ({
          ...q,
          // Add metadata to identify where it came from
          _meta: {
            year: year.year,
            session: year.session || year.year,
            section: section.title
          }
        }))
      )
    );
  }, [course]);

  // Get unique sessions for the filter dropdown
  const sessions = useMemo(() => {
    const unique = new Set(allQuestions.map(q => q._meta.session));
    return ['ALL', ...Array.from(unique)];
  }, [allQuestions]);

  // Filter questions based on search query and selected session
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      const matchSession = selectedSession === 'ALL' || q._meta.session === selectedSession;
      
      const query = searchQuery.toLowerCase();
      const matchQuery = !query || 
        q.question.toLowerCase().includes(query) || 
        q.solution.toLowerCase().includes(query);

      return matchSession && matchQuery;
    });
  }, [allQuestions, searchQuery, selectedSession]);

  return (
    <div>
      {/* Search Controls */}
      <div className="bg-white border-2 border-black shadow-brutal p-6 mb-10 flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <label htmlFor="search" className="block font-black uppercase text-sm mb-2">
            Search Keywords
          </label>
          <input
            id="search"
            type="text"
            placeholder="e.g., eigenvalue, matrix, Bernoulli..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#5EEAD4] transition-shadow"
          />
        </div>
        <div className="w-full md:w-64">
          <label htmlFor="session" className="block font-black uppercase text-sm mb-2">
            Filter by Session
          </label>
          <select
            id="session"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#5EEAD4] transition-shadow cursor-pointer appearance-none"
            style={{
              backgroundImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(135deg, black 50%, transparent 50%)',
              backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
              backgroundSize: '5px 5px, 5px 5px',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {sessions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6 font-bold uppercase tracking-widest text-sm bg-black text-white inline-block px-4 py-2 border-2 border-black shadow-brutal">
        Found {filteredQuestions.length} Questions
      </div>

      {/* Results List */}
      <div className="space-y-10">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div key={`${q._meta.session}-${q._meta.section}-${q.id}`} className="relative">
              {/* Badge to show where it came from */}
              <div className="absolute -top-4 -right-2 bg-[#FDE047] px-3 py-1 border-2 border-black shadow-brutal z-10 font-bold text-xs uppercase rotate-2">
                {q._meta.session} | {q._meta.section}
              </div>
              
              <QuestionCard question={q} />
            </div>
          ))
        ) : (
          <div className="bg-white border-2 border-black p-10 text-center shadow-brutal">
            <h3 className="text-2xl font-black uppercase mb-2">No Results Found</h3>
            <p className="font-bold text-gray-600">Try adjusting your search terms or changing the session filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

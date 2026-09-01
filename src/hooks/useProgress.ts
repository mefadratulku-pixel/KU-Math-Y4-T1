'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pyq_progress';

export function useProgress() {
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMarkedQuestions(new Set(parsed));
        }
      }
    } catch (e) {
      console.error('Failed to parse progress from local storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleQuestion = (questionHash: string) => {
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionHash)) {
        newSet.delete(questionHash);
      } else {
        newSet.add(questionHash);
      }
      
      // Save to local storage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
      } catch (e) {
        console.error('Failed to save progress to local storage', e);
      }
      
      return newSet;
    });
  };

  const isQuestionMarked = (questionHash: string) => {
    return markedQuestions.has(questionHash);
  };

  return {
    markedQuestions,
    toggleQuestion,
    isQuestionMarked,
    isLoaded
  };
}

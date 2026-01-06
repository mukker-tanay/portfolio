'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type TransitionStage = 'idle' | 'out' | 'interlude' | 'in';

interface TransitionContextType {
  stage: TransitionStage;
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<TransitionStage>('idle');
  const router = useRouter();

  const navigate = (href: string) => {
    if (stage !== 'idle') return;

    // 1. Fade Out Content
    setStage('out');

    // 2. Animate Globe to Center (Interlude)
    setTimeout(() => {
      setStage('interlude');
      
      // 3. Navigation & Reset
      setTimeout(() => {
        router.push(href);
        
        // Allow router to update state
        setTimeout(() => {
            setStage('in');
            setTimeout(() => setStage('idle'), 500); // Wait for fade in
        }, 500); // Time for page load roughly
        
      }, 1000); // Globe animation duration in center
    }, 500); // Fade out duration
  };

  return (
    <TransitionContext.Provider value={{ stage, navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

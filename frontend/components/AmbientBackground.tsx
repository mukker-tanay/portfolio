'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AmbientScene = dynamic(() => import('./AmbientScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 pointer-events-none z-[-1]" />,
});

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <Suspense fallback={null}>
        <AmbientScene />
      </Suspense>
    </div>
  );
}

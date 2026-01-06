'use client';

import { useTransition } from '@/context/TransitionContext';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { stage } = useTransition();

  const variants = {
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  };

  return (
    <motion.div
      initial="visible"
      animate={stage === 'out' || stage === 'interlude' ? 'hidden' : 'visible'}
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

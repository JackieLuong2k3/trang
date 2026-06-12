/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface BouncyWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export default function BouncyWrapper({
  children,
  delay = 0,
  className = '',
  id,
}: BouncyWrapperProps) {
  return (
    <motion.div
      id={id}
      initial={{ scale: 0.95, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 20,
        delay: delay,
      }}
      whileHover={{ 
        scale: 1.01, 
        rotate: 0.5,
        transition: { type: 'spring', stiffness: 300, damping: 18 }
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

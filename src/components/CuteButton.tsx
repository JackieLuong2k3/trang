/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { AppTheme } from '../types';
import { audio } from '../utils/audio';

interface CuteButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  theme: AppTheme;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  className?: string;
  soundType?: 'bubble' | 'pop' | 'success' | 'chirp';
  id?: string;
}

export default function CuteButton({
  children,
  onClick,
  theme,
  variant = 'primary',
  className = '',
  soundType = 'bubble',
  id,
}: CuteButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Play cute sound
    if (soundType === 'bubble') audio.playBubble();
    else if (soundType === 'pop') audio.playPop();
    else if (soundType === 'chirp') audio.playChirp();
    else if (soundType === 'success') audio.playSuccessChime();

    // 2. Play haptic feedback (vibrate 30ms)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(30);
      } catch (err) {
        // Safe fail
      }
    }

    // 3. User callback
    if (onClick) {
      onClick(e);
    }
  };

  // Styles based on theme and variant
  let styleClasses = '';

  if (theme === 'pastel') {
    // Pastel Soft Fluffy
    styleClasses = 'rounded-2xl transition-all duration-300 font-bold active:scale-95 ';
    if (variant === 'primary') {
      styleClasses += 'bg-[#FF9AA2] text-white hover:bg-[#ff85a1] shadow-[0_5px_15px_-4px_rgba(255,154,162,0.5)]';
    } else if (variant === 'secondary') {
      styleClasses += 'bg-[#B5EAD7] text-[#3d5e52] hover:bg-[#9edec7] shadow-[0_5px_15px_-4px_rgba(181,234,215,0.4)]';
    } else if (variant === 'accent') {
      styleClasses += 'bg-[#FFDAC1] text-[#7c502f] hover:bg-[#fcc8a3] shadow-[0_5px_15px_-4px_rgba(255,218,193,0.4)]';
    } else {
      styleClasses += 'bg-[#ffe4e6] text-[#e11d48] hover:bg-[#fecdd3]';
    }
  } else {
    // Neo-Brutalism Pop using clay-brown borders #5D4E4E
    styleClasses = 'rounded-xl transition-all font-extrabold border-3 border-[#5D4E4E] ';
    if (variant === 'primary') {
      styleClasses += 'bg-[#FFDAC1] text-[#5D4E4E] hover:bg-[#fcbc8f] shadow-[3px_3px_0px_0px_#5D4E4E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#5D4E4E]';
    } else if (variant === 'secondary') {
      styleClasses += 'bg-[#C7CEEA] text-[#5D4E4E] hover:bg-[#b0b9e3] shadow-[3px_3px_0px_0px_#5D4E4E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#5D4E4E]';
    } else if (variant === 'accent') {
      styleClasses += 'bg-[#B5EAD7] text-[#5D4E4E] hover:bg-[#9edec7] shadow-[3px_3px_0px_0px_#5D4E4E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#5D4E4E]';
    } else {
      styleClasses += 'bg-[#FF9AA2] text-white hover:bg-[#f7828c] shadow-[3px_3px_0px_0px_#5D4E4E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#5D4E4E]';
    }
  }

  return (
    <motion.button
      id={id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 450, damping: 15 }}
      onClick={handleClick}
      className={`px-5 py-2.5 text-sm cursor-pointer select-none inline-flex items-center justify-center gap-2 outline-none ${styleClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
}

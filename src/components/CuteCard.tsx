/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTheme } from '../types';

interface CuteCardProps {
  children: React.ReactNode;
  theme: AppTheme;
  className?: string;
  accentColor?: string; // Optional CSS class for top color stripe or accent border
  padding?: string;
  id?: string;
  onClick?: () => void;
  key?: React.Key;
}

export default function CuteCard({
  children,
  theme,
  className = '',
  accentColor,
  padding = 'p-6',
  id,
  onClick,
}: CuteCardProps) {
  let containerStyles = '';

  if (theme === 'pastel') {
    // Soft & fluffy pink-shadow card with rounded-3xl
    containerStyles = `bg-white/95 rounded-3xl transition-all duration-500 hover:-translate-y-1 shadow-[0_12px_36px_-6px_rgba(255,182,193,0.3)] border border-rose-100/50`;
  } else {
    // Neo-Brutalism sharp card with heavy borders and comic shadows matching Artistic Flair #5D4E4E
    containerStyles = `bg-white border-3 border-[#5D4E4E] rounded-2xl transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#5D4E4E] shadow-[4px_4px_0px_0px_#5D4E4E]`;
  }

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${containerStyles} ${padding} overflow-hidden relative ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
    >
      {/* Decorative Top Accent Line if Pastel */}
      {theme === 'pastel' && accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${accentColor}`} />
      )}
      
      {/* Brutalist Stripe */}
      {theme === 'brutalist' && accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-3 border-b-3 border-[#5D4E4E] bg-gradient-to-r ${accentColor}`} />
      )}

      {/* Main card body with slightly modified padding if top stripe exists */}
      <div className={accentColor ? 'pt-3' : ''}>
        {children}
      </div>
    </div>
  );
}

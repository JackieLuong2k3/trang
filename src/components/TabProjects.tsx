/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppTheme, Project } from '../types';
import CuteCard from './CuteCard';
import CuteButton from './CuteButton';
import { PROJECTS_DATA } from '../utils/data';
import * as LucideIcons from 'lucide-react';
import { audio } from '../utils/audio';

interface TabProjectsProps {
  theme: AppTheme;
  language: 'vi' | 'en';
}

type ProjectFilter = 'all' | 'trade' | 'collector' | 'service' | 'event' | 'guide';

export default function TabProjects({ theme, language }: TabProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [showConfettiTip, setShowConfettiTip] = useState(false);
  const isPastel = theme === 'pastel';

  const handleFilterChange = (newFilter: ProjectFilter) => {
    audio.playPop();
    setFilter(newFilter);
  };

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const getCategoryEmoji = (cat: string) => {
    switch (cat) {
      case 'trade': return '💸';
      case 'collector': return '💎';
      case 'service': return '🛠️';
      case 'event': return '🎉';
      case 'guide': return '📚';
      default: return '✨';
    }
  };

  return (
    <div className="space-y-6" id="tab-projects-container">
      {/* Search & Filter bar wrapper */}
      <div className="flex flex-col gap-4">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {(['all', 'trade', 'collector', 'service', 'event', 'guide'] as ProjectFilter[]).map((catName) => {
            const isActive = filter === catName;
            
            // Text values
            let label = catName.toUpperCase();
            if (language === 'vi') {
              if (catName === 'all') label = 'Tất cả ✨';
              else if (catName === 'trade') label = 'Trade Acc 💸';
              else if (catName === 'collector') label = 'Sưu Tầm 💎';
              else if (catName === 'service') label = 'Dịch Vụ 🛠️';
              else if (catName === 'event') label = 'Sự Kiện 🎉';
              else if (catName === 'guide') label = 'Hướng Dẫn 📚';
            } else {
              if (catName === 'all') label = 'All ✨';
              else if (catName === 'trade') label = 'Trades 💸';
              else if (catName === 'collector') label = 'Collector 💎';
              else if (catName === 'service') label = 'Services 🛠️';
              else if (catName === 'event') label = 'Events 🎉';
              else if (catName === 'guide') label = 'Guides 📚';
            }

            return (
              <button
                key={catName}
                onClick={() => handleFilterChange(catName)}
                className={`text-xs px-4 py-2 cursor-pointer transition-all duration-300 font-bold outline-none rounded-full border ${
                  isActive 
                    ? isPastel
                      ? 'bg-[#FF9AA2] border-[#FF9AA2] text-white shadow-[0_4px_12px_rgba(255,154,162,0.4)]'
                      : 'bg-[#B5EAD7] border-[#5D4E4E] border-2 shadow-[2px_2px_0px_0px_#5D4E4E] text-[#5D4E4E] font-extrabold translate-y-[1px]'
                    : isPastel
                      ? 'bg-white hover:bg-[#fff5f5] text-zinc-600 border-zinc-200 shadow-sm'
                      : 'bg-white hover:bg-zinc-50 border-[#5D4E4E] text-[#5D4E4E] border-2 shadow-[2px_2px_0px_0px_#5D4E4E]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with entry animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => {
            // Find Icon
            const IconComp = (LucideIcons as any)[project.iconName] || LucideIcons.Laptop;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{ willChange: 'transform, opacity' }}
                className="relative"
              >
                <CuteCard 
                  theme={theme} 
                  accentColor={project.color}
                  padding="p-5"
                  className="h-full flex flex-col justify-between"
                >
                  {/* Card top banner details */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      {/* Icon bubble */}
                      <div className={`p-2.5 rounded-xl bg-orange-50/80 border border-orange-100 flex items-center justify-center`}>
                        <IconComp className="w-5 h-5 text-orange-600" />
                      </div>

                      {/* Status / Hearts */}
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full mb-1 border border-zinc-200">
                          {getCategoryEmoji(project.category)} {project.category}
                        </span>
                        
                        {/* Cuteness Meter with cute hearts */}
                        <div className="flex text-rose-400 gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx} className="text-xs">
                              {idx < project.cutenessRating ? '💖' : '🤍'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-zinc-800 mb-1.5 flex items-center gap-1.5 leading-snug">
                      {language === 'vi' ? project.titleVi : project.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {language === 'vi' ? project.descriptionVi : project.description}
                    </p>
                  </div>

                  {/* Tags and interaction link footer */}
                  <div className="mt-auto space-y-3 pt-2">
                    {/* Tags list */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-mono bg-zinc-50 text-zinc-500 rounded-md px-1.5 py-0.5 border border-zinc-200/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Demo Button launch pad */}
                    <div className="flex justify-between items-center text-xs pt-1.5 border-t border-dashed border-zinc-100">
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {project.status === 'completed' 
                          ? (language === 'vi' ? 'Hoàn thành 🍒' : 'Finished 🍒')
                          : project.status === 'ongoing'
                            ? (language === 'vi' ? 'Đang viết 🚀' : 'Active build 🚀')
                            : (language === 'vi' ? 'Ấp ủ ⭐' : 'Dreaming ⭐')
                        }
                      </span>

                      <CuteButton 
                        theme={theme} 
                        variant="secondary" 
                        soundType="chirp"
                        className="py-1 px-3 text-[11px] rounded-lg cursor-pointer"
                        onClick={() => {
                          // Spray temporary floating hearts alert
                          audio.playChirp();
                          const confettiCanvas = (window as any).__confettiCanvas;
                          if (confettiCanvas) confettiCanvas.burst();
                        }}
                      >
                        {language === 'vi' ? 'Xem thử 🌟' : 'Launch Demo 🌟'}
                      </CuteButton>
                    </div>
                  </div>
                </CuteCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom info banner */}
      <div className="text-center text-[11px] text-zinc-400 italic">
        {language === 'vi' 
        ? '* Bấm "Xem thử 🌟" để nhận confetti mừng deal thành công — cùng Trang trade vui nha!'
        : '* Click "Launch Demo 🌟" to celebrate a successful trade with a sparkle burst!'}
      </div>
    </div>
  );
}

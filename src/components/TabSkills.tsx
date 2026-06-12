/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { AppTheme } from '../types';
import CuteCard from './CuteCard';
import { SKILLS_DATA } from '../utils/data';
import * as LucideIcons from 'lucide-react';

interface TabSkillsProps {
  theme: AppTheme;
  language: 'vi' | 'en';
}

export default function TabSkills({ theme, language }: TabSkillsProps) {
  const isPastel = theme === 'pastel';

  return (
    <div className="space-y-6" id="tab-skills-container">
      {/* Introduction text */}
      <div className="text-center max-w-lg mx-auto mb-4">
        <h3 className={`text-xl font-bold mb-1.5 ${isPastel ? 'text-pink-600' : 'text-[#5D4E4E]'}`}>
          {language === 'vi' ? 'Kho Vũ Khí Trade 🎮' : 'Trader\'s Arsenal 🎮'}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed">
          {language === 'vi' 
            ? 'Tất cả kỹ năng được rèn giũa qua hàng trăm deal thực tế, học từ cộng đồng và tự trang bị bằng kinh nghiệm xương máu!' 
            : 'Every skill sharpened through hundreds of real trades, community lessons, and hard-earned experience!'}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILLS_DATA.map((skill, index) => {
          // Dynamic Lucide resolver
          const IconComponent = (LucideIcons as any)[skill.iconName] || LucideIcons.Sparkles;

          return (
            <CuteCard 
              key={index} 
              theme={theme} 
              accentColor={
                index % 3 === 0 
                  ? "from-pink-200 to-rose-300" 
                  : index % 3 === 1 
                    ? "from-sky-200 to-indigo-300" 
                    : "from-amber-200 to-yellow-300"
              }
              padding="p-4.5"
            >
              <div className="flex items-center gap-4">
                {/* Cute Icon Bubble */}
                <div className={`p-3 rounded-2xl ${isPastel ? 'bg-[#fff5f5]' : 'bg-amber-100 border-2 border-[#5D4E4E]'} text-[#5D4E4E]`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Skill Stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="font-bold text-sm text-zinc-800 truncate">
                      {language === 'vi' ? skill.nameVi : skill.name}
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                      {skill.level}% {language === 'vi' ? 'Độ ngon' : 'Delicious'}
                    </span>
                  </div>

                  {/* Level bubble indicator */}
                  <div className="relative w-full bg-zinc-100 h-3.5 rounded-full overflow-hidden border border-zinc-200">
                    {/* Bubbly background trail inside progress */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                      style={{ willChange: "width" }}
                      className={`h-full rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-[#ff85a1] relative`}
                    >
                      {/* Bubble effects */}
                      <span className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:12px_12px] opacity-20" />
                    </motion.div>
                  </div>

                  {/* Cute subtitle badge */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-[10px] text-zinc-400 font-mono italic">
                      {language === 'vi' ? skill.cuteLabelVi : skill.cuteLabel}
                    </span>
                  </div>
                </div>
              </div>
            </CuteCard>
          );
        })}
      </div>

      {/* Cake-box design graphic (Decorative elements) */}
      <div className="bg-amber-50/50 rounded-2xl p-4 border border-dashed border-amber-200 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-amber-900 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎮</span>
          <div>
            <strong className="block">{language === 'vi' ? 'Cam kết của Trang Dep' : 'Trang Dep\'s Commitment'}</strong>
            <span className="text-amber-700/80">{language === 'vi' ? 'Giao dịch sạch, minh bạch, tỷ lệ chống scam 100%!' : 'Clean trades, full transparency, 100% anti-scam track record!'}</span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-amber-800 bg-amber-100/60 px-2 py-1 rounded">
          {language === 'vi' ? '🔥 Hoạt động 24/7' : '🔥 Active 24/7'}
        </div>
      </div>
    </div>
  );
}

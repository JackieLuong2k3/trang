/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AppTheme } from '../types';
import CuteCard from './CuteCard';
import { Sparkles, Trophy, Flame, Heart, Smile } from 'lucide-react';
import { audio } from '../utils/audio';

interface TabAboutProps {
  theme: AppTheme;
  language: 'vi' | 'en';
}

const AVATARS = [
  { id: 'cat', emoji: '🐱', bg: 'bg-[#ffd6ff]', label: 'Kitty Mochi' },
  { id: 'bunny', emoji: '🐰', bg: 'bg-[#ffc6ff]', label: 'Bunny Fluff' },
  { id: 'bear', emoji: '🐻', bg: 'bg-[#ffbeb2]', label: 'Teddy Hug' },
  { id: 'panda', emoji: '🐼', bg: 'bg-[#caffbf]', label: 'Panda Roll' },
];

export default function TabAbout({ theme, language }: TabAboutProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [clicks, setClicks] = useState(0);

  const handleAvatarClick = () => {
    audio.playPop();
    setSelectedAvatar((prev) => (prev + 1) % AVATARS.length);
    setClicks((prev) => prev + 1);
  };

  const isPastel = theme === 'pastel';

  const introTextEn = "Hello, I am a passionate developer who loves crafting whimsical interfaces! I believe coding isn't just about logic—it's about baking warmth, delight, and a little magic into every scroll and click. On sunny days, I craft beautiful web applications; on rainy days, I cuddle cats and drink sweet caramel boba.";
  const introTextVi = "Chào cậu nha, tớ là một kỹ sư lập trình đam mê tạo ra các giao diện mộng mơ và tràn ngập niềm vui! Tớ tin rằng lập trình không chỉ là logic khô khan—đó là hành trình nhào nặn sự ấm áp, thú vị và phép thuật vào từng lượt cuộn trang hay bấm nút. Ngày nắng đẹp tớ code web xinh, ngày mưa tớ ôm mèo và uống trà sữa chân trâu hoàng kim.";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="tab-about-container">
      {/* Profile Left Card */}
      <CuteCard theme={theme} accentColor="from-pink-300 to-rose-400">
        <div className="flex flex-col items-center text-center">
          {/* Avatar frame */}
          <div className="relative group cursor-pointer mb-4" onClick={handleAvatarClick}>
            <div className="absolute inset-0 rounded-full bg-pink-200 blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-28 h-28 rounded-full ${AVATARS[selectedAvatar].bg} flex items-center justify-center text-5xl border-3 border-zinc-800 shadow-md`}
            >
              {AVATARS[selectedAvatar].emoji}
            </motion.div>
            
            {/* Click to change tooltip */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
              {language === 'vi' ? 'Bấm đổi Pet! ✨' : 'Click to change! ✨'}
            </div>
          </div>

          <motion.h2 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-2xl font-bold mb-1 ${isPastel ? 'text-pink-600' : 'text-black'}`}
          >
            {language === 'vi' ? 'Mochi Dev' : 'Mochi Dev'}
          </motion.h2>
          
          <p className="text-xs font-mono text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
            {AVATARS[selectedAvatar].label} {language === 'vi' ? 'Hậu kỳ' : 'Protagonist'}
          </p>

          <p className="text-sm text-zinc-600 leading-relaxed max-w-sm mb-4">
            {language === 'vi' ? introTextVi : introTextEn}
          </p>

          {/* Interactive Easter Egg */}
          <div className="w-full bg-orange-50/50 rounded-xl p-3 border border-orange-100 text-xs text-orange-800 flex justify-between items-center">
            <span>😸 {language === 'vi' ? 'Đã cho pet ăn:' : 'Fed pet candies:'} <strong>{clicks} 🍬</strong></span>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleAvatarClick}
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-2 py-1 rounded-md text-[10px] cursor-pointer"
            >
              {language === 'vi' ? 'Nựng 🌸' : 'Pet me 🌸'}
            </motion.button>
          </div>
        </div>
      </CuteCard>

      {/* Stats Right Card */}
      <div className="flex flex-col gap-6">
        <CuteCard theme={theme} accentColor="from-indigo-300 to-sky-400" padding="p-5">
          <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isPastel ? 'text-indigo-600' : 'text-black'}`}>
            <Trophy className="text-amber-500 w-5 h-5" />
            {language === 'vi' ? 'Chỉ số Sức Mạnh' : 'Cute Power Stats'}
          </h3>

          <div className="space-y-4">
            {/* Boba level */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1">🧋 {language === 'vi' ? 'Hàm lượng trà sữa (Boba factor)' : 'Boba Saturation'}</span>
                <span>120% (Overload)</span>
              </div>
              <div className="w-full bg-zinc-100 h-3 rounded-full overflow-hidden border border-zinc-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* Cat petting capability */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1">🐈 {language === 'vi' ? 'Trình độ dụ mèo hoang' : 'Stray Cat Magnetism'}</span>
                <span>99% (Master)</span>
              </div>
              <div className="w-full bg-zinc-100 h-3 rounded-full overflow-hidden border border-zinc-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '99%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
                />
              </div>
            </div>

            {/* Bugs fixed inside pixel */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1">👾 {language === 'vi' ? 'Khả năng diệt côn trùng (bug)' : 'Bugs Exterminated'}</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-zinc-100 h-3 rounded-full overflow-hidden border border-zinc-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </CuteCard>

        {/* Fun Facts Box */}
        <CuteCard theme={theme} accentColor="from-yellow-200 to-orange-300" padding="p-5">
          <h3 className={`text-lg font-bold mb-2.5 flex items-center gap-2 ${isPastel ? 'text-amber-700' : 'text-black'}`}>
            <Smile className="text-amber-500 w-5 h-5 animate-bounce" />
            {language === 'vi' ? 'Có thể cậu chưa biết?' : 'Fun Soft Facts'}
          </h3>
          <ul className="text-xs text-zinc-600 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">💖</span>
              <span>{language === 'vi' ? 'Thích các góc bo tròn 2xl/3xl hơn mọi góc nhọn trên đời.' : 'Believes the world is a better place when widgets are styled with rounded-3xl.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">🐾</span>
              <span>{language === 'vi' ? 'Code của tớ hoạt động nhờ chú mèo béo nằm đè lên chân sưởi ấm.' : 'All code is certified bug-free by a resident fat ginger kitten sleeping on the warm server.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">⭐️</span>
              <span>{language === 'vi' ? 'Luôn thêm âm thanh "pop bubble" nhỏ mỗi khi làm bất kỳ nút bấm nào.' : 'Obsessed with designing cute custom audio feedback pop/bubbles for web layouts.'}</span>
            </li>
          </ul>
        </CuteCard>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppTheme, GuestbookEntry } from '../types';
import CuteCard from './CuteCard';
import CuteButton from './CuteButton';
import { audio } from '../utils/audio';
import { Send, Heart, MessageCircle, Sparkles } from 'lucide-react';

interface TabContactProps {
  theme: AppTheme;
  language: 'vi' | 'en';
}

const AVATAR_OPTIONS = [
  { id: 'cat', emoji: '🐱', bg: 'bg-[#ffd6ff]', labelVi: 'Mèo Mochi', labelEn: 'Mochi Cat' },
  { id: 'rabbit', emoji: '🐰', bg: 'bg-[#ffc6ff]', labelVi: 'Thỏ Bông', labelEn: 'Fluffy Bunny' },
  { id: 'hamster', emoji: '🐹', bg: 'bg-[#ffbeb2]', labelVi: 'Chuột Ú', labelEn: 'Chubby Hamster' },
  { id: 'bear', emoji: '🐻', bg: 'bg-[#caffbf]', labelVi: 'Gấu Nâu', labelEn: 'Brown Bear' },
];

const VIBE_EMOJIS = ['🌸', '✨', '⭐️', '🍵', '🍪', '🐱', '💖'];

const DEFAULT_ENTRIES: GuestbookEntry[] = [
  {
    id: 'd1',
    name: 'Bao Bao 🐼',
    message: 'Trang web thương yêu dễ thương quá trời đất luôn á! Đang lướt mà âm thanh bong bóng kêu chúp chúp nghe ghiền ghê.',
    createdAt: '2026-06-10T12:00:00Z',
    avatarId: 'panda',
    vibeEmoji: '🌸',
    likes: 12,
  },
  {
    id: 'd2',
    name: 'Alice Rabbit 🐰',
    message: 'Oh my gosh! This is the coziest diary-style portfolio I have ever seen! The bouncy physics are super gelatinous and cute!',
    createdAt: '2026-06-11T04:20:00Z',
    avatarId: 'rabbit',
    vibeEmoji: '✨',
    likes: 8,
  },
];

export default function TabContact({ theme, language }: TabContactProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('cat');
  const [selectedVibe, setSelectedVibe] = useState('🌸');

  const isPastel = theme === 'pastel';

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mochi_guestbook');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(DEFAULT_ENTRIES);
      }
    } else {
      setEntries(DEFAULT_ENTRIES);
      localStorage.setItem('mochi_guestbook', JSON.stringify(DEFAULT_ENTRIES));
    }
  }, []);

  // Save entries reference
  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('mochi_guestbook', JSON.stringify(newEntries));
  };

  const handleLike = (id: string) => {
    audio.playPop(); // Pluck melody
    const updated = entries.map((e) => {
      if (e.id === id) {
        return { ...e, likes: e.likes + 1 };
      }
      return e;
    });
    saveEntries(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Create entry
    const newEntry: GuestbookEntry = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      avatarId: selectedAvatar,
      vibeEmoji: selectedVibe,
      likes: 0,
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    // Clear inputs
    setName('');
    setMessage('');

    // Trigger Success feedback
    audio.playSuccessChime();

    // Call global Canvas Confetti
    const confettiCanvas = (window as any).__confettiCanvas;
    if (confettiCanvas) {
      confettiCanvas.burst();
    }

    // Gentle Vibrate
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([40, 20, 40]);
      } catch (err) {}
    }
  };

  const getEmojiForId = (id: string) => {
    if (id === 'panda') return '🐼';
    const opt = AVATAR_OPTIONS.find((o) => o.id === id);
    return opt ? opt.emoji : '🐹';
  };

  const getBgForId = (id: string) => {
    if (id === 'panda') return 'bg-[#fff]';
    const opt = AVATAR_OPTIONS.find((o) => o.id === id);
    return opt ? opt.bg : 'bg-rose-100';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="tab-contact-container">
      {/* Form Left - 2 Cols */}
      <div className="lg:col-span-2">
        <CuteCard theme={theme} accentColor="from-rose-300 to-pink-400" padding="p-5">
          <h3 className={`text-base font-bold mb-3 flex items-center gap-1.5 ${isPastel ? 'text-pink-600' : 'text-[#5D4E4E]'}`}>
            <MessageCircle className="w-5 h-5" />
            {language === 'vi' ? 'Gửi Lời Nhắn Ngọt Ngào' : 'Send a Sweet Message'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1">
                {language === 'vi' ? 'Biệt danh của bạn / Your Name' : 'Your Nickname / Alias'} *
              </label>
              <input
                type="text"
                required
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'vi' ? 'Ví dụ: Bé Thỏ Tinh Nghịch...' : 'Example: Bubble Tea lover...'}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none bg-zinc-50/50 focus:bg-white transition-all ${
                  isPastel
                    ? 'border-rose-100 focus:border-rose-300 focus:ring-1 focus:ring-rose-200'
                    : 'border-[#5D4E4E] focus:border-[#5D4E4E] focus:ring-1 focus:ring-zinc-400 border-2 shadow-[2px_2px_0px_0px_#5D4E4E]'
                }`}
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                {language === 'vi' ? 'Chọn hình đại diện / Pick Profile' : 'Select Avatar Profile'}
              </label>
              <div className="flex gap-2 justify-between">
                {AVATAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      audio.playPop();
                      setSelectedAvatar(opt.id);
                    }}
                    className={`w-10 h-10 rounded-xl ${opt.bg} relative flex items-center justify-center text-xl border transition-all cursor-pointer ${
                      selectedAvatar === opt.id
                        ? isPastel
                          ? 'border-[#ff85a1] ring-2 ring-rose-200 scale-105 shadow-sm'
                          : 'border-[#5D4E4E] border-3 scale-105 shadow-[2px_2px_0px_0px_#5D4E4E]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={language === 'vi' ? opt.labelVi : opt.labelEn}
                  >
                    <span>{opt.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Emoji Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                {language === 'vi' ? 'Vibe tâm trạng hôm nay / Choose Vibe' : 'Vibe mood today'}
              </label>
              <div className="flex flex-wrap gap-1.5 justify-between bg-zinc-50 rounded-xl p-2 border border-zinc-200">
                {VIBE_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      audio.playPop();
                      setSelectedVibe(emoji);
                    }}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all ${
                      selectedVibe === emoji
                        ? 'bg-white shadow text-base scale-110'
                        : 'hover:bg-zinc-100 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Message Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1">
                {language === 'vi' ? 'Lời chúc ngọt ngào / Guest Message' : 'Sweet Greetings / Note'} *
              </label>
              <textarea
                required
                maxLength={100}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={language === 'vi' ? 'Để lại lời chúc dồi dào hạnh phúc và boba nha...' : 'Write something positive or friendly here...'}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none bg-zinc-50/50 focus:bg-white transition-all resize-none ${
                  isPastel
                    ? 'border-rose-100 focus:border-rose-300 focus:ring-1 focus:ring-rose-200'
                    : 'border-[#5D4E4E] focus:border-[#5D4E4E] focus:ring-1 focus:ring-zinc-400 border-2 shadow-[2px_2px_0px_0px_#5D4E4E]'
                }`}
              />
            </div>

            {/* Submit Button */}
            <CuteButton
              theme={theme}
              variant="primary"
              soundType="success"
              className="w-full justify-center flex py-2 text-xs py-2.5 cursor-pointer font-bold"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              {language === 'vi' ? 'Gửi Lời Chúc Mochi 🌸' : 'Send Mochi Greeting 🌸'}
            </CuteButton>
          </form>
        </CuteCard>
      </div>

      {/* Greetings Feed Right - 3 Cols */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        <CuteCard theme={theme} accentColor="from-sky-300 to-indigo-400" padding="p-5" className="flex-1 flex flex-col">
          <h3 className={`text-base font-bold mb-3.5 flex items-center gap-1.5 ${isPastel ? 'text-indigo-600' : 'text-[#5D4E4E]'}`}>
            <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
            {language === 'vi' ? 'Bức Tường Lưu Bút mộng mơ' : 'Dreamy Wall of Greetings'} 
            <span className="text-[11px] font-normal font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full ml-auto">
              {entries.length} {language === 'vi' ? 'lời chúc' : 'greetings'}
            </span>
          </h3>

          {/* Feed list scroll viewport */}
          <div className="space-y-3.5 max-h-[352px] overflow-y-auto pr-1 flex-1">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  className={`p-3.5 rounded-2xl flex gap-3 items-start ${
                    isPastel 
                      ? 'bg-rose-50/40 hover:bg-rose-50/60 border border-rose-100/30' 
                      : 'bg-zinc-50 border-2 border-[#5D4E4E] shadow-[3px_3px_0px_0px_#5D4E4E]'
                  }`}
                >
                  {/* Sender Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0 ${getBgForId(entry.avatarId)} border border-zinc-200 shadow-sm`}>
                    {getEmojiForId(entry.avatarId)}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs text-zinc-800 truncate">{entry.name}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {entry.vibeEmoji} {new Date(entry.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { hour: 'numeric', minute: 'numeric' })}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed word-break whitespace-pre-wrap">
                      {entry.message}
                    </p>

                    {/* Likes panel */}
                    <div className="mt-2 flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(entry.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors ${
                          isPastel 
                            ? 'text-rose-500 bg-rose-50 hover:bg-rose-100' 
                            : 'text-[#5D4E4E] bg-[#FFDAC1] border border-[#5D4E4E] hover:bg-[#fcc8a3]'
                        }`}
                      >
                        <Heart className="w-3 h-3 fill-current text-rose-500 shrink-0" />
                        <span>{entry.likes}</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CuteCard>
      </div>
    </div>
  );
}

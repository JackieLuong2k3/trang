/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppTheme } from './types';
import { audio } from './utils/audio';

// UI components
import CuteCard from './components/CuteCard';
import CuteButton from './components/CuteButton';
import BouncyWrapper from './components/BouncyWrapper';
import { ConfettiCanvas, ConfettiCanvasHandle } from './components/ConfettiCanvas';

// Tabs
import TabAbout from './components/TabAbout';
import TabSkills from './components/TabSkills';
import TabProjects from './components/TabProjects';
import TabContact from './components/TabContact';

// Icons
import {
  Palette,
  Sparkles,
  Music,
  VolumeX,
  Volume2,
  Heart,
  User,
  Activity,
  Layers,
  MessageSquareHeart,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

const PET_QUOTES = {
  vi: [
    "Chào bạn! Mình là Trang — chuyên mua bán acc Roblox uy tín nè! 🎮",
    "Cần acc Roblox ngon bổ rẻ? DM mình nha, deal cực mềm! 💸",
    "Mình trade Roblox hơn 2 năm rồi, chưa để xảy ra scam lần nào đâu nha! 🛡️",
    "Acc OG, item limited, acc giá trị cao — mình có hết! ✨",
    "Không biết acc trị giá bao nhiêu? Hỏi mình định giá miễn phí nha! 💎",
    "Trade an toàn, deal minh bạch — đó là tiêu chí số 1 của Trang! 🤝",
  ],
  en: [
    "Hey! I'm Trang — your trusted Roblox account trader! 🎮",
    "Looking for a great Roblox deal? Slide into my DMs! 💸",
    "2+ years trading Roblox, zero scams. Safety first! 🛡️",
    "OG accounts, limited items, high-value accounts — I got you! ✨",
    "Not sure how much your account is worth? Ask me for a free appraisal! 💎",
    "Fair trades, transparent deals — that's how Trang rolls! 🤝",
  ]
};

export default function App() {
  const [theme, setTheme] = useState<AppTheme>('pastel');
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'contact'>('about');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Audio sequencers state helpers
  const [activeNoteIdx, setActiveNoteIdx] = useState<number>(-1);
  const [petQuoteIdx, setPetQuoteIdx] = useState(0);
  const [isPetJumping, setIsPetJumping] = useState(false);

  // Confetti reference binding
  const confettiRef = useRef<ConfettiCanvasHandle | null>(null);

  useEffect(() => {
    // Expose confetti to outer window globally for easy access from other sub tabs
    (window as any).__confettiCanvas = confettiRef.current;
  }, []);

  const toggleTheme = () => {
    audio.playPop();
    setTheme((prev) => (prev === 'pastel' ? 'brutalist' : 'pastel'));
    // Trigger tiny burst of confetti to celebrate skin switcher
    if (confettiRef.current) {
      confettiRef.current.burst();
    }
  };

  const toggleLanguage = () => {
    audio.playChirp();
    setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const handleMuteToggle = () => {
    const nextMuted = audio.toggleMute();
    setIsMuted(nextMuted);
    if (nextMuted && isPlayingMusic) {
      audio.stopCuteTune();
      setIsPlayingMusic(false);
    }
  };

  const handleTuneToggle = () => {
    if (isPlayingMusic) {
      audio.stopCuteTune();
      setIsPlayingMusic(false);
      setActiveNoteIdx(-1);
    } else {
      if (isMuted) {
        // Unmute first
        audio.toggleMute();
        setIsMuted(false);
      }
      setIsPlayingMusic(true);
      audio.startCuteTune((noteIdx) => {
        setActiveNoteIdx(noteIdx);
      });
    }
  };

  const handlePetAction = () => {
    audio.playMeow();
    setIsPetJumping(true);
    setPetQuoteIdx((prev) => (prev + 1) % PET_QUOTES[language].length);
    setTimeout(() => setIsPetJumping(false), 500);
    if (confettiRef.current) {
      // Small sparkle rain
      confettiRef.current.burst(window.innerWidth - 80, window.innerHeight - 150);
    }
  };

  const isPastel = theme === 'pastel';

  // Floating background elements matching Artistic Flair
  const renderFloatingShapes = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Large blooming pastel blobs from Artistic Flair */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FFD1DC] rounded-full opacity-35 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#D4F1F4] rounded-full opacity-45 blur-3xl" />

        {isPastel && (
          <>
            <div className="absolute top-10 left-12 text-3xl cute-float-slow text-rose-200">🌸</div>
            <div className="absolute top-1/4 right-20 text-4xl cute-float-fast text-sky-200">⭐</div>
            <div className="absolute bottom-1/4 left-16 text-3xl cute-float-slow text-emerald-200">🍵</div>
            <div className="absolute bottom-20 right-1/4 text-4xl cute-float-fast text-pink-200">🍪</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${isPastel
      ? 'bg-[#FFF9F2] text-[#5D4E4E]'
      : 'bg-[#FFF9F2] text-[#5D4E4E] border-6 border-[#5D4E4E] m-0'
      }`}>
      {/* Decorative top border if Brutalist */}
      {!isPastel && (
        <div className="h-4 bg-[#5D4E4E] w-full fixed top-0 left-0 right-0 z-40" />
      )}

      {/* Floating Canvas Confetti */}
      <ConfettiCanvas ref={confettiRef} />

      {/* Floating shapes */}
      {renderFloatingShapes()}

      {/* Outer Shell bounds */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 select-none">

        {/* TOP STATUS ROW / HERO BANNER */}
        <BouncyWrapper delay={0.05} id="header-bubble">
          <div className={`p-4 md:p-6 rounded-3xl ${isPastel
            ? 'bg-white/90 shadow-[0_8px_30px_rgba(255,182,193,0.3)] border border-[#FFD1DC]/50'
            : 'bg-[#FF9AA2] border-3 border-[#5D4E4E] shadow-[4px_4px_0px_0px_#5D4E4E] text-[#5D4E4E]'
            } flex flex-col md:flex-row justify-between items-center gap-4`}>

            {/* Title / Logo block */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl cursor-pointer ${isPastel ? 'bg-[#FF9AA2]' : 'bg-[#B5EAD7] border-2 border-[#5D4E4E] shadow-[2px_2px_0px_#5D4E4E]'
                  }`}
                onClick={() => {
                  audio.playSuccessChime();
                  if (confettiRef.current) confettiRef.current.burst();
                }}
              >
                🌸
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none text-[#5D4E4E] flex items-center gap-2">
                  {language === 'vi' ? 'Trang Dep 🍓' : 'Trang Dep 🍓'}
                </h1>
                <p className="text-xs text-[#5D4E4E]/80 font-semibold tracking-tight mt-1">
                  {language === 'vi' ? 'Mua bán & trao đổi tài khoản Roblox 🎮' : 'Roblox Account Trader & Collector 🎮'}
                </p>
              </div>
            </div>

            {/* Quick action switches panel */}
            <div className="flex items-center flex-wrap justify-center gap-2">
              {/* Theme toggler */}
              <CuteButton
                theme={theme}
                variant="accent"
                onClick={toggleTheme}
                className="py-1.5 px-3 text-xs"
              >
                <Palette className="w-4 h-4 shrink-0" />
                <span>{isPastel ? (language === 'vi' ? 'Comic Store ⚡' : 'Comic Style ⚡') : (language === 'vi' ? 'Pastel Cafe 🌸' : 'Pastel Cafe 🌸')}</span>
              </CuteButton>

              {/* Language switcher */}
              <CuteButton
                theme={theme}
                variant="secondary"
                onClick={toggleLanguage}
                className="py-1.5 px-3 text-xs"
              >
                <span>{language === 'vi' ? 'English 🇬🇧' : 'Tiếng Việt 🇻🇳'}</span>
              </CuteButton>

              {/* Sound activator */}
              <CuteButton
                theme={theme}
                variant={isMuted ? 'danger' : 'secondary'}
                onClick={handleMuteToggle}
                className="p-2 aspect-square rounded-full flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </CuteButton>
            </div>
          </div>
        </BouncyWrapper>

        {/* MIDDLE SHELF: MAIN CONTENT DIARY AND MUSIC BOX COMPANION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* DIARY TAB BOOK CORES (LEFT - 3 COLS) */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* TABS SELECTORS PANEL */}
            <BouncyWrapper delay={0.1} id="tabs-selectors">
              <div className="flex bg-white/60 p-1.5 rounded-2xl gap-1.5 justify-between overflow-x-auto border border-[#5D4E4E]/20 scrollbar-thin">
                {/* About Tab */}
                <button
                  onClick={() => { audio.playPop(); setActiveTab('about'); }}
                  className={`flex-1 min-w-[70px] flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs font-extrabold cursor-pointer transition-all outline-none rounded-xl border ${activeTab === 'about'
                    ? isPastel
                      ? 'bg-[#FF9AA2]/20 border-[#FF9AA2]/40 text-[#FF9AA2] shadow-sm'
                      : 'bg-[#B5EAD7] border-[#5D4E4E] border-2 shadow-[2px_2px_0px_#5D4E4E] text-[#5D4E4E] font-extrabold translate-y-[1px]'
                    : 'text-[#5D4E4E]/60 hover:text-[#5D4E4E] border-transparent'
                    }`}
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'vi' ? 'Tớ Là Ai' : 'Profile'}</span>
                </button>

                {/* Skills Tab */}
                <button
                  onClick={() => { audio.playPop(); setActiveTab('skills'); }}
                  className={`flex-1 min-w-[70px] flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs font-extrabold cursor-pointer transition-all outline-none rounded-xl border ${activeTab === 'skills'
                    ? isPastel
                      ? 'bg-[#B5EAD7]/20 border-[#B5EAD7]/40 text-[#3d5e52] shadow-sm'
                      : 'bg-[#C7CEEA] border-[#5D4E4E] border-2 shadow-[2px_2px_0px_#5D4E4E] text-[#5D4E4E] font-extrabold translate-y-[1px]'
                    : 'text-[#5D4E4E]/60 hover:text-[#5D4E4E] border-transparent'
                    }`}
                >
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'vi' ? 'Kỹ Năng' : 'Skills'}</span>
                </button>

                {/* Projects Tab */}
                <button
                  onClick={() => { audio.playPop(); setActiveTab('projects'); }}
                  className={`flex-1 min-w-[70px] flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs font-extrabold cursor-pointer transition-all outline-none rounded-xl border ${activeTab === 'projects'
                    ? isPastel
                      ? 'bg-[#FFDAC1]/20 border-[#FFDAC1]/40 text-[#7c502f] shadow-sm'
                      : 'bg-[#FFDAC1] border-[#5D4E4E] border-2 shadow-[2px_2px_0px_#5D4E4E] text-[#5D4E4E] font-extrabold translate-y-[1px]'
                    : 'text-[#5D4E4E]/60 hover:text-[#5D4E4E] border-transparent'
                    }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'vi' ? 'Dự Án' : 'Projects'}</span>
                </button>

                {/* Guestbook/Contact Tab */}
                <button
                  onClick={() => { audio.playPop(); setActiveTab('contact'); }}
                  className={`flex-1 min-w-[70px] flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs font-extrabold cursor-pointer transition-all outline-none rounded-xl border ${activeTab === 'contact'
                    ? isPastel
                      ? 'bg-[#FF9AA2]/20 border-[#FF9AA2]/40 text-rose-500 shadow-sm'
                      : 'bg-[#FF9AA2] border-[#5D4E4E] border-2 shadow-[2px_2px_0px_#5D4E4E] text-white font-extrabold translate-y-[1px]'
                    : 'text-[#5D4E4E]/60 hover:text-[#5D4E4E] border-transparent'
                    }`}
                >
                  <MessageSquareHeart className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'vi' ? 'Lưu Bút' : 'Guestbook'}</span>
                </button>
              </div>
            </BouncyWrapper>

            {/* TAB VIEWPORT CONTAINER */}
            <BouncyWrapper delay={0.15} id="tab-viewport">
              <div className="relative min-h-[380px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeTab === 'about' && (
                      <TabAbout theme={theme} language={language} />
                    )}
                    {activeTab === 'skills' && (
                      <TabSkills theme={theme} language={language} />
                    )}
                    {activeTab === 'projects' && (
                      <TabProjects theme={theme} language={language} />
                    )}
                    {activeTab === 'contact' && (
                      <TabContact theme={theme} language={language} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </BouncyWrapper>

          </div>

          {/* RIGHT PANELS: MINI TUNE STATION & FLUFFY PET CORNER (RIGHT - 1 COL) */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-6" id="sidebar-widgets">

            {/* RETRO MUSIC CASSETTE WIDGET */}
            <BouncyWrapper delay={0.2} id="widget-box-tape">
              <CuteCard theme={theme} accentColor="from-amber-200 to-amber-300" padding="p-4.5">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="flex items-center gap-1 text-amber-700">
                      <Music className="w-3.5 h-3.5 animate-bounce" />
                      {language === 'vi' ? 'Hộp Nhạc Boba' : 'Chiptune Music'}
                    </span>
                    <span className="font-mono text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full uppercase leading-none">
                      {isPlayingMusic ? (language === 'vi' ? 'Đang phát' : 'Playing') : (language === 'vi' ? 'Tắt' : 'Stopped')}
                    </span>
                  </div>

                  {/* Retro Cassette graphic */}
                  <div className={`aspect-[1.6] rounded-xl border-2 relative flex items-center justify-center overflow-hidden ${isPastel
                    ? 'border-[#FFD1DC] bg-[#FFD1DC]/40 shadow-sm'
                    : 'border-3 border-[#5D4E4E] bg-[#FF9AA2] shadow-[3px_3px_0px_0px_#5D4E4E]'
                    }`}>
                    {/* Cassette label frame */}
                    <div className="absolute inset-x-3 inset-y-4 bg-white/95 rounded-lg border border-[#5D4E4E]/20 flex flex-col justify-between p-1.5">
                      {/* Name tag */}
                      <div className="flex justify-between items-center text-[8px] font-mono font-bold text-zinc-500 border-b border-rose-100 pb-0.5">
                        <span>Side A</span>
                        <span className="truncate max-w-[55px]">Melody Box</span>
                        <span>v1.0</span>
                      </div>

                      {/* Reels panel */}
                      <div className="flex justify-around items-center py-2 relative">
                        {/* Left Reel inside */}
                        <div className="w-10 h-10 bg-[#5D4E4E] rounded-full border-2 border-[#5D4E4E]/85 flex items-center justify-center relative">
                          <motion.div
                            animate={isPlayingMusic ? { rotate: 360 } : {}}
                            transition={isPlayingMusic ? { repeat: Infinity, ease: "linear", duration: 4 } : {}}
                            className="w-8 h-8 border border-dashed border-white/40 rounded-full flex items-center justify-center"
                          >
                            <span className="w-2 h-2 rounded-full bg-zinc-300" />
                          </motion.div>
                        </div>

                        {/* Right Reel inside */}
                        <div className="w-10 h-10 bg-[#5D4E4E] rounded-full border-2 border-[#5D4E4E]/85 flex items-center justify-center relative">
                          <motion.div
                            animate={isPlayingMusic ? { rotate: 360 } : {}}
                            transition={isPlayingMusic ? { repeat: Infinity, ease: "linear", duration: 4 } : {}}
                            className="w-8 h-8 border border-dashed border-white/40 rounded-full flex items-center justify-center"
                          >
                            <span className="w-2 h-2 rounded-full bg-zinc-300" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Simple note feedback bar */}
                      <div className="flex justify-center gap-1 select-none">
                        {Array.from({ length: 8 }).map((_, idx) => (
                          <div
                            key={idx}
                            style={{ height: isPlayingMusic ? `${(idx === activeNoteIdx ? 12 : 3 + Math.random() * 8)}px` : '3px' }}
                            className={`w-1 rounded-full transition-all duration-150 ${idx === activeNoteIdx ? 'bg-rose-400' : 'bg-rose-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tape controls */}
                  <div className="flex gap-2">
                    <CuteButton
                      theme={theme}
                      variant={isPlayingMusic ? 'danger' : 'primary'}
                      soundType="chirp"
                      onClick={handleTuneToggle}
                      className="flex-1 py-1.5 px-3 text-xs rounded-xl font-bold"
                    >
                      {isPlayingMusic ? (language === 'vi' ? 'Dừng ⏹️' : 'Stop ⏹️') : (language === 'vi' ? 'Nghe Nhạc 🎶' : 'Play Tune 🎶')}
                    </CuteButton>
                  </div>
                </div>
              </CuteCard>
            </BouncyWrapper>

            {/* DYNAMIC PET COMPANION */}
            <BouncyWrapper delay={0.25} id="widget-pet">
              <CuteCard theme={theme} accentColor="from-pink-300 to-pink-400" padding="p-4" className="overflow-visible mt-2">
                <div className="flex flex-col gap-2 relative">

                  {/* Thought Bubble */}
                  <div className="bg-zinc-50 border border-zinc-200/50 p-2.5 rounded-2xl relative text-xs text-zinc-600 leading-normal shadow-sm">
                    {/* Tiny bubble pin arrow */}
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-50 border-r border-b border-zinc-200/55 rotate-45" />
                    <p className="font-semibold text-[11px]">
                      {PET_QUOTES[language][petQuoteIdx]}
                    </p>
                  </div>

                  {/* Character sitting on rug */}
                  <div className="flex items-end justify-between pt-1">
                    <span className="text-[10px] text-zinc-400 block font-mono italic">
                      🐾 {language === 'vi' ? 'Bản Năng: Giận Dữ' : 'Mood: Floofy Joy'}
                    </span>

                    <motion.div
                      animate={isPetJumping ? { y: [0, -32, 0], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      onClick={handlePetAction}
                      className="cursor-pointer select-none text-4xl mr-2 relative group"
                    >
                      {/* Interaction glow ring */}
                      <span className="absolute inset-0 rounded-full bg-pink-100 opacity-0 group-hover:opacity-60 scale-120 blur-sm transition-opacity" />
                      🐱
                    </motion.div>
                  </div>

                  {/* Rug floor under kitty */}
                  <div className={`h-2.5 rounded-full border shadow-sm ${isPastel
                    ? 'bg-gradient-to-r from-red-100 via-rose-200 to-amber-100 border-[#FFD1DC]/40'
                    : 'bg-gradient-to-r from-[#FFD1DC] via-[#FF9AA2] to-[#B5EAD7] border-2 border-[#5D4E4E]'
                    }`} />
                </div>
              </CuteCard>
            </BouncyWrapper>

          </div>

        </div>

        {/* BOTTOM COMPACT FOOTER MARGINS */}
        <BouncyWrapper delay={0.3} id="footer-bubble">
          <footer className="text-center py-6 text-xs text-zinc-400 font-mono space-y-1">
            <p>Made with 💖 by Trang Dep • {new Date().getFullYear()}</p>
            <p className="text-[10px] text-zinc-400/80">
              {language === 'vi'
                ? 'Nhạc Chiptune, Confetti Bong Bóng & Hiệu Ứng Bouncy mô phỏng trực tiếp sạch đẹp.'
                : 'Procedural Audio Sync, Custom Physics Particle Confetti, and Bouncy spring motion.'}
            </p>
          </footer>
        </BouncyWrapper>

      </div>
    </div>
  );
}

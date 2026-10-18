import React from 'react';
import { TabKey } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ArrowRight, GraduationCap, PlayCircle, Bot, Sparkles } from 'lucide-react';
import { BlackHoleHero } from './BlackHoleHero';
import { BlackHoleLogoCrest } from './BlackHoleLogoCrest';

interface HeroSectionProps {
  onSelectTab: (tab: TabKey) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  return (
    <BlackHoleHero className="border-b-2 dark:border-amber-500/60 border-amber-600/50 shadow-2xl transition-colors duration-200">
      <header className="relative isolate flex flex-col items-center justify-start min-h-[520px] sm:min-h-[640px] pt-4 sm:pt-6 pb-12 sm:pb-16 px-4">
        {/* Persistent Theme Toggle in Header */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
          <ThemeSwitcher variant="hero" />
        </div>

        {/* Realistic Interstellar-style Black Hole Surrounding the SWID-SHRK Logo Crest */}
        <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-8 pointer-events-auto">
          <BlackHoleLogoCrest className="w-full max-w-[480px] sm:max-w-[540px]" />
        </div>

        {/* Main Titles */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-2 w-full">
          <h1 className="font-allura hero-title-cursive text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-wide mb-3 select-none break-words px-2 max-w-full drop-shadow-[0_0_24px_rgba(255,185,60,0.65)]">
            Something Weird is Discovering…!
          </h1>
          <p className="text-zinc-200 font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase mb-4 px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Mechanical &amp; Aerospace Engineering Research Group
          </p>

          {/* MIGA Badge */}
          <div className="inline-flex items-baseline px-4 py-1.5 border border-white/20 rounded-full font-orbitron font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 sm:mb-8 bg-black/60 shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <span className="text-[#ff3131] drop-shadow-[0_0_6px_rgba(255,49,49,0.9)]">M</span>
            <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">IG</span>
            <span className="text-[#00ff41] drop-shadow-[0_0_6px_rgba(0,255,65,0.9)]">A</span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl">
            <button
              onClick={() => onSelectTab('chat')}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded bg-gradient-to-r from-[#00ff41] to-[#00b8ff] hover:from-[#00ff41]/90 hover:to-[#00b8ff]/90 text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-cyan-500/40 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              AI Lab Assistant
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => onSelectTab('research')}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded bg-zinc-900/90 border border-zinc-700 hover:border-[#00ff41] text-zinc-100 hover:text-[#00ff41] font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-md backdrop-blur-sm cursor-pointer"
            >
              Research Modules
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => onSelectTab('students')}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded border border-[#00b8ff] text-[#00b8ff] hover:bg-[#00b8ff] hover:text-[#050505] font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-[0_0_18px_rgba(0,184,255,0.6)] cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Thesis Registry
            </button>

            <button
              onClick={() => onSelectTab('abaqus')}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded bg-zinc-900/90 border border-zinc-700 hover:border-[#00ff41] text-zinc-100 hover:text-[#00ff41] font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-md backdrop-blur-sm cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Abaqus Sims
            </button>
          </div>
        </div>
      </header>
    </BlackHoleHero>
  );
};

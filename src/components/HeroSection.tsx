import React, { useState } from 'react';
import { TabKey } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { AudioControl } from './AudioControl';
import { ArrowRight, GraduationCap, PlayCircle, Bot, Sparkles, Orbit, Eye } from 'lucide-react';
import { BlackHoleHero } from './BlackHoleHero';
import { BlackHoleLogoCrest } from './BlackHoleLogoCrest';

interface HeroSectionProps {
  onSelectTab: (tab: TabKey) => void;
}

type LensingMode = 'subtle' | 'enhanced' | 'off';

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const [lensingMode, setLensingMode] = useState<LensingMode>('subtle');
  const [isLensingHovered, setIsLensingHovered] = useState(false);

  const cycleLensingMode = () => {
    setLensingMode((prev) => {
      if (prev === 'subtle') return 'enhanced';
      if (prev === 'enhanced') return 'off';
      return 'subtle';
    });
  };

  // Determine active SVG filter for content blocks
  const getLensingFilter = () => {
    if (lensingMode === 'off') return 'none';
    if (lensingMode === 'enhanced' || isLensingHovered) {
      return 'url(#gravitational-lensing-enhanced)';
    }
    return 'url(#gravitational-lensing-subtle)';
  };

  return (
    <BlackHoleHero className="border-b-2 dark:border-amber-500/60 border-amber-600/50 shadow-2xl transition-colors duration-200">
      {/* 
        SVG Gravitational Lensing Distortion Filters
        Uses fractal noise turbulence + displacement mapping to authentically simulate general relativistic light bending (deflection of photons passing near Schwarzschild radius)
      */}
      <svg className="absolute w-0 h-0 pointer-events-none -z-10" aria-hidden="true">
        <defs>
          {/* Subtle Relativistic Light-Bending Filter (Natural Astrophysical Simulation) */}
          <filter
            id="gravitational-lensing-subtle"
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.022"
              numOctaves="3"
              seed="19"
              result="spacetimeWarp"
            >
              <animate
                attributeName="baseFrequency"
                dur="16s"
                values="0.012 0.022; 0.015 0.028; 0.012 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="spacetimeWarp"
              scale="5.5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="deflectedPhotons"
            />
            <feGaussianBlur in="deflectedPhotons" stdDeviation="0.3" result="softGlow" />
            <feMerge>
              <feMergeNode in="deflectedPhotons" />
              <feMergeNode in="softGlow" opacity="0.35" />
            </feMerge>
          </filter>

          {/* Enhanced Gravitational Lensing Filter (Visible Inspection Mode) */}
          <filter
            id="gravitational-lensing-enhanced"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.026"
              numOctaves="3"
              seed="31"
              result="highMassWarp"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.014 0.026; 0.02 0.035; 0.014 0.026"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="highMassWarp"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
              result="deflectedHigh"
            />
            <feGaussianBlur in="deflectedHigh" stdDeviation="0.45" result="softGlowHigh" />
            <feMerge>
              <feMergeNode in="deflectedHigh" />
              <feMergeNode in="softGlowHigh" opacity="0.45" />
            </feMerge>
          </filter>

          {/* Einstein Ring Curvature Gradient for Backdrop Lens */}
          <radialGradient id="einsteinLensGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.85)" />
            <stop offset="65%" stopColor="rgba(255,200,60,0.12)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      <header className="relative isolate flex flex-col items-center justify-start min-h-[520px] sm:min-h-[640px] pt-4 sm:pt-6 pb-12 sm:pb-16 px-4">
        {/* Persistent Audio & Theme Controls in Header */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-2.5">
          <AudioControl variant="hero" />
          <ThemeSwitcher variant="hero" />
        </div>

        {/* Realistic Interstellar-style Black Hole Surrounding the SWID-SHRK Logo Crest */}
        <div
          onMouseEnter={() => setIsLensingHovered(true)}
          onMouseLeave={() => setIsLensingHovered(false)}
          className="relative z-10 flex flex-col items-center mb-5 sm:mb-6 pointer-events-auto transition-transform duration-500"
        >
          <BlackHoleLogoCrest className="w-full max-w-[480px] sm:max-w-[540px]" />
        </div>

        {/* 
          Spacetime Gravitational Lensing Field (Curved Light Bending Halo)
          Positioned directly underneath the black hole horizon to bend incoming light rays across proximity elements
        */}
        {lensingMode !== 'off' && (
          <div
            aria-hidden="true"
            className="absolute top-[220px] xs:top-[250px] sm:top-[300px] md:top-[320px] left-1/2 -translate-x-1/2 w-[92%] max-w-3xl h-48 sm:h-56 pointer-events-none z-5 rounded-[50%] gravitational-lens-field transition-all duration-700 opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 50% 20%, rgba(255, 180, 50, 0.08) 0%, rgba(0, 184, 255, 0.03) 45%, transparent 75%)',
              border: '1px solid rgba(255, 215, 64, 0.12)',
              boxShadow:
                'inset 0 10px 30px rgba(255, 180, 50, 0.08), 0 10px 40px rgba(0, 0, 0, 0.65)',
            }}
          >
            {/* Curved Einstein Geodesic Light Ray */}
            <div
              className="absolute inset-x-8 top-0 h-[1.5px] rounded-full lensing-bending-beam opacity-60"
            />
            {/* Secondary Concentric Lensing Halo */}
            <div
              className="absolute inset-x-16 top-3 h-[1px] rounded-full bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"
            />
          </div>
        )}

        {/* 
          Content Blocks Near the Black Hole with Subtle Gravitational Lensing Distortion Applied
        */}
        <div
          onMouseEnter={() => setIsLensingHovered(true)}
          onMouseLeave={() => setIsLensingHovered(false)}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl px-2 w-full transition-all duration-500"
        >
          {/* Gravitational Lensing Mode Control Chip */}
          <div className="mb-3.5 inline-flex items-center gap-2">
            <button
              onClick={cycleLensingMode}
              className={`group/lens inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all duration-300 border cursor-pointer backdrop-blur-md ${
                lensingMode === 'off'
                  ? 'bg-zinc-900/70 border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500'
                  : lensingMode === 'enhanced'
                  ? 'bg-amber-950/70 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.45)]'
                  : 'bg-black/60 border-amber-500/40 text-amber-300/90 hover:border-amber-400 hover:text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              }`}
              title="Click to toggle Gravitational Lensing mode (Subtle / Enhanced / Off)"
              aria-label="Toggle Gravitational Lensing Distortion"
            >
              <Orbit
                className={`w-3 h-3 transition-transform duration-500 ${
                  lensingMode !== 'off' ? 'text-amber-400 group-hover/lens:rotate-90' : 'text-zinc-500'
                }`}
              />
              <span className="font-semibold">
                Gravitational Lensing:
              </span>
              <span
                className={`font-bold ${
                  lensingMode === 'off'
                    ? 'text-zinc-400'
                    : lensingMode === 'enhanced'
                    ? 'text-amber-300 underline underline-offset-2'
                    : 'text-amber-400'
                }`}
              >
                {lensingMode === 'off' ? 'Off' : lensingMode === 'enhanced' ? 'Enhanced Warp' : 'Subtle Bending'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping opacity-75" />
            </button>
          </div>

          {/* 
            Cursive Title Block with Gravitational Light Bending
            Bends light simulating photons orbiting through curved spacetime near the event horizon
          */}
          <div
            className="transition-all duration-500 select-none max-w-full"
            style={{
              filter: getLensingFilter(),
            }}
          >
            <h1 className="font-allura hero-title-cursive text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-wide mb-3 select-none break-words px-2 max-w-full drop-shadow-[0_0_24px_rgba(255,185,60,0.65)] hover:scale-[1.01] transition-transform duration-300">
              Something Weird is Discovering…!
            </h1>
          </div>

          {/* Subtitle Block with Lensing Refraction */}
          <div
            className="transition-all duration-500 select-none max-w-full"
            style={{
              filter: getLensingFilter(),
            }}
          >
            <p className="text-zinc-200 font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase mb-4 px-3 py-0.5 rounded border border-white/5 bg-black/30 backdrop-blur-[2px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Mechanical &amp; Aerospace Engineering Research Group
            </p>
          </div>

          {/* 
            MIGA Einstein-Ring Badge
            Framed with relativistic backdrop-filter and light deflection border
          */}
          <div
            className="inline-flex items-baseline px-4 py-1.5 rounded-full font-orbitron font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 sm:mb-8 einstein-ring-badge transition-all duration-300 hover:scale-105"
            style={{
              filter: lensingMode !== 'off' ? 'drop-shadow(0 0 12px rgba(255, 180, 50, 0.35))' : 'none',
            }}
          >
            <span className="text-[#ff3131] drop-shadow-[0_0_6px_rgba(255,49,49,0.9)]">M</span>
            <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">IG</span>
            <span className="text-[#00ff41] drop-shadow-[0_0_6px_rgba(0,255,65,0.9)]">A</span>
            {lensingMode !== 'off' && (
              <span className="ml-2 text-[9px] font-mono tracking-normal text-amber-300/80 normal-case hidden sm:inline">
                • Spacetime Curvature
              </span>
            )}
          </div>

          {/* Interactive Action Buttons with Subtle Proximity Backdrop Lensing */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl p-2 rounded-xl bg-black/20 backdrop-blur-[2px] border border-white/5 shadow-2xl">
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

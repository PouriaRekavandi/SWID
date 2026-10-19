import React, { useState, useRef, useEffect } from 'react';
import { TabKey } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { AudioControl } from './AudioControl';
import { useEventHorizonAudio } from '../context/AudioContext';
import { ArrowRight, GraduationCap, PlayCircle, Bot, Sparkles, Orbit } from 'lucide-react';
import { BlackHoleHero } from './BlackHoleHero';
import { BlackHoleLogoCrest } from './BlackHoleLogoCrest';

interface HeroSectionProps {
  onSelectTab: (tab: TabKey) => void;
}

type LensingMode = 'subtle' | 'enhanced' | 'off';

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const [lensingMode, setLensingMode] = useState<LensingMode>('subtle');
  const [isLensingHovered, setIsLensingHovered] = useState(false);
  const [mouseProximity, setMouseProximity] = useState(0); // 0 (far) to 1 (at black hole core)
  const [mouseVector, setMouseVector] = useState({ x: 0, y: 0 });

  const logoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { setProximitySwell } = useEventHorizonAudio();

  const cycleLensingMode = () => {
    setLensingMode((prev) => {
      if (prev === 'subtle') return 'enhanced';
      if (prev === 'enhanced') return 'off';
      return 'subtle';
    });
  };

  // Track mouse proximity to central black hole and calculate relativistic light bending
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const bhCenterX = rect.left + rect.width / 2;
    const bhCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - bhCenterX;
    const dy = e.clientY - bhCenterY;
    const distance = Math.hypot(dx, dy);

    // Gravitational influence radius: 540px
    const maxRadius = 540;
    const prox = Math.max(0, Math.min(1, 1 - distance / maxRadius));
    setMouseProximity(prox);
    setMouseVector({ x: dx, y: dy });

    // Modulate Web Audio event horizon drone resonance based on proximity
    setProximitySwell(prox > 0.22);
  };

  const handleMouseLeave = () => {
    setMouseProximity(0);
    setMouseVector({ x: 0, y: 0 });
    setIsLensingHovered(false);
    setProximitySwell(false);
  };

  // Calculate dynamic displacement scale based on mode and mouse proximity
  const baseScale = lensingMode === 'off' ? 0 : lensingMode === 'enhanced' ? 12 : 5.5;
  const dynamicDisplacementScale = lensingMode === 'off' ? 0 : baseScale + mouseProximity * 15;

  const getLensingFilter = () => {
    if (lensingMode === 'off') return 'none';
    return 'url(#gravitational-lensing-dynamic)';
  };

  return (
    <BlackHoleHero
      mouseProximity={mouseProximity}
      className="border-b-2 dark:border-amber-500/60 border-amber-600/50 shadow-2xl transition-colors duration-200"
    >
      {/* 
        SVG Gravitational Lensing Distortion Filters
        Uses fractal noise turbulence + dynamic displacement mapping to authentically simulate general relativistic light bending (deflection of photons passing near Schwarzschild radius).
        Scale dynamically magnifies as mouse approaches the central black hole/logo.
      */}
      <svg className="absolute w-0 h-0 pointer-events-none -z-10" aria-hidden="true">
        <defs>
          <filter
            id="gravitational-lensing-dynamic"
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${(0.012 + mouseProximity * 0.009).toFixed(4)} ${(0.022 + mouseProximity * 0.014).toFixed(4)}`}
              numOctaves="3"
              seed="23"
              result="spacetimeWarp"
            >
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.012 0.022; 0.016 0.030; 0.012 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="spacetimeWarp"
              scale={dynamicDisplacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="deflectedPhotons"
            />
            <feGaussianBlur in="deflectedPhotons" stdDeviation={0.3 + mouseProximity * 0.4} result="softGlow" />
            <feMerge>
              <feMergeNode in="deflectedPhotons" />
              <feMergeNode in="softGlow" opacity={0.35 + mouseProximity * 0.3} />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <header
        ref={headerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative isolate flex flex-col items-center justify-start min-h-[520px] sm:min-h-[640px] pt-4 sm:pt-6 pb-12 sm:pb-16 px-4"
      >
        {/* Persistent Audio & Theme Controls in Header */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-2.5">
          <AudioControl variant="hero" />
          <ThemeSwitcher variant="hero" />
        </div>

        {/* 
          Central Black Hole & SWID-SHRK Logo Element
          Reactivity: Scales, pulses, and intensifies its gravitational lensing corona on mouse proximity
        */}
        <div
          ref={logoRef}
          onMouseEnter={() => setIsLensingHovered(true)}
          onMouseLeave={() => setIsLensingHovered(false)}
          className="relative z-10 flex flex-col items-center mb-5 sm:mb-6 pointer-events-auto transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${1 + mouseProximity * 0.06})`,
            filter: mouseProximity > 0.05
              ? `drop-shadow(0 0 ${15 + mouseProximity * 30}px rgba(255, 193, 7, ${0.4 + mouseProximity * 0.5}))`
              : 'none',
          }}
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
            className="absolute top-[220px] xs:top-[250px] sm:top-[300px] md:top-[320px] left-1/2 -translate-x-1/2 w-[92%] max-w-3xl h-48 sm:h-56 pointer-events-none z-5 rounded-[50%] gravitational-lens-field transition-all duration-300 opacity-80"
            style={{
              background: `radial-gradient(ellipse at 50% 20%, rgba(255, 180, 50, ${0.08 + mouseProximity * 0.12}) 0%, rgba(0, 184, 255, 0.03) 45%, transparent 75%)`,
              border: `1px solid rgba(255, 215, 64, ${0.12 + mouseProximity * 0.25})`,
              boxShadow: `inset 0 10px 30px rgba(255, 180, 50, ${0.08 + mouseProximity * 0.15}), 0 10px 40px rgba(0, 0, 0, 0.65)`,
              transform: `translateX(-50%) scale(${1 + mouseProximity * 0.04})`,
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
          Content Blocks Near the Black Hole with Relativistic Distortion on Mouse Proximity
        */}
        <div
          className="relative z-10 flex flex-col items-center text-center max-w-4xl px-2 w-full transition-all duration-300 ease-out"
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
              {mouseProximity > 0.05 && (
                <span className="text-[9px] text-amber-300/80 font-mono tracking-normal ml-0.5">
                  ({Math.round(mouseProximity * 100)}% Warp)
                </span>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping opacity-75" />
            </button>
          </div>

          {/* 
            Cursive Title Block with Gravitational Light Bending & Mouse Proximity Distortion
            Warp: Inward deflection pull towards singularity + tangential tidal skew + perspective deflection
          */}
          <div
            className="transition-all duration-200 select-none max-w-full"
            style={{
              filter: getLensingFilter(),
              transform: `translateY(${ -mouseProximity * 9 }px) scale(${1 + mouseProximity * 0.045}) skewX(${ (mouseVector.x / 400) * mouseProximity * 4 }deg) perspective(800px) rotateX(${ mouseProximity * 3 }deg)`,
              letterSpacing: `${mouseProximity * 0.02}em`,
            }}
          >
            <h1
              className="font-allura hero-title-cursive text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-wide mb-3 select-none break-words px-2 max-w-full transition-all duration-300"
              style={{
                filter: mouseProximity > 0.05
                  ? `drop-shadow(0 0 ${20 + mouseProximity * 30}px rgba(255, 185, 60, ${0.65 + mouseProximity * 0.35})) drop-shadow(0 0 ${35 + mouseProximity * 35}px rgba(0, 184, 255, ${0.3 + mouseProximity * 0.4}))`
                  : undefined,
              }}
            >
              Something Weird is Discovering…!
            </h1>
          </div>

          {/* Subtitle Block with Lensing Refraction & Tidal Deflection */}
          <div
            className="transition-all duration-200 select-none max-w-full"
            style={{
              filter: getLensingFilter(),
              transform: `translateY(${ -mouseProximity * 6 }px) scale(${1 + mouseProximity * 0.025})`,
            }}
          >
            <p
              className="text-zinc-200 font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase mb-4 px-3 py-0.5 rounded border transition-all duration-300 bg-black/30 backdrop-blur-[2px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              style={{
                borderColor: `rgba(255, 180, 50, ${0.08 + mouseProximity * 0.35})`,
                boxShadow: mouseProximity > 0.1
                  ? `0 0 ${12 + mouseProximity * 20}px rgba(255, 180, 50, ${0.15 + mouseProximity * 0.3})`
                  : 'none',
              }}
            >
              Mechanical &amp; Aerospace Engineering Research Group
            </p>
          </div>

          {/* 
            MIGA Einstein-Ring Badge
            Framed with relativistic backdrop-filter and light deflection border, magnifies on mouse proximity
          */}
          <div
            className="inline-flex items-baseline px-4 py-1.5 rounded-full font-orbitron font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 sm:mb-8 einstein-ring-badge transition-all duration-200 hover:scale-105"
            style={{
              filter: lensingMode !== 'off' ? 'drop-shadow(0 0 12px rgba(255, 180, 50, 0.35))' : 'none',
              transform: `translateY(${ -mouseProximity * 4 }px) scale(${1 + mouseProximity * 0.08})`,
              boxShadow: mouseProximity > 0.05
                ? `0 0 ${20 + mouseProximity * 30}px rgba(255, 200, 60, ${0.35 + mouseProximity * 0.45})`
                : undefined,
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
          <div
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl p-2 rounded-xl bg-black/20 backdrop-blur-[2px] border transition-all duration-200 shadow-2xl"
            style={{
              transform: `translateY(${ -mouseProximity * 3 }px)`,
              borderColor: `rgba(255, 215, 64, ${0.05 + mouseProximity * 0.25})`,
            }}
          >
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

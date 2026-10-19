import React, { useState } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Mail,
  ExternalLink,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';
import profilePhoto from '../assets/profile.png';
import profileFallback from '../assets/profile.jpg';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const ProfileSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const scholarlyLinks = [
    {
      name: 'Google Scholar',
      href: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Pouria+Hejazi+Rekavandi',
      icon: GraduationCap,
      label: 'Scholar Citations',
      color: 'hover:text-amber-400 hover:border-amber-400/60',
    },
    {
      name: 'ResearchGate',
      href: 'https://www.researchgate.net/profile/Pouria-Hejazi-Rekavandi',
      icon: BookOpen,
      label: 'ResearchGate Profile',
      color: 'hover:text-emerald-400 hover:border-emerald-400/60',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/PouriaRekavandi',
      icon: GitHubIcon,
      label: '@PouriaRekavandi',
      color: 'hover:text-[#00b8ff] hover:border-sky-400/60',
    },
    {
      name: 'Contact Email',
      href: 'mailto:s.s.hejazirekavandi@gmail.com',
      icon: Mail,
      label: 'Email PI',
      color: 'hover:text-amber-300 hover:border-amber-300/60',
    },
  ];

  const focusAreas = [
    'Fatigue & Fracture Mechanics',
    'Biomechanics & Brain Injury',
    'Architected Metamaterials',
    'Nonlinear FEA (Abaqus / VUMAT)',
  ];

  return (
    <section className="relative overflow-hidden dark:bg-[#0c1017]/85 bg-white border dark:border-amber-500/25 border-slate-200 dark:hover:border-amber-400/50 hover:border-amber-500/50 rounded-2xl p-6 sm:p-8 md:p-10 dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] shadow-lg transition-all duration-300 group">
      {/* Subtle cosmic gravitational starlight ambience */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none rounded-full opacity-20 dark:opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 180, 50, 0.25) 0%, rgba(0, 184, 255, 0.15) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] items-start gap-8 lg:gap-12">
        {/* Left Column: Portrait & Academic Credentials */}
        <div className="flex flex-col items-center text-center">
          {/* Gravitational Lens Portrait Frame */}
          <div className="relative mb-5 group/avatar">
            {/* Celestial Accretion Glow Halo */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full opacity-65 blur-md group-hover/avatar:opacity-95 transition-opacity duration-500 animate-[spin_25s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 45deg, rgba(255, 180, 50, 0.6), rgba(0, 184, 255, 0.5), rgba(0, 255, 65, 0.35), rgba(255, 180, 50, 0.6))',
              }}
            />

            {/* Inner Precision Dual-Ring Lens Frame */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 dark:border-amber-400/80 border-amber-600/70 p-1 dark:bg-[#05070a] bg-slate-900 shadow-2xl transition-transform duration-500 group-hover/avatar:scale-[1.02]">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {imageLoaded ? (
                  <img
                    src={profilePhoto}
                    alt="Dr. Pouria Hejazi Rekavandi — Principal Investigator"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top select-none transition-transform duration-700 group-hover/avatar:scale-108"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== profileFallback) {
                        target.src = profileFallback;
                      } else {
                        setImageLoaded(false);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center dark:bg-gradient-to-b dark:from-[#1a140a] dark:to-[#05070a] bg-gradient-to-b from-amber-50 to-slate-100">
                    <span className="font-orbitron font-bold text-3xl sm:text-4xl text-amber-500 select-none">
                      PHR
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Clean Floating Badge positioned below the portrait without clipping collar */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full dark:bg-black/90 bg-white border dark:border-amber-400/70 border-amber-600 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 dark:text-amber-300 text-amber-800 shadow-lg whitespace-nowrap z-20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>PI &amp; Lab Lead</span>
            </div>
          </div>

          {/* Quick Academic Status */}
          <div className="mt-2 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono dark:text-emerald-400 text-emerald-700 dark:bg-emerald-950/40 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-0.5" />
              <span>Open for Research Inquiries</span>
            </div>
          </div>

          {/* Scholarly Touchpoints (Google Scholar, ResearchGate, GitHub, Email) */}
          <div className="mt-5 w-full max-w-[260px] flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              {scholarlyLinks.slice(0, 2).map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border dark:border-zinc-800 border-slate-200 dark:bg-black/40 bg-slate-50 text-[11px] font-mono transition-all duration-200 dark:text-zinc-300 text-slate-700 hover:shadow-md ${item.color} group/link`}
                    title={item.label}
                  >
                    <Icon className="w-3.5 h-3.5 flex-none group-hover/link:scale-110 transition-transform" />
                    <span className="truncate">{item.name}</span>
                  </a>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {scholarlyLinks.slice(2, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border dark:border-zinc-800 border-slate-200 dark:bg-black/40 bg-slate-50 text-[11px] font-mono transition-all duration-200 dark:text-zinc-300 text-slate-700 hover:shadow-md ${item.color} group/link`}
                    title={item.label}
                  >
                    <Icon className="w-3.5 h-3.5 flex-none group-hover/link:scale-110 transition-transform" />
                    <span className="truncate">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Identity, Focus Areas, Narrative & Philosophical Verse */}
        <div className="space-y-5 text-left">
          {/* 1. Primary Academic Header & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider dark:bg-amber-500/15 bg-amber-100 dark:text-amber-300 text-amber-800 border dark:border-amber-500/30 border-amber-300">
                Principal Investigator
              </span>
              <span className="dark:text-zinc-500 text-slate-400 text-xs font-mono">•</span>
              <span className="dark:text-zinc-400 text-slate-600 text-xs font-mono tracking-wide">
                Mechanical &amp; Aerospace Engineering
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-white text-slate-900 tracking-tight font-rajdhani">
              Dr. Pouria Hejazi Rekavandi
            </h2>

            <p className="text-xs sm:text-sm font-mono dark:text-amber-400/90 text-amber-700 tracking-wider uppercase mt-1">
              Founder &amp; Research Lead · SWID-SHRK Research Group · MIGA Lab
            </p>
          </div>

          {/* 2. Typographic Research Focus Areas (Clean discipline, zero bubble pills) */}
          <div className="py-2.5 px-3.5 rounded-xl dark:bg-black/30 bg-slate-50 border dark:border-white/5 border-slate-200">
            <span className="text-[11px] font-mono uppercase tracking-wider dark:text-zinc-400 text-slate-500 block mb-1.5">
              Core Investigations &amp; Specialization:
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono dark:text-zinc-200 text-slate-800">
              {focusAreas.map((area, idx) => (
                <React.Fragment key={area}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full dark:bg-amber-400 bg-amber-500 flex-none" />
                    <span>{area}</span>
                  </span>
                  {idx < focusAreas.length - 1 && (
                    <span className="dark:text-zinc-600 text-slate-300 select-none hidden sm:inline">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 3. Narrative Journey */}
          <p className="dark:text-zinc-300 text-slate-700 text-sm sm:text-base leading-relaxed">
            I am an interdisciplinary engineering researcher specializing in{' '}
            <strong className="dark:text-amber-400 text-amber-700 font-semibold">
              mechanical and aerospace engineering
            </strong>
            , embodying the continuous evolution of a childhood curiosity that has shaped my entire 40-year journey across continuum mechanics, materials physics, and bio-inspired aerospace structures.
          </p>

          {/* 4. Illuminated Literary & Philosophical Verse */}
          <div className="relative overflow-hidden rounded-xl border dark:border-amber-500/30 border-amber-400/50 dark:bg-gradient-to-br dark:from-[#131720]/90 dark:to-[#0a0d14]/90 bg-gradient-to-br from-amber-50/60 to-orange-50/40 p-5 sm:p-6 shadow-md">
            {/* Watermark Quotation Mark */}
            <span
              aria-hidden="true"
              className="absolute -top-5 -left-1 font-serif text-8xl dark:text-amber-500/10 text-amber-600/10 select-none pointer-events-none leading-none"
            >
              “
            </span>

            {/* Glowing left accent hairline */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500"
            />

            <div className="relative pl-3 sm:pl-4 space-y-1.5">
              <p className="dark:text-amber-100/90 text-slate-900 text-sm sm:text-[15px] font-serif italic leading-relaxed tracking-wide">
                Listen to the whispers of your dreaming soul,<br />
                Speak only truth to keep your spirit whole.<br />
                Fix your steady gaze upon a single star,<br />
                Work with burning fire to reach for what you are.<br />
                And let no passing shadow dim your inner light,<br />
                For nothing can eclipse a purpose shining bright.
              </p>

              {/* Manuscript Sign-off */}
              <div className="pt-3 flex items-center justify-between border-t dark:border-white/5 border-amber-900/10">
                <span className="text-[11px] font-mono uppercase tracking-wider dark:text-zinc-400 text-slate-500">
                  With sincere dedication,
                </span>
                <span className="text-sm font-semibold dark:text-white text-slate-900 font-rajdhani flex items-center gap-1.5">
                  <span>Pouria</span>
                  <span className="text-base select-none" role="img" aria-label="sunflower">
                    🌻
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

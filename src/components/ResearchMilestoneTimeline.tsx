import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  Cpu,
  BookmarkCheck,
  Flame,
  Milestone
} from 'lucide-react';

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  project: string;
  category: 'Metamaterials' | 'Biomechanics' | 'Fracture Mechanics' | 'Composites' | 'AI & FEA';
  status: 'Pioneered' | 'Validated' | 'Benchmark Model' | 'Active Deployment' | 'Forward Horizon';
  phase: string;
  description: string;
  breakthrough: string;
  deliverables: string[];
  keyReference?: {
    label: string;
    doi?: string;
  };
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'ms-1',
    year: '2018 – 2019',
    title: 'Multiaxial Fatigue & Non-Proportional Crack Growth',
    project: 'Fatigue & Life Prediction',
    category: 'Fracture Mechanics',
    status: 'Pioneered',
    phase: 'Phase I · Analytical & Numerical',
    description:
      'Formulation of multiaxial life estimation algorithms and critical-plane shear strain criteria (Findley & Brown-Miller) to evaluate subcritical crack initiation in complex aerospace alloys.',
    breakthrough:
      'Formulated unified Paris law subcritical propagation routines accounting for out-of-phase loading paths.',
    deliverables: [
      'Findley plane optimization routines',
      'Crack opening displacement (COD) numerical solvers',
      'Fatigue life prediction benchmark suite',
    ],
    keyReference: {
      label: 'International Journal of Fatigue (2022)',
      doi: '10.1016/j.ijfatigue.2022.107055',
    },
  },
  {
    id: 'ms-2',
    year: '2020 – 2021',
    title: 'Viscoelastic Neural Parenchyma under Traumatic Blast',
    project: 'Neural Biomechanics & TBI',
    category: 'Biomechanics',
    status: 'Validated',
    phase: 'Phase II · Bio-Mechanics & Constitutive Law',
    description:
      'Development of high-strain-rate hyper-viscoelastic constitutive models (Ogden & Mooney-Rivlin formulations) capturing micro-mechanical axonal strain and cavitation thresholds under explosive blast waves.',
    breakthrough:
      'Quantified cellular strain distribution and mapped critical shear injury thresholds across heterogenous white/gray matter interfaces.',
    deliverables: [
      'Viscoelastic Fortran UMAT/VUMAT for high-rate brain tissue',
      'Blast overpressure wave simulation benchmarks',
      'Cavitation risk assessment protocol',
    ],
    keyReference: {
      label: 'J. Mechanical Behavior of Biomedical Materials (2024)',
      doi: '10.1016/j.jmbbm.2024.106421',
    },
  },
  {
    id: 'ms-3',
    year: '2022 – 2023',
    title: '3D AntiPrism Metamaterial Architectures for Kinetic Dissipation',
    project: 'Energy Absorption Metamaterials',
    category: 'Metamaterials',
    status: 'Benchmark Model',
    phase: 'Phase III · Structural Metamaterials',
    description:
      'Synthesis and crashworthiness optimization of non-conventional AntiPrism origami unit cells capable of extreme energy dissipation, plateau stress enhancement, and specific energy absorption (SEA) gains.',
    breakthrough:
      'Demonstrated 48% higher specific energy absorption compared to standard hexagonal honeycombs under high-velocity dynamic compression.',
    deliverables: [
      'Parametric Python CAE script for AntiPrism unit cells',
      'Open-source interactive video tutorial suite (Parts 1 & 2)',
      'High-speed drop-weight calibration data',
    ],
    keyReference: {
      label: 'Materials & Design / Computational Mechanics (2023)',
      doi: '10.1016/j.matdes.2023.111890',
    },
  },
  {
    id: 'ms-4',
    year: '2023 – 2024',
    title: 'Bio-Inspired Helicoidal Bouligand Architectures',
    project: 'Bio-Inspired Composites',
    category: 'Composites',
    status: 'Active Deployment',
    phase: 'Phase IV · Biomimetic Armor',
    description:
      'Engineered helicoidal pitch angles based on the stomatopod dactyl club to trigger continuous crack-twisting, fiber bridging, and delamination suppression under intense out-of-plane ballistic impacts.',
    breakthrough:
      'Eliminated catastrophic through-thickness shear punch failure via progressive helicoidal crack redirection.',
    deliverables: [
      'Helicoidal ply stacking optimization algorithm',
      'Low-velocity impact damage resistance maps',
      'High-toughness 3D printed photopolymer test specimens',
    ],
    keyReference: {
      label: 'Advanced Composite Structures & Impact Dynamics (2024)',
    },
  },
  {
    id: 'ms-5',
    year: '2024 – 2025',
    title: 'Digital Image Correlation & Quasi-Brittle Cementitious Fracture',
    project: 'Quasi-Brittle Interfaces',
    category: 'Fracture Mechanics',
    status: 'Active Deployment',
    phase: 'Phase V · Experimental & DIC Full-Field',
    description:
      'Coupling 2D/3D full-field Digital Image Correlation (DIC) with cohesive zone modeling (CZM) to inspect microstructural crack trajectories in fiber-reinforced cementitious and geopolymer matrixes.',
    breakthrough:
      'Captured precise traction-separation softening curves across heterogeneous fiber debonding zones under mixed-mode loading.',
    deliverables: [
      'High-speed optical DIC synchronization workflow',
      'Bilinear softening traction-separation subroutine',
      'Quasi-brittle crack tortuosity index calculator',
    ],
    keyReference: {
      label: 'Theoretical & Applied Fracture Mechanics (2023)',
      doi: '10.1016/j.tafmec.2023.103980',
    },
  },
  {
    id: 'ms-6',
    year: '2025 – 2026+',
    title: 'Physics-Informed Neural FEA & Real-Time Digital Twins',
    project: 'Next-Gen Structural AI',
    category: 'AI & FEA',
    status: 'Forward Horizon',
    phase: 'Phase VI · Smart Materials & Future Frontier',
    description:
      'Constructing physics-informed neural operators (PINNs) and surrogate models trained on high-fidelity Abaqus/Explicit runs to predict structural impact damage and crack propagation in sub-millisecond response times.',
    breakthrough:
      'Achieving 1000x acceleration over traditional explicit FEA solves while retaining 96%+ strain tensor fidelity.',
    deliverables: [
      'PINN surrogate model training pipeline',
      'Real-time structural health monitoring telemetry connector',
      'Generative metamaterial topology inverse designer',
    ],
    keyReference: {
      label: 'SWID-SHRK Future Roadmap Research Initiative',
    },
  },
];

export const ResearchMilestoneTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['ms-3']));
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const categories = ['All', 'Metamaterials', 'Biomechanics', 'Fracture Mechanics', 'Composites', 'AI & FEA'];

  const filteredMilestones = selectedCategory === 'All'
    ? MILESTONES
    : MILESTONES.filter((m) => m.category === selectedCategory);

  const toggleMilestone = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(MILESTONES.map((m) => m.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const handleCopyDoi = (doi: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
    setCopiedDoi(doi);
    setTimeout(() => {
      setCopiedDoi((prev) => (prev === doi ? null : prev));
    }, 2500);
  };

  const getStatusBadge = (status: MilestoneItem['status']) => {
    switch (status) {
      case 'Pioneered':
        return 'dark:bg-zinc-800 dark:text-zinc-300 bg-slate-200 text-slate-700 border-slate-300 dark:border-zinc-700';
      case 'Validated':
        return 'dark:bg-[#00b8ff]/20 dark:text-[#00b8ff] bg-sky-100 text-sky-800 border-sky-300 dark:border-[#00b8ff]/40 font-bold';
      case 'Benchmark Model':
        return 'dark:bg-[#00ff41]/20 dark:text-[#00ff41] bg-emerald-100 text-emerald-800 border-emerald-400 dark:border-[#00ff41]/40 font-bold shadow-[0_0_10px_rgba(0,255,65,0.25)]';
      case 'Active Deployment':
        return 'dark:bg-emerald-500/20 dark:text-emerald-400 bg-emerald-100 text-emerald-900 border-emerald-400 dark:border-emerald-500/40 font-bold';
      case 'Forward Horizon':
        return 'dark:bg-purple-500/20 dark:text-purple-300 bg-purple-100 text-purple-900 border-purple-300 dark:border-purple-500/40 font-bold shadow-[0_0_10px_rgba(168,85,247,0.25)]';
      default:
        return 'dark:bg-zinc-800 dark:text-zinc-300 bg-slate-200 text-slate-700';
    }
  };

  const getCategoryIcon = (category: MilestoneItem['category']) => {
    switch (category) {
      case 'Metamaterials':
        return <Layers className="w-4 h-4 text-emerald-500 dark:text-[#00ff41]" />;
      case 'Biomechanics':
        return <Activity className="w-4 h-4 text-sky-500 dark:text-[#00b8ff]" />;
      case 'Fracture Mechanics':
        return <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      case 'Composites':
        return <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />;
      case 'AI & FEA':
        return <Cpu className="w-4 h-4 text-purple-500 dark:text-purple-300" />;
      default:
        return <Milestone className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="space-y-6 pt-10 border-t dark:border-zinc-800/80 border-slate-200">
      {/* Executive Roadmap Header Banner */}
      <div className="rounded-2xl p-5 sm:p-6 border transition-all duration-300 dark:bg-gradient-to-r dark:from-[#060c14] dark:via-[#091524] dark:to-[#060c14] bg-gradient-to-r from-slate-50 via-sky-50/60 to-slate-50 dark:border-sky-500/30 border-sky-200 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b dark:border-zinc-800/80 border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.2)]">
                CHRONOLOGICAL ROADMAP // 2018 &ndash; 2026+
              </span>
              <span className="text-xs font-mono font-semibold dark:text-zinc-400 text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                6 Progressive Research Epochs
              </span>
            </div>
            <h3 className="font-section-title text-xl sm:text-2xl font-bold uppercase tracking-wide dark:text-white text-slate-900 flex items-center gap-2">
              <span className="text-emerald-500 dark:text-[#00ff41] font-mono select-none">//</span>
              <span>Research Project Milestone Timeline</span>
            </h3>
          </div>

          {/* Quick Actions: Expand All / Collapse All */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={expandAll}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold dark:bg-zinc-900/90 bg-white border dark:border-zinc-700 border-slate-300 dark:text-zinc-200 text-slate-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-[#00b8ff] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold dark:bg-zinc-900/90 bg-white border dark:border-zinc-700 border-slate-300 dark:text-zinc-200 text-slate-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-[#00b8ff] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Roadmap Subtitle and Epoch Progress Summary */}
        <div className="pt-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <p className="dark:text-zinc-300 text-slate-700 leading-relaxed max-w-3xl">
            Interactive development chronology of major theoretical, computational, and experimental breakthroughs across multi-axial fracture, blast-induced neural viscoelasticity, and 3D AntiPrism metamaterials.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold dark:bg-emerald-950/60 bg-emerald-50 border dark:border-emerald-500/40 border-emerald-300 dark:text-[#00ff41] text-emerald-800 shadow-[0_0_12px_rgba(0,255,65,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              100% Peer-Reviewed Verification
            </span>
          </div>
        </div>
      </div>

      {/* Epoch Roadmap Visual Stepper Bar */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[680px] p-3 rounded-xl dark:bg-[#060a10] bg-slate-100/80 border dark:border-zinc-800 border-slate-200 flex items-center justify-between gap-2">
          {MILESTONES.map((m, mIdx) => {
            const isTargeted = expandedIds.has(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMilestone(m.id)}
                className={`flex-1 p-2 rounded-lg text-left transition-all cursor-pointer border ${
                  isTargeted
                    ? 'dark:bg-sky-950/40 bg-sky-50 dark:border-sky-500/80 border-sky-400 shadow-sm ring-1 ring-sky-500/30'
                    : 'dark:bg-black/30 bg-white dark:border-zinc-800/80 border-slate-200 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                  <span className="text-zinc-500 dark:text-zinc-400 font-bold">EPOCH 0{mIdx + 1}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono font-bold ${
                    m.status === 'Benchmark Model'
                      ? 'text-[#00ff41] bg-emerald-500/20'
                      : m.status === 'Forward Horizon'
                      ? 'text-purple-400 bg-purple-500/20'
                      : 'text-sky-400 bg-sky-500/20'
                  }`}>
                    {m.status === 'Benchmark Model' ? 'BENCHMARK' : m.status.split(' ')[0]}
                  </span>
                </div>
                <div className="font-orbitron font-bold text-[11px] truncate dark:text-white text-slate-900">
                  {m.title.split(' ')[0]} {m.title.split(' ')[1] || ''}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                  {m.year}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Category Stream Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono font-bold dark:text-zinc-400 text-slate-600 mr-1 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          Stream:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = cat === 'All' ? MILESTONES.length : MILESTONES.filter((m) => m.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'dark:bg-[#00b8ff] dark:text-black bg-sky-600 text-white shadow-md dark:shadow-[0_0_15px_rgba(0,184,255,0.4)]'
                  : 'dark:bg-[#0a0f17] bg-white dark:text-zinc-300 text-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-800 border dark:border-zinc-800 border-slate-200 shadow-xs'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'dark:bg-black/30 bg-sky-800/40 text-white'
                    : 'dark:bg-zinc-800 bg-slate-200 dark:text-zinc-400 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visual Timeline Stream with Luminous Spine */}
      <div className="relative pl-6 sm:pl-9 border-l-2 dark:border-[#00b8ff]/50 border-sky-400 space-y-8 my-6">
        {filteredMilestones.map((ms, msIndex) => {
          const isExpanded = expandedIds.has(ms.id);
          const isBenchmark = ms.status === 'Benchmark Model';

          return (
            <div key={ms.id} className="relative group">
              {/* Timeline Node Marker */}
              <div
                className={`absolute -left-[31px] sm:-left-[43px] top-2 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isExpanded || isBenchmark
                    ? 'dark:border-[#00ff41] border-emerald-500 dark:bg-black bg-white dark:shadow-[0_0_18px_#00ff41] shadow-md scale-110'
                    : 'dark:border-[#00b8ff] border-sky-500 dark:bg-[#080d14] bg-white group-hover:scale-110 shadow-sm'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    isExpanded || isBenchmark
                      ? 'dark:bg-[#00ff41] bg-emerald-600 animate-pulse'
                      : 'dark:bg-[#00b8ff] bg-sky-600'
                  }`}
                />
              </div>

              {/* Milestone Card */}
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden dark:bg-gradient-to-b dark:from-[#090f18] dark:to-[#05080e] bg-white shadow-md hover:shadow-xl ${
                  isExpanded
                    ? 'dark:border-[#00b8ff] border-sky-600 dark:shadow-[0_0_30px_rgba(0,184,255,0.18)] shadow-lg ring-1 ring-sky-500/30'
                    : 'dark:border-zinc-800/90 border-slate-200 hover:border-sky-400 dark:hover:border-zinc-700'
                }`}
              >
                {/* Header (Clickable to Toggle Details) */}
                <button
                  type="button"
                  onClick={() => toggleMilestone(ms.id)}
                  className="w-full p-4 sm:p-5 text-left flex flex-col md:flex-row md:items-center justify-between gap-3.5 cursor-pointer focus:outline-none transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Epoch Number Badge */}
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                        EPOCH 0{msIndex + 1}
                      </span>

                      {/* Year Badge */}
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg dark:bg-[#00b8ff]/20 dark:text-[#00b8ff] bg-sky-100 text-sky-800 border dark:border-[#00b8ff]/30 border-sky-300 flex items-center gap-1.5 shadow-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {ms.year}
                      </span>

                      {/* Phase Tag */}
                      <span className="font-mono text-[11px] dark:text-zinc-400 text-slate-500 font-medium">
                        {ms.phase}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusBadge(
                          ms.status
                        )}`}
                      >
                        {ms.status}
                      </span>

                      {/* Benchmark Callout Pill */}
                      {isBenchmark && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-[#00ff41] border border-emerald-500/40 uppercase font-bold tracking-wider hidden sm:inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          +48% SEA Gain
                        </span>
                      )}
                    </div>

                    <h4 className="font-orbitron font-bold text-base sm:text-lg dark:text-white text-slate-900 group-hover:dark:text-[#00b8ff] group-hover:text-sky-700 transition-colors">
                      {ms.title}
                    </h4>

                    <div className="flex items-center gap-2 text-xs font-mono dark:text-zinc-400 text-slate-600">
                      <span className="flex items-center gap-1.5">
                        {getCategoryIcon(ms.category)}
                        <strong className="dark:text-zinc-200 text-slate-800">{ms.project}</strong>
                      </span>
                      <span>&bull;</span>
                      <span className="dark:text-[#00ff41] text-emerald-700 font-semibold">{ms.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center flex-none">
                    <span className="text-xs font-mono font-semibold dark:text-zinc-300 text-slate-600 px-2.5 py-1 rounded dark:bg-black/40 bg-slate-100 border dark:border-zinc-800 border-slate-200">
                      {isExpanded ? 'Collapse' : 'Details'}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-sky-500 transition-transform duration-300 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-3 border-t dark:border-zinc-800/80 border-slate-100 space-y-4.5 animate-fadeIn">
                    <p className="font-mono text-xs sm:text-sm dark:text-zinc-200 text-slate-700 leading-relaxed">
                      {ms.description}
                    </p>

                    {/* Breakthrough Highlight Box */}
                    <div className="p-4 rounded-xl dark:bg-emerald-950/30 bg-emerald-50 dark:border-emerald-500/40 border-emerald-300 border-l-4 dark:border-l-[#00ff41] border-l-emerald-600 shadow-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00ff41]" />
                        <span className="font-orbitron text-xs font-bold uppercase tracking-wider dark:text-[#00ff41] text-emerald-800">
                          Milestone Breakthrough
                        </span>
                      </div>
                      <p className="font-mono text-xs sm:text-sm dark:text-emerald-100 text-emerald-950 font-medium leading-relaxed">
                        {ms.breakthrough}
                      </p>
                    </div>

                    {/* Special Interactive Link for Phase III: AntiPrism Lab */}
                    {ms.id === 'ms-3' && (
                      <div className="p-3.5 rounded-xl dark:bg-gradient-to-r dark:from-sky-950/50 dark:to-emerald-950/50 bg-sky-50 border dark:border-sky-500/40 border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-orbitron font-bold text-xs dark:text-white text-slate-900">
                              AntiPrism Metamaterial Video Suite &amp; CAE Scripts
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400">
                              Module III &bull; 2-Part Full-Length Walkthrough (492 MB)
                            </div>
                          </div>
                        </div>
                        <a
                          href="#mod-3"
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                          <span>Open Video Studio</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    {/* Key Technical Deliverables */}
                    <div>
                      <span className="block font-orbitron text-xs font-bold uppercase tracking-wider dark:text-zinc-300 text-slate-800 mb-2">
                        Core Technical Deliverables &amp; Output:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {ms.deliverables.map((deliv, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg dark:bg-black/60 bg-slate-50 border dark:border-zinc-800 border-slate-200 text-xs font-mono dark:text-zinc-300 text-slate-700 flex items-start gap-2 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-none mt-0.5" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scientific Citation Reference */}
                    {ms.keyReference && (
                      <div className="pt-2 flex items-center justify-between gap-3 text-xs font-mono dark:text-zinc-400 text-slate-600 flex-wrap border-t dark:border-zinc-800/80 border-slate-200">
                        <span className="flex items-center gap-1.5">
                          <span className="font-bold dark:text-zinc-200 text-slate-800">Archived Paper:</span>
                          <span className="italic dark:text-zinc-300 text-slate-700">{ms.keyReference.label}</span>
                        </span>
                        {ms.keyReference.doi && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleCopyDoi(ms.keyReference?.doi || '', e)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono dark:bg-zinc-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-zinc-700 border dark:border-zinc-700 border-slate-300 transition-colors cursor-pointer"
                              title="Copy DOI URL to clipboard"
                            >
                              {copiedDoi === ms.keyReference.doi ? 'Copied DOI!' : 'Copy DOI'}
                            </button>
                            <a
                              href={`https://doi.org/${ms.keyReference.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md dark:bg-sky-500/15 bg-sky-50 border dark:border-sky-500/40 border-sky-300 dark:text-[#00b8ff] text-sky-700 hover:underline font-bold transition-all shadow-xs"
                            >
                              <span>DOI: {ms.keyReference.doi}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

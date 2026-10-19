import React, { useState, useMemo, useEffect } from 'react';
import { ANTIPRISM_VIDEOS, GOOGLE_DRIVE_VIDEOS_FOLDER } from '../data/initialData';
import { ResearchMilestoneTimeline } from './ResearchMilestoneTimeline';
import { GitHubStatsWidget } from './GitHubStatsWidget';
import {
  ChevronDown,
  Play,
  Download,
  ExternalLink,
  FolderOpen,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Filter,
  ArrowUpDown,
  Search,
  X,
  Share2,
  Check,
  BookOpen,
  Sparkles,
  Tag
} from 'lucide-react';

interface ResearchItem {
  id: string;
  category: 'module' | 'focus';
  numeral?: string;
  title: string;
  shortTitle: string;
  desc: string;
  tags: string[];
  highlight?: string;
  order: number;
}

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'mod-1',
    category: 'module',
    numeral: 'I',
    title: 'Fatigue and Fracture Mechanics',
    shortTitle: 'Fatigue & Fracture',
    desc: 'Overview and educational materials on fatigue failure, crack initiation, stress-intensity factor formulations (KI, KII, KIII), and Paris law subcritical crack growth.',
    tags: ['Fracture', 'FEA'],
    highlight: 'Multiaxial life models & Findley critical planes',
    order: 1,
  },
  {
    id: 'mod-2',
    category: 'module',
    numeral: 'II',
    title: 'Neural Biomechanics & Traumatic Injury',
    shortTitle: 'Neural Biomechanics',
    desc: 'Research materials focusing on computational neuroscience, brain-tissue modeling, and axonal strain under dynamic impact rates and blast overpressures.',
    tags: ['Biomechanics', 'FEA'],
    highlight: 'Nonlinear Ogden & Mooney-Rivlin viscoelasticity',
    order: 2,
  },
  {
    id: 'mod-3',
    category: 'module',
    numeral: 'III',
    title: 'Energy Absorption & Metamaterials (Interactive Tutorials)',
    shortTitle: 'Energy Absorption & Metamaterials',
    desc: 'Investigation into mechanical energy dissipation, cellular metamaterials, AntiPrism unit cells, and dynamic impact mitigation.',
    tags: ['Metamaterials', 'FEA'],
    highlight: 'Interactive AntiPrism Video Tutorials (Parts 1 & 2)',
    order: 3,
  },
  {
    id: 'mod-4',
    category: 'module',
    numeral: 'IV',
    title: 'Fracture in Cementitious Materials',
    shortTitle: 'Cementitious Fracture',
    desc: 'Studies on cementitious-matrix toughness, quasi-brittle fracture, and microstructural analysis in fiber-reinforced composite systems.',
    tags: ['Fracture', 'Composites'],
    highlight: 'Digital Image Correlation & bilinear softening laws',
    order: 4,
  },
  {
    id: 'focus-1',
    category: 'focus',
    title: 'Composite Sandwich Panels',
    shortTitle: 'Composite Sandwich Panels',
    desc: 'Study and optimization of composite sandwich panels featuring various cores, specifically focusing on honeycomb configurations under uniform external compressive load.',
    tags: ['Metamaterials', 'Composites'],
    highlight: 'Uniform compressive load & core cell topology',
    order: 5,
  },
  {
    id: 'focus-2',
    category: 'focus',
    title: 'Bio-inspired Composites',
    shortTitle: 'Bio-inspired Composites',
    desc: 'Design, data extraction, and structural analysis of bio-inspired helicoidal composite structures to significantly enhance impact resistance and load-bearing capacity.',
    tags: ['Biomechanics', 'Metamaterials', 'Composites'],
    highlight: 'Bouligand architectures & crack twisting mechanisms',
    order: 6,
  },
  {
    id: 'focus-3',
    category: 'focus',
    title: 'Computational Modeling & FEA',
    shortTitle: 'Computational FEA',
    desc: 'Development and debugging of computational codes in MATLAB and Python, alongside utilizing finite element methods (Abaqus UMAT/VUMAT) for precise simulation of complex mechanical behaviors.',
    tags: ['FEA', 'Fracture', 'Biomechanics'],
    highlight: 'Explicit solvers & nonlinear constitutive routines',
    order: 7,
  },
];

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'tags-count';
export type CategoryFilter = 'all' | 'module' | 'focus';

const POPULAR_SEARCH_TOPICS = [
  'Metamaterials',
  'AntiPrism',
  'Viscoelastic',
  'Bouligand',
  'Honeycomb',
  'FEA',
  'Fracture',
  'DIC'
];

const HighlightText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  try {
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    if (parts.length <= 1) return <>{text}</>;
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="dark:bg-[#00ff41]/25 dark:text-[#00ff41] bg-amber-200 text-amber-950 px-1 py-0.5 rounded font-bold"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
};

export interface ResearchSectionProps {
  onNotify?: (message: string, isError?: boolean) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onNotify }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastNotification, setToastNotification] = useState<{ title: string; link: string } | null>(null);

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'mod-1': false,
    'mod-2': false,
    'mod-3': true, // Expanded by default to highlight video player
    'mod-4': false,
  });

  const [currentVideo, setCurrentVideo] = useState(ANTIPRISM_VIDEOS[0]);

  // Handle deep-link hashes (e.g. #mod-1 or #focus-2)
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash) {
        if (['mod-1', 'mod-2', 'mod-3', 'mod-4'].includes(rawHash)) {
          setOpenAccordions((prev) => ({ ...prev, [rawHash]: true }));
        }
        setTimeout(() => {
          const el = document.getElementById(rawHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Automatically expand matching module accordions when user enters a search query
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length > 0) {
      const matchedModuleIds: Record<string, boolean> = {};
      RESEARCH_ITEMS.filter((i) => i.category === 'module').forEach((item) => {
        const matches =
          item.title.toLowerCase().includes(q) ||
          item.shortTitle.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          (item.highlight && item.highlight.toLowerCase().includes(q)) ||
          item.tags.some((t) => t.toLowerCase().includes(q));
        if (matches) {
          matchedModuleIds[item.id] = true;
        }
      });
      if (Object.keys(matchedModuleIds).length > 0) {
        setOpenAccordions((prev) => ({ ...prev, ...matchedModuleIds }));
      }
    }
  }, [searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setOpenAccordions({
      'mod-1': true,
      'mod-2': true,
      'mod-3': true,
      'mod-4': true,
    });
  };

  const collapseAll = () => {
    setOpenAccordions({
      'mod-1': false,
      'mod-2': false,
      'mod-3': false,
      'mod-4': false,
    });
  };

  const handleShare = async (item: ResearchItem, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const shareUrl = `${origin}${pathname}#${item.id}`;

    let success = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        success = true;
      } catch {
        success = false;
      }
    }

    setCopiedId(item.id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === item.id ? null : curr));
    }, 2500);

    const notifyText = `Project link copied to clipboard: ${item.shortTitle || item.title}`;
    if (onNotify) {
      onNotify(notifyText);
    } else {
      setToastNotification({
        title: item.title,
        link: shareUrl,
      });
      setTimeout(() => {
        setToastNotification((curr) => (curr?.title === item.title ? null : curr));
      }, 4000);
    }
  };

  const allTags = ['All', 'Biomechanics', 'Metamaterials', 'Fracture', 'FEA', 'Composites'];

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: RESEARCH_ITEMS.length,
      module: RESEARCH_ITEMS.filter((item) => item.category === 'module').length,
      focus: RESEARCH_ITEMS.filter((item) => item.category === 'focus').length,
    };
  }, []);

  // Tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { All: RESEARCH_ITEMS.length };
    allTags.slice(1).forEach((tag) => {
      counts[tag] = RESEARCH_ITEMS.filter((item) => item.tags.includes(tag)).length;
    });
    return counts;
  }, []);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    let result = RESEARCH_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Tag filter
      const matchesTag = selectedTag === 'All' || item.tags.includes(selectedTag);

      // Search keyword filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.shortTitle.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        (item.highlight && item.highlight.toLowerCase().includes(query)) ||
        (item.numeral && `module ${item.numeral}`.toLowerCase().includes(query)) ||
        (item.numeral && item.numeral.toLowerCase() === query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesTag && matchesSearch;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === 'tags-count') {
        return b.tags.length - a.tags.length;
      }
      return a.order - b.order;
    });

    return result;
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const modules = filteredItems.filter((i) => i.category === 'module');
  const focusAreas = filteredItems.filter((i) => i.category === 'focus');

  const handleTagClick = (tag: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedTag(tag);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('All');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <div className="space-y-10 relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b dark:border-amber-500/20 border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider dark:bg-amber-500/15 bg-amber-100 dark:text-amber-300 text-amber-800 border dark:border-amber-500/30 border-amber-300">
              02. Research Catalog
            </span>
            <span className="dark:text-zinc-500 text-slate-400 text-xs font-mono">•</span>
            <span className="dark:text-zinc-400 text-slate-600 text-xs font-mono tracking-wide">
              Continuum Mechanics &amp; Aerospace
            </span>
          </div>
          <h2 className="font-rajdhani text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight dark:text-white text-slate-900">
            Research Modules &amp; Domains
          </h2>
          <p className="dark:text-zinc-400 text-slate-600 font-mono text-xs sm:text-sm max-w-3xl leading-relaxed mt-1">
            Fundamental investigations across continuum mechanics, bio-inspired architectures, nonlinear material deformation, and dynamic crashworthiness.
          </p>
        </div>

        {/* Live Filtered Count Badge */}
        <div className="flex-none self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/30 border-amber-300 dark:text-amber-300 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{filteredItems.length} of {RESEARCH_ITEMS.length} Modules</span>
          </span>
        </div>
      </div>

      {/* Streamlined 2-Tier Command Toolbar */}
      <div className="dark:bg-[#0c1017]/90 bg-white border dark:border-amber-500/25 border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Tier 1: Search Input & View Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              placeholder="Search projects, materials, subroutines (e.g. Viscoelastic, VUMAT)..."
              aria-label="Search research projects and topics"
              className="w-full pl-10 pr-28 sm:pr-32 py-2.5 dark:bg-[#05070a] bg-slate-50 border dark:border-zinc-800 border-slate-300 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl text-xs sm:text-sm dark:text-white text-slate-900 font-mono placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-auto">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  title="Clear search (ESC)"
                  aria-label="Clear search query"
                  className="p-1 rounded text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-block text-[10px] font-mono dark:text-zinc-500 text-slate-400 border dark:border-zinc-800 border-slate-200 px-1.5 py-0.5 rounded">
                  ESC
                </span>
              )}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold dark:bg-amber-500/15 bg-amber-100 dark:text-amber-300 text-amber-800 border dark:border-amber-500/30 border-amber-300">
                {filteredItems.length} found
              </span>
            </div>
          </div>

          {/* Quick Actions: Sort + Expand All */}
          <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end flex-none">
            <div className="flex items-center gap-1.5 dark:bg-[#05070a] bg-slate-50 border dark:border-zinc-800 border-slate-300 px-3 py-2 rounded-xl text-xs font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400 flex-none" />
              <label htmlFor="sort-select" className="text-zinc-400 sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent dark:text-zinc-200 text-slate-700 focus:outline-none cursor-pointer text-xs"
              >
                <option value="default">Default Order</option>
                <option value="name-asc">Title (A &rarr; Z)</option>
                <option value="name-desc">Title (Z &rarr; A)</option>
                <option value="tags-count">Most Related Tags</option>
              </select>
            </div>

            {selectedCategory !== 'focus' && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={expandAll}
                  className="px-2.5 py-2 text-[11px] font-mono dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:hover:bg-zinc-800 hover:bg-slate-200 dark:text-zinc-300 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  title="Expand all accordion modules"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="px-2.5 py-2 text-[11px] font-mono dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:hover:bg-zinc-800 hover:bg-slate-200 dark:text-zinc-300 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  title="Collapse all accordion modules"
                >
                  Collapse All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tier 2: Unified Categories & Topic Filter Strip */}
        <div className="pt-3 border-t dark:border-zinc-800/80 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Segmented Category Tabs */}
          <div className="inline-flex rounded-xl p-1 dark:bg-[#05070a] bg-slate-100 border dark:border-zinc-800 border-slate-200 self-start sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 border-amber-300 bg-amber-100 text-amber-900 font-bold border'
                  : 'dark:text-zinc-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Projects</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold dark:bg-black/40 bg-white/60">
                {categoryCounts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('module')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'module'
                  ? 'dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 border-amber-300 bg-amber-100 text-amber-900 font-bold border'
                  : 'dark:text-zinc-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold dark:bg-black/40 bg-white/60">
                {categoryCounts.module}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('focus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'focus'
                  ? 'dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 border-amber-300 bg-amber-100 text-amber-900 font-bold border'
                  : 'dark:text-zinc-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Focus Areas</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold dark:bg-black/40 bg-white/60">
                {categoryCounts.focus}
              </span>
            </button>
          </div>

          {/* Clean Topic Tag Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider dark:text-zinc-500 text-slate-400 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-amber-400" />
              Tag:
            </span>

            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              const count = tagCounts[tag] ?? 0;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'dark:bg-amber-400 dark:text-black bg-amber-600 text-white font-bold shadow-xs'
                      : 'dark:bg-[#05070a] bg-slate-100 dark:text-zinc-300 text-slate-700 dark:border-zinc-800 border-slate-200 border hover:border-amber-400/60 hover:text-amber-400'
                  }`}
                >
                  <span>{tag}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'dark:bg-black/30 bg-amber-900/40 text-white'
                        : 'dark:bg-zinc-800 bg-slate-200 dark:text-zinc-400 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Clear Bar (Shown only when active filters exist) */}
        {(selectedCategory !== 'all' || selectedTag !== 'All' || searchQuery.trim()) && (
          <div className="pt-3 border-t dark:border-zinc-800/80 border-slate-200 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[11px] uppercase tracking-wider dark:text-zinc-400 text-slate-500">
              Active:
            </span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full dark:bg-amber-500/15 bg-amber-50 dark:border-amber-500/40 border-amber-300 border dark:text-amber-300 text-amber-800 text-xs font-bold">
                <span>Category: {selectedCategory === 'module' ? 'Curriculum' : 'Focus Areas'}</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-red-400 cursor-pointer"
                  title="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedTag !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full dark:bg-amber-500/15 bg-amber-50 dark:border-amber-500/40 border-amber-300 border dark:text-amber-300 text-amber-800 text-xs font-bold">
                <span>Tag: #{selectedTag}</span>
                <button
                  onClick={() => setSelectedTag('All')}
                  className="hover:text-red-400 cursor-pointer"
                  title="Remove topic filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full dark:bg-amber-500/15 bg-amber-50 dark:border-amber-500/40 border-amber-300 border dark:text-amber-300 text-amber-800 text-xs font-bold">
                <span>Query: &ldquo;{searchQuery.trim()}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-400 cursor-pointer"
                  title="Remove search query"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="ml-auto text-xs font-mono dark:text-zinc-400 text-slate-500 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Active filter count status */}
      <div className="flex items-center justify-between text-xs font-mono dark:text-zinc-400 text-slate-500 px-1">
        <span>
          Showing <strong className="dark:text-amber-400 text-amber-700">{filteredItems.length}</strong> of {RESEARCH_ITEMS.length} research projects
          {selectedCategory !== 'all' && (
            <span> in <strong className="dark:text-white text-slate-800">{selectedCategory === 'module' ? 'Curriculum' : 'Focus Areas'}</strong></span>
          )}
          {selectedTag !== 'All' && <span> under <strong className="dark:text-white text-slate-800">#{selectedTag}</strong></span>}
          {searchQuery.trim() && <span> matching &ldquo;<strong className="dark:text-amber-300 text-amber-700">{searchQuery.trim()}</strong>&rdquo;</span>}
        </span>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-12 text-center dark:bg-[#10141b] bg-white border border-dashed dark:border-zinc-800 border-slate-300 rounded-xl space-y-3">
          <Filter className="w-8 h-8 text-zinc-500 mx-auto" />
          <h4 className="font-orbitron font-bold dark:text-white text-slate-900 text-base">No Matching Research Projects</h4>
          <p className="font-mono text-xs dark:text-zinc-400 text-slate-600 max-w-md mx-auto">
            No research projects matched your current search &ldquo;{searchQuery}&rdquo; and category/tag criteria.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 rounded dark:bg-zinc-800 bg-slate-200 dark:hover:bg-zinc-700 hover:bg-slate-300 dark:text-white text-slate-800 font-mono text-xs font-bold cursor-pointer transition-colors"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={resetFilters}
              className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold cursor-pointer transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Research Modules (Accordions) */}
          {modules.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="font-section-title text-lg sm:text-xl font-bold uppercase tracking-wider dark:text-white text-slate-900 flex items-center">
                  <span className="dark:text-[#00ff41] text-emerald-600 font-mono mr-2 select-none">//</span>
                  <span>Core Curriculum &amp; Research Modules (I &ndash; IV)</span>
                </h3>
                <span className="text-xs font-mono dark:text-zinc-400 text-slate-500 hidden sm:inline">
                  {modules.length} {modules.length === 1 ? 'module' : 'modules'}
                </span>
              </div>
              {modules.map((item) => {
                const isOpen = openAccordions[item.id] ?? false;
                const isCopied = copiedId === item.id;

                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`overflow-hidden rounded-lg border transition-all duration-300 ${
                      isOpen
                        ? 'dark:bg-[#121b24]/90 bg-sky-50/80 dark:border-[#00ff41] border-sky-600 shadow-sm'
                        : 'dark:bg-[#141414]/70 bg-white dark:border-[#333333] border-slate-200 hover:border-sky-500 shadow-sm'
                    }`}
                  >
                    <h3>
                      <div
                        onClick={() => toggleAccordion(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleAccordion(item.id);
                          }
                        }}
                        aria-expanded={isOpen}
                        className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer group select-none"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap flex-1 mr-3">
                          <span className="font-orbitron font-bold text-sm dark:text-[#00b8ff] text-sky-700 w-6 flex-none">
                            {item.numeral}
                          </span>
                          <span className="font-bold text-sm sm:text-base dark:text-white text-slate-900 group-hover:text-sky-700 dark:group-hover:text-[#00ff41] transition-colors">
                            <HighlightText text={item.title} query={searchQuery} />
                          </span>

                          {/* Item Tags */}
                          <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                onClick={(e) => handleTagClick(t, e)}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                                  selectedTag === t
                                    ? 'dark:bg-[#00ff41]/20 dark:border-[#00ff41] border-emerald-600 dark:text-[#00ff41] text-emerald-800 font-bold'
                                    : 'dark:bg-black/40 bg-slate-100 dark:border-zinc-800 border-slate-200 dark:text-zinc-400 text-slate-600 hover:border-sky-500'
                                }`}
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-none">
                          {/* Share Button for Module */}
                          <button
                            type="button"
                            onClick={(e) => handleShare(item, e)}
                            title={`Copy project link for ${item.title}`}
                            aria-label={`Share ${item.title}`}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                              isCopied
                                ? 'dark:bg-[#00ff41]/20 bg-emerald-100 dark:text-[#00ff41] text-emerald-800 border dark:border-[#00ff41] border-emerald-500 font-bold shadow-xs'
                                : 'dark:bg-zinc-900/80 bg-slate-100 dark:hover:bg-zinc-800 hover:bg-slate-200 dark:text-zinc-300 text-slate-700 dark:border-zinc-700 border-slate-300 hover:border-sky-500 dark:hover:text-[#00b8ff] hover:text-sky-700 border'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 dark:text-[#00ff41] text-emerald-700" />
                                <span className="hidden sm:inline">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Share2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Share</span>
                              </>
                            )}
                          </button>

                          <ChevronDown
                            className={`w-5 h-5 dark:text-[#00ff41] text-sky-700 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </h3>

                    {isOpen && (
                      <div className="px-5 pb-6 pt-1 text-sm dark:text-zinc-300 text-slate-700 font-mono leading-relaxed border-t dark:border-zinc-800 border-slate-200 space-y-4">
                        <p>
                          <HighlightText text={item.desc} query={searchQuery} />
                        </p>

                        {/* Module-Specific Content */}
                        {item.id === 'mod-1' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-3 dark:bg-black/40 bg-white border dark:border-zinc-800 border-slate-200 rounded shadow-xs">
                              <div className="text-xs font-bold dark:text-[#00b8ff] text-sky-700 uppercase mb-1">
                                Multiaxial Life Models
                              </div>
                              <p className="text-xs dark:text-zinc-400 text-slate-600">
                                Critical plane approaches combined with Findley &amp; Brown-Miller criteria for non-proportional cycle counting.
                              </p>
                            </div>
                            <div className="p-3 dark:bg-black/40 bg-white border dark:border-zinc-800 border-slate-200 rounded shadow-xs">
                              <div className="text-xs font-bold dark:text-[#00ff41] text-emerald-700 uppercase mb-1">
                                Abaqus Subroutines
                              </div>
                              <p className="text-xs dark:text-zinc-400 text-slate-600">
                                Implementation of custom cyclic damage accumulation subroutines and cohesive element degradation.
                              </p>
                            </div>
                          </div>
                        )}

                        {item.id === 'mod-2' && (
                          <div className="p-3 dark:bg-black/40 bg-white border dark:border-zinc-800 border-slate-200 rounded shadow-xs">
                            <div className="text-xs font-bold dark:text-[#00ff41] text-emerald-700 uppercase mb-1">
                              High-Rate Viscoelasticity
                            </div>
                            <p className="text-xs dark:text-zinc-400 text-slate-600">
                              Nonlinear Ogden and Mooney-Rivlin hyperelastic formulations coupled with Prony series relaxation spectra to quantify localized cellular shears under blast overpressures.
                            </p>
                          </div>
                        )}

                        {item.id === 'mod-3' && (
                          <div className="p-4 sm:p-5 dark:bg-[#0b1016] bg-white border dark:border-[#00b8ff]/30 border-slate-300 rounded-xl space-y-4 shadow-sm">
                            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b dark:border-[#00b8ff]/20 border-slate-200">
                              <h4 className="font-section-title font-bold text-base sm:text-lg dark:text-[#00b8ff] text-sky-700 flex items-center uppercase tracking-wide">
                                <span className="dark:text-[#00ff41] text-emerald-600 font-mono mr-2 select-none">//</span>
                                <span>Research Environment: AntiPrism Structures</span>
                              </h4>
                              <span className="text-xs dark:text-zinc-400 text-slate-500 font-mono">
                                Select a tutorial part from the playlist below
                              </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div className="lg:col-span-2 bg-black border dark:border-zinc-800 border-slate-800 rounded-lg p-3 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-zinc-800">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs sm:text-sm text-[#00b8ff] flex items-center gap-2">
                                      <Play className="w-3.5 h-3.5 text-[#00ff41]" />
                                      {currentVideo.title}
                                    </span>
                                    {currentVideo.duration && (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                                        {currentVideo.duration}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <a
                                      href={currentVideo.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-[#00b8ff] hover:text-sky-300 hover:underline flex items-center gap-1 font-mono"
                                      title="Open in Google Drive"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                      <span>Drive View</span>
                                    </a>
                                    <a
                                      href={currentVideo.downloadUrl || currentVideo.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-[#00ff41] hover:text-emerald-300 hover:underline flex items-center gap-1 font-mono"
                                      title="Download video file"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      <span>Download</span>
                                    </a>
                                  </div>
                                </div>

                                <div className="relative aspect-video bg-zinc-950 rounded-lg overflow-hidden border border-zinc-900 shadow-inner">
                                  <iframe
                                    key={currentVideo.id}
                                    src={currentVideo.embedUrl || `https://drive.google.com/file/d/${currentVideo.driveId}/preview`}
                                    title={currentVideo.title}
                                    className="w-full h-full border-0 rounded-lg bg-black"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                  />
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-xs">
                                  <p className="text-zinc-400 flex-1">
                                    {currentVideo.description}
                                  </p>
                                  <a
                                    href={GOOGLE_DRIVE_VIDEOS_FOLDER}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#00ff41] transition-colors shrink-0"
                                  >
                                    <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Folder Source</span>
                                  </a>
                                </div>
                              </div>

                              <div className="dark:bg-[#0f0f0f]/90 bg-slate-50 border dark:border-zinc-800 border-slate-200 rounded-lg p-3 space-y-2.5 flex flex-col justify-between">
                                <div>
                                  <h5 className="font-section-title font-bold text-xs uppercase tracking-wider dark:text-[#00ff41] text-emerald-700 pb-2 border-b dark:border-zinc-800 border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="text-[#00b8ff] font-mono mr-1.5 select-none">//</span>
                                      <span>Video Playlist</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 font-normal">2 Parts</span>
                                  </h5>

                                  <div className="space-y-2 mt-2.5">
                                    {ANTIPRISM_VIDEOS.map((video) => {
                                      const isSelected = currentVideo.id === video.id;
                                      return (
                                        <button
                                          key={video.id}
                                          onClick={() => setCurrentVideo(video)}
                                          className={`w-full p-2.5 rounded text-left transition-all text-xs font-mono flex items-start gap-2.5 border-l-3 cursor-pointer ${
                                            isSelected
                                              ? 'dark:bg-[#00ff41]/10 bg-emerald-100 dark:border-[#00ff41] border-emerald-600 dark:text-[#00ff41] text-emerald-900 font-bold shadow-xs'
                                              : 'dark:bg-zinc-900/60 bg-white dark:border-zinc-700 border-slate-200 dark:text-zinc-300 text-slate-700 hover:border-sky-500 hover:bg-sky-50'
                                          }`}
                                        >
                                          <span className="font-orbitron text-[11px] opacity-75 shrink-0">
                                            0{video.part}
                                          </span>
                                          <div className="flex-1 min-w-0">
                                            <div className="truncate">{video.title}</div>
                                            <div className="text-[10px] dark:text-zinc-400 text-slate-500 font-normal line-clamp-1 mt-0.5">
                                              {video.duration || video.description}
                                            </div>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="space-y-2 mt-3 pt-2 border-t dark:border-zinc-800/80 border-slate-200">
                                  <a
                                    href={GOOGLE_DRIVE_VIDEOS_FOLDER}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2 px-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center gap-2 text-[11px] font-mono transition-colors"
                                  >
                                    <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Browse Drive Folder</span>
                                    <ExternalLink className="w-3 h-3 text-zinc-400 ml-auto" />
                                  </a>

                                  <div className="p-2.5 dark:bg-black/60 bg-white border dark:border-zinc-800/80 border-slate-200 rounded text-[11px] dark:text-zinc-400 text-slate-600 space-y-1 shadow-xs">
                                    <div className="dark:text-zinc-200 text-slate-900 font-bold">Simulation Notes:</div>
                                    <div>• Explicit dynamic analysis via Abaqus 2024</div>
                                    <div>• Automated python scripting for unit cell parametrization</div>
                                    <div className="text-[10px] text-[#00ff41] pt-0.5 font-mono">✓ High-res streaming enabled</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.id === 'mod-4' && (
                          <div className="p-3 dark:bg-black/40 bg-white border dark:border-zinc-800 border-slate-200 rounded shadow-xs">
                            <div className="text-xs font-bold dark:text-[#00b8ff] text-sky-700 uppercase mb-1">
                              Crack Bridging &amp; Cohesive Laws
                            </div>
                            <p className="text-xs dark:text-zinc-400 text-slate-600">
                              Experimental Digital Image Correlation (DIC) synchronized with bilinear softening traction-separation laws to capture progressive fiber pull-out and tortuous matrix microcracking.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Primary Research Focus Cards */}
          {focusAreas.length > 0 && (
            <div className={modules.length > 0 ? "pt-8 border-t dark:border-zinc-800 border-slate-200" : ""}>
              <div className="flex items-center justify-between pb-6">
                <h3 className="font-section-title text-xl sm:text-2xl font-bold uppercase tracking-wider dark:text-white text-slate-900 flex items-center">
                  <span className="dark:text-[#00ff41] text-emerald-600 font-mono mr-2 select-none">//</span>
                  <span>Primary Research Focus Areas</span>
                </h3>
                <span className="text-xs font-mono dark:text-zinc-400 text-slate-500 hidden sm:inline">
                  {focusAreas.length} {focusAreas.length === 1 ? 'focus area' : 'focus areas'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {focusAreas.map((area) => {
                  const isCopied = copiedId === area.id;

                  return (
                    <div
                      key={area.id}
                      id={area.id}
                      className="dark:bg-gradient-to-br dark:from-[#121b24] dark:to-[#0d1218] bg-white border dark:border-[#26333d] border-slate-200 dark:hover:border-[#00b8ff] hover:border-sky-500 rounded-xl p-5 dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)] shadow-md transition-all duration-300 hover:-translate-y-1 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded dark:bg-black/50 bg-sky-50 border dark:border-zinc-800 border-sky-100">
                            {area.title.includes('Sandwich') && <Layers className="w-5 h-5 dark:text-[#00b8ff] text-sky-600" />}
                            {area.title.includes('Bio-inspired') && <Activity className="w-5 h-5 dark:text-[#00ff41] text-emerald-600" />}
                            {area.title.includes('Computational') && <Cpu className="w-5 h-5 dark:text-[#36c7ff] text-sky-600" />}
                          </div>

                          {/* Tags */}
                          <div className="flex items-center gap-1 flex-wrap justify-end">
                            {area.tags.map((t) => (
                              <button
                                key={t}
                                onClick={() => setSelectedTag(t)}
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full border cursor-pointer transition-colors ${
                                  selectedTag === t
                                    ? 'dark:bg-[#00ff41]/20 dark:border-[#00ff41] border-emerald-600 dark:text-[#00ff41] text-emerald-800 font-bold'
                                    : 'dark:bg-black/40 bg-slate-100 dark:border-zinc-800 border-slate-200 dark:text-zinc-400 text-slate-600 hover:border-sky-500'
                                }`}
                              >
                                #{t}
                              </button>
                            ))}
                          </div>
                        </div>

                        <h4 className="font-orbitron font-bold text-sm sm:text-base dark:text-white text-slate-900">
                          <HighlightText text={area.title} query={searchQuery} />
                        </h4>

                        <p className="text-xs sm:text-sm dark:text-zinc-300 text-slate-600 font-mono leading-relaxed">
                          <HighlightText text={area.desc} query={searchQuery} />
                        </p>
                      </div>

                      <div className="pt-3 border-t dark:border-zinc-800/80 border-slate-100 flex items-center justify-between gap-3 mt-auto">
                        {area.highlight ? (
                          <div className="flex items-center gap-1.5 text-[11px] dark:text-[#00ff41] text-emerald-700 font-semibold line-clamp-1 flex-1">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-none" />
                            <span className="truncate">
                              <HighlightText text={area.highlight} query={searchQuery} />
                            </span>
                          </div>
                        ) : (
                          <div className="flex-1" />
                        )}

                        {/* Share Button for Focus Area Card */}
                        <button
                          type="button"
                          onClick={(e) => handleShare(area, e)}
                          title={`Copy project link for ${area.title}`}
                          aria-label={`Share ${area.title}`}
                          className={`px-2.5 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all duration-200 cursor-pointer flex-none ${
                            isCopied
                              ? 'dark:bg-[#00ff41]/20 bg-emerald-100 dark:text-[#00ff41] text-emerald-800 border dark:border-[#00ff41] border-emerald-500 font-bold shadow-xs'
                              : 'dark:bg-black/40 bg-slate-100 dark:hover:bg-zinc-800 hover:bg-slate-200 dark:text-zinc-300 text-slate-700 dark:border-zinc-700 border-slate-300 hover:border-sky-500 dark:hover:text-[#00b8ff] hover:text-sky-700 border'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 dark:text-[#00ff41] text-emerald-700" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Visual Timeline Component: Key Project Developmental Milestones */}
      <ResearchMilestoneTimeline />

      {/* GitHub Statistics & Open-Source Repositories Activity Widget */}
      <GitHubStatsWidget onNotify={onNotify} />

      {/* Standalone / Fallback Toast Notification */}
      {toastNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-xl font-mono text-xs shadow-2xl transition-all duration-300 max-w-md dark:bg-[#0c131c] bg-white border dark:border-[#00ff41] border-emerald-500 text-slate-900 dark:text-white dark:shadow-[0_0_25px_rgba(0,255,65,0.3)] shadow-lg"
        >
          <div className="p-1 rounded-full dark:bg-[#00ff41]/20 bg-emerald-100 dark:text-[#00ff41] text-emerald-700 flex-none mt-0.5">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="font-bold font-orbitron dark:text-[#00ff41] text-emerald-700 text-xs tracking-wide">
              PROJECT LINK COPIED
            </div>
            <p className="dark:text-zinc-200 text-slate-700 text-[11px] font-medium line-clamp-1">
              {toastNotification.title}
            </p>
            <p className="dark:text-zinc-500 text-slate-400 text-[10px] truncate max-w-xs">
              {toastNotification.link}
            </p>
          </div>
          <button
            onClick={() => setToastNotification(null)}
            className="dark:text-zinc-400 text-slate-400 hover:text-red-500 cursor-pointer p-0.5"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

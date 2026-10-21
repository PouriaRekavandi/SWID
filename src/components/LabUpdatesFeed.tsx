import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LabUpdate, LabUpdateCategory } from '../types';
import { INITIAL_LAB_UPDATES } from '../data/initialData';
import {
  Sparkles,
  Search,
  RefreshCw,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Share2,
  Calendar,
  User,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Check,
  AlertCircle,
  FileText,
  Award,
  FlaskConical,
  Cpu,
  Presentation,
  Terminal,
} from 'lucide-react';

interface LabUpdatesFeedProps {
  onNotify?: (message: string, isError?: boolean) => void;
  maxInitialCount?: number;
  compactMode?: boolean;
}

const STORAGE_BOOKMARKS_KEY = 'swid_shrk_bookmarked_updates';
const STORAGE_CUSTOM_UPDATES_KEY = 'swid_shrk_custom_updates';

export const LabUpdatesFeed: React.FC<LabUpdatesFeedProps> = ({
  onNotify,
  maxInitialCount,
  compactMode = false,
}) => {
  const [updates, setUpdates] = useState<LabUpdate[]>(INITIAL_LAB_UPDATES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<LabUpdateCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState<boolean>(false);

  // Expanded items state (IDs of expanded cards for full details)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
        if (saved) return new Set(JSON.parse(saved));
      }
    } catch {
      // Storage unavailable in sandbox
    }
    return new Set();
  });

  // Modal for new update
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LabUpdate['category']>('milestone');
  const [newSummary, setNewSummary] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [newLead, setNewLead] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newUrlLabel, setNewUrlLabel] = useState('');
  const [newTags, setNewTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch updates from API with fallback to INITIAL_LAB_UPDATES + custom stored
  const loadUpdates = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setFetchError(null);

    let customLocalUpdates: LabUpdate[] = [];
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_CUSTOM_UPDATES_KEY);
        if (stored) {
          customLocalUpdates = JSON.parse(stored);
        }
      }
    } catch {
      // Ignore storage errors
    }

    try {
      // Attempt API fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/updates', {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.updates) && data.updates.length > 0) {
          // Merge API updates with any local custom items that might not have reached server
          const apiMap = new Map<string, LabUpdate>();
          data.updates.forEach((u: LabUpdate) => apiMap.set(u.id, u));
          customLocalUpdates.forEach((u) => {
            if (!apiMap.has(u.id)) apiMap.set(u.id, u);
          });
          const merged = Array.from(apiMap.values());
          setUpdates(merged);
          setLastSyncTime(new Date());
          if (isRefresh && onNotify) {
            onNotify(`Refreshed ${merged.length} research milestones.`);
          }
          return;
        }
      }
    } catch {
      // Offline, static host (e.g. GitHub Pages), or timeout
      // Gracefully fall back to local seed data
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }

    // Fallback: merge initial seed data with any custom local items
    const merged = [...customLocalUpdates, ...INITIAL_LAB_UPDATES];
    // Deduplicate by id
    const uniqueMap = new Map<string, LabUpdate>();
    merged.forEach((item) => uniqueMap.set(item.id, item));
    const finalItems = Array.from(uniqueMap.values());

    setUpdates(finalItems);
    setLastSyncTime(new Date());
    if (isRefresh && onNotify) {
      onNotify(`Feed refreshed with latest milestones.`);
    }
  }, [onNotify]);

  useEffect(() => {
    loadUpdates(false);
  }, [loadUpdates]);

  // Save bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      const isRemoving = next.has(id);
      if (isRemoving) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(Array.from(next)));
        }
      } catch {
        // Ignore
      }
      if (onNotify) {
        onNotify(isRemoving ? 'Removed from saved research milestones' : 'Saved to your reading list');
      }
      return next;
    });
  };

  const toggleExpand = (id: string) => {
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

  const handleShare = async (update: LabUpdate, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const shareText = `${update.title} — SWID-SHRK Research Lab (Lead: ${update.leadResearcher})\n${update.summary}`;
    const shareUrl = update.externalUrl || window.location.href;

    if (navigator.share && navigator.canShare && navigator.canShare({ title: update.title, url: shareUrl })) {
      try {
        await navigator.share({
          title: update.title,
          text: update.summary,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${update.title}\n${shareUrl}`);
        if (onNotify) onNotify('Research milestone link copied to clipboard');
      }
    } catch {
      if (onNotify) onNotify('Unable to copy to clipboard', true);
    }
  };

  // Submit new milestone
  const handleSubmitNewUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) {
      if (onNotify) onNotify('Please provide both a title and summary', true);
      return;
    }

    setIsSubmitting(true);
    const categoryLabels: Record<LabUpdate['category'], string> = {
      grant: 'Grant Award',
      publication: 'Journal Publication',
      experiment: 'Experimental Trial',
      simulation: 'Computational & FEA',
      conference: 'Conference & Talk',
      milestone: 'Lab Milestone',
    };

    const newItem: LabUpdate = {
      id: `upd-${Date.now()}`,
      title: newTitle.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isoDate: new Date().toISOString().split('T')[0],
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || 'Lab Milestone',
      summary: newSummary.trim(),
      fullDetails: newDetails.trim() || undefined,
      leadResearcher: newLead.trim() || 'SWID-SHRK Research Lab',
      externalUrl: newUrl.trim() || undefined,
      externalUrlLabel: newUrlLabel.trim() || (newUrl ? 'External Reference' : undefined),
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: false,
    };

    // Optimistically prepend
    setUpdates((prev) => [newItem, ...prev]);

    // Save locally
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_CUSTOM_UPDATES_KEY);
        const existing: LabUpdate[] = stored ? JSON.parse(stored) : [];
        localStorage.setItem(STORAGE_CUSTOM_UPDATES_KEY, JSON.stringify([newItem, ...existing]));
      }
    } catch {
      // Ignore storage error
    }

    // Try posting to backend
    try {
      await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
    } catch {
      // Offline / static is fine; already in local state
    }

    setIsSubmitting(false);
    setIsSubmitModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewDetails('');
    setNewLead('');
    setNewUrl('');
    setNewUrlLabel('');
    setNewTags('');

    if (onNotify) {
      onNotify('New research update dispatched to feed');
    }
  };

  // Filter & sort logic
  const filteredUpdates = useMemo(() => {
    return updates
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        // Bookmark filter
        if (showOnlyBookmarked && !bookmarkedIds.has(item.id)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchSummary = item.summary.toLowerCase().includes(q);
          const matchLead = item.leadResearcher.toLowerCase().includes(q);
          const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
          const matchCategory = item.categoryLabel.toLowerCase().includes(q);
          if (!matchTitle && !matchSummary && !matchLead && !matchTags && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.isoDate || a.date).getTime() || 0;
        const dateB = new Date(b.isoDate || b.date).getTime() || 0;
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [updates, selectedCategory, showOnlyBookmarked, bookmarkedIds, searchQuery, sortOrder]);

  const displayedUpdates = useMemo(() => {
    if (maxInitialCount && maxInitialCount > 0) {
      return filteredUpdates.slice(0, maxInitialCount);
    }
    return filteredUpdates;
  }, [filteredUpdates, maxInitialCount]);

  const categories: { key: LabUpdateCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Dispatches', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: 'grant', label: 'Grants & Awards', icon: <Award className="w-3.5 h-3.5" /> },
    { key: 'publication', label: 'Publications', icon: <FileText className="w-3.5 h-3.5" /> },
    { key: 'experiment', label: 'Experiments', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { key: 'simulation', label: 'Computational & FEA', icon: <Cpu className="w-3.5 h-3.5" /> },
    { key: 'conference', label: 'Conferences', icon: <Presentation className="w-3.5 h-3.5" /> },
    { key: 'milestone', label: 'Open Tooling', icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="space-y-8" aria-label="Lab Updates Feed">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b dark:border-zinc-800 border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider dark:text-[#00ff41] text-emerald-700 mb-1.5">
            <span>Research Feed</span>
            <span aria-hidden="true">·</span>
            <span>Live Milestones</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Sync</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 tracking-tight">
            Lab Updates &amp; Research Milestones
          </h2>
          <p className="dark:text-zinc-400 text-slate-600 text-sm mt-1 max-w-2xl font-sans">
            Chronological log of peer-reviewed articles, NSF research grants, dynamic high-rate tissue experiments, and open-source FEA subroutines from SWID-SHRK.
          </p>
        </div>

        {/* Action Controls: Refresh, New Update, Bookmark Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => loadUpdates(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md dark:bg-zinc-900 bg-white dark:text-zinc-200 text-slate-700 border dark:border-zinc-700 border-slate-300 hover:dark:border-[#00ff41] hover:border-emerald-600 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            title="Fetch latest updates from the lab"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#00ff41]' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Feed'}</span>
          </button>

          <button
            onClick={() => setShowOnlyBookmarked((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors shadow-sm cursor-pointer ${
              showOnlyBookmarked
                ? 'dark:bg-[#00ff41]/20 bg-emerald-100 dark:border-[#00ff41] border-emerald-500 dark:text-[#00ff41] text-emerald-800'
                : 'dark:bg-zinc-900 bg-white dark:text-zinc-300 text-slate-700 dark:border-zinc-700 border-slate-300 hover:dark:border-zinc-500'
            }`}
            title="Filter by your saved milestones"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({bookmarkedIds.size})</span>
          </button>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-md dark:bg-[#00ff41] bg-emerald-600 text-black dark:hover:bg-[#00e63a] hover:bg-emerald-700 transition-all shadow-sm cursor-pointer"
            title="Submit a research milestone or lab achievement"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Update</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Interactive Category Segmented Tabs (Compliant with Frontend Constitution: functional buttons with clear active state, no candy pills) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none p-1 dark:bg-zinc-900/60 bg-slate-100 rounded-lg border dark:border-zinc-800 border-slate-200">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'dark:bg-zinc-800 bg-white dark:text-[#00ff41] text-emerald-800 shadow-sm font-semibold'
                    : 'dark:text-zinc-400 text-slate-600 hover:dark:text-white hover:text-slate-900'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and Status bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 dark:text-zinc-500 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, author, or tag..."
              className="w-full pl-8 pr-7 py-2 rounded-md dark:bg-zinc-900/90 bg-white border dark:border-zinc-700 border-slate-300 dark:text-zinc-200 text-slate-800 placeholder-zinc-500 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 dark:text-zinc-400 text-slate-500 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-zinc-400">
            <span className="text-slate-500 dark:text-zinc-500">
              Showing <strong className="dark:text-zinc-200 text-slate-700">{displayedUpdates.length}</strong> of {updates.length} dispatches
            </span>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <button
                onClick={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
                className="hover:dark:text-white hover:text-slate-900 underline underline-offset-2 transition-colors cursor-pointer"
              >
                {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed List */}
      {isLoading ? (
        <div className="py-16 text-center space-y-3 border dark:border-zinc-800 border-slate-200 rounded-xl dark:bg-zinc-950/40 bg-white/40">
          <RefreshCw className="w-6 h-6 mx-auto animate-spin dark:text-[#00ff41] text-emerald-600" />
          <p className="text-xs font-mono dark:text-zinc-400 text-slate-600">
            Loading research milestones and dispatches...
          </p>
        </div>
      ) : displayedUpdates.length === 0 ? (
        <div className="py-16 text-center space-y-4 border dark:border-zinc-800 border-slate-200 rounded-xl dark:bg-zinc-950/40 bg-white/40 px-4">
          <AlertCircle className="w-8 h-8 mx-auto dark:text-zinc-500 text-slate-400" />
          <div className="space-y-1">
            <h3 className="font-semibold text-sm dark:text-zinc-200 text-slate-800">
              No milestones matched your criteria
            </h3>
            <p className="text-xs font-mono dark:text-zinc-500 text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing category filters to view other lab updates.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setShowOnlyBookmarked(false);
            }}
            className="px-3 py-1.5 text-xs font-mono rounded border dark:border-zinc-700 border-slate-300 dark:hover:border-[#00ff41] hover:border-emerald-600 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedUpdates.map((update, index) => {
            const isExpanded = expandedIds.has(update.id);
            const isSaved = bookmarkedIds.has(update.id);
            const isFeatured = update.featured && index === 0 && selectedCategory === 'all' && !searchQuery;

            return (
              <article
                key={update.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isFeatured
                    ? 'dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-zinc-950/90 bg-white dark:border-[#00ff41]/50 border-emerald-400 shadow-md ring-1 ring-emerald-500/20'
                    : 'dark:bg-zinc-900/50 bg-white dark:border-zinc-800 border-slate-200 hover:dark:border-zinc-700 hover:border-slate-300'
                } p-5 sm:p-6 space-y-4`}
              >
                {/* Clean Unboxed Metadata Header (Zero-Pill Discipline: inline typography separated by middle dots) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono dark:text-zinc-400 text-slate-500">
                  <div className="flex flex-wrap items-center gap-2">
                    {isFeatured && (
                      <span className="font-bold dark:text-[#00ff41] text-emerald-700 uppercase tracking-widest text-[11px]">
                        Featured Milestone
                      </span>
                    )}
                    {isFeatured && <span aria-hidden="true">·</span>}
                    <span className="font-semibold dark:text-zinc-300 text-slate-700">
                      {update.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 opacity-70" />
                      <span>{update.date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 opacity-70" />
                      <span>Lead: {update.leadResearcher}</span>
                    </span>
                  </div>

                  {/* Bookmark and Share quick buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => toggleBookmark(update.id, e)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isSaved
                          ? 'dark:text-[#00ff41] text-emerald-700 hover:opacity-80'
                          : 'dark:text-zinc-500 text-slate-400 hover:dark:text-zinc-200 hover:text-slate-800'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save for later'}
                      aria-label="Bookmark milestone"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => handleShare(update, e)}
                      className="p-1.5 rounded dark:text-zinc-500 text-slate-400 hover:dark:text-zinc-200 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Share or copy milestone link"
                      aria-label="Share milestone"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold dark:text-white text-slate-900 tracking-tight leading-snug">
                    {update.title}
                  </h3>
                </div>

                {/* Executive Summary */}
                <p className="text-sm dark:text-zinc-300 text-slate-700 font-sans leading-relaxed">
                  {update.summary}
                </p>

                {/* Quantitative Metric Callouts (if present) */}
                {update.metrics && update.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {update.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-lg dark:bg-black/40 bg-slate-50 border dark:border-zinc-800/80 border-slate-200"
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider dark:text-zinc-400 text-slate-500">
                          {metric.label}
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-bold dark:text-[#00ff41] text-emerald-700 mt-0.5 truncate">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Expandable Technical Synopsis (Full Details) */}
                {update.fullDetails && (
                  <div className="pt-1">
                    {isExpanded && (
                      <div className="p-3.5 rounded-lg dark:bg-black/60 bg-slate-50 border dark:border-zinc-800 border-slate-200 text-xs font-sans dark:text-zinc-300 text-slate-700 space-y-2 mb-3">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider dark:text-[#00b8ff] text-sky-700">
                          Technical Synopsis &amp; Methodology:
                        </div>
                        <p className="leading-relaxed whitespace-pre-line">{update.fullDetails}</p>
                        {update.coResearchers && update.coResearchers.length > 0 && (
                          <div className="text-[11px] font-mono dark:text-zinc-400 text-slate-500 pt-1">
                            Co-Investigators: {update.coResearchers.join(', ')}
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpand(update.id)}
                      className="flex items-center gap-1 text-xs font-mono dark:text-[#00b8ff] text-sky-700 hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide technical abstract' : 'Read technical abstract & FEA details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Footer: Quiet Tags and External Reference Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t dark:border-zinc-800/70 border-slate-100 text-xs">
                  {/* Tags rendered as quiet text separated by middle dots (Zero-pill discipline) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono dark:text-zinc-500 text-slate-500">
                    {update.tags.map((tag, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span>#{tag}</span>
                        {tIdx < update.tags.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* External Resource Action */}
                  {update.externalUrl && (
                    <a
                      href={update.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs dark:text-[#00ff41] text-emerald-700 hover:underline font-semibold"
                    >
                      <span>{update.externalUrlLabel || 'View Document'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Submission Modal for Team Members & Researchers */}
      {isSubmitModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-xl dark:bg-zinc-950 bg-white border dark:border-zinc-800 border-slate-300 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
            <div className="flex items-center justify-between border-b dark:border-zinc-800 border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold dark:text-white text-slate-900">
                  Submit Research Update
                </h3>
                <p className="dark:text-zinc-400 text-slate-500 text-[11px] font-sans">
                  Dispatch a research milestone, manuscript acceptance, or experiment result.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded dark:text-zinc-400 text-slate-500 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewUpdate} className="space-y-3.5">
              <div>
                <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                  Update Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Manuscript Accepted in Journal of Biomechanics"
                  className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as LabUpdate['category'])}
                    className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="grant">Grant &amp; Award</option>
                    <option value="publication">Journal Publication</option>
                    <option value="experiment">Experimental Trial</option>
                    <option value="simulation">Computational &amp; FEA</option>
                    <option value="conference">Conference &amp; Talk</option>
                    <option value="milestone">Lab Milestone / Software</option>
                  </select>
                </div>

                <div>
                  <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                    Lead Researcher
                  </label>
                  <input
                    type="text"
                    value={newLead}
                    onChange={(e) => setNewLead(e.target.value)}
                    placeholder="e.g. Pouria Hejazi Rekavandi"
                    className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                  Executive Summary *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Key discovery, findings, or significance in 2-3 sentences..."
                  className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                />
              </div>

              <div>
                <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                  Technical Abstract / Methodology (Optional)
                </label>
                <textarea
                  rows={3}
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="Detailed equations, constitutive models, element formulations, or test rigs..."
                  className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                    Link URL (DOI / Paper / Grant)
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://doi.org/10.1016/..."
                    className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                    Link Display Label
                  </label>
                  <input
                    type="text"
                    value={newUrlLabel}
                    onChange={(e) => setNewUrlLabel(e.target.value)}
                    placeholder="e.g. Read Paper on ScienceDirect"
                    className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block dark:text-zinc-300 text-slate-700 mb-1 font-semibold">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. FEA, Viscoelasticity, Abaqus, Fracture"
                  className="w-full px-3 py-2 rounded dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-700 border-slate-300 dark:text-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t dark:border-zinc-800 border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded dark:bg-zinc-800 bg-slate-200 dark:text-zinc-300 text-slate-700 hover:dark:bg-zinc-700 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded dark:bg-[#00ff41] bg-emerald-600 text-black font-bold dark:hover:bg-[#00e63a] hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Dispatching...' : 'Publish Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

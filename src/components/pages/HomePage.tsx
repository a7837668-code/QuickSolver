import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Shield,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  LayoutGrid,
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { getAllTools, getPopularTools, getToolBySlug, getToolsByCategory } from '../../data/tools';
import { ToolMetadata } from '../../types';
import { Link, useRouter } from '../../utils/router';
import { IconRenderer } from '../common/IconRenderer';
import { SEOHead } from '../common/SEOHead';
import { getRecentToolSlugs } from '../../utils/recentTools';

interface HomePageProps {
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const { navigate } = useRouter();
  const [heroQuery, setHeroQuery] = useState('');
  const [recentTools, setRecentTools] = useState<ToolMetadata[]>([]);

  const popularTools = getPopularTools();
  const allTools = getAllTools();

  useEffect(() => {
    const recentSlugs = getRecentToolSlugs();
    const resolved = Array.from(
      new Map(
        recentSlugs
          .map(s => getToolBySlug(s))
          .filter((t): t is ToolMetadata => Boolean(t))
          .map(t => [t.id, t])
      ).values()
    );
    setRecentTools(resolved);
  }, []);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroQuery.trim()) {
      onOpenSearch();
    }
  };

  return (
    <div className="w-full">
      <SEOHead
        title="QuickSolve – Free Online Tools & Calculators"
        description="46 free, fast, high-precision online calculators, unit converters, developer utilities, and image optimization tools. Built for accuracy, speed, and privacy."
        canonicalPath="/"
        keywords={[
          'online calculators',
          'free tools',
          'percentage calculator',
          'gpa calculator',
          'emi calculator',
          'age calculator',
          'json formatter',
          'image compressor',
          'unit converter',
        ]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-white dark:from-slate-900/80 dark:via-slate-900/40 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>46 High-Precision Free Online Tools</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Free Everyday Tools{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
              That Just Work
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Fast, accurate everyday calculators, financial models, student grade trackers, developer utilities, and image tools. Instant calculation with 100% client-side privacy.
          </p>

          {/* Big Search Input Trigger */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSearchSubmit}
              onClick={onOpenSearch}
              className="relative flex items-center cursor-pointer group"
            >
              <Search className="w-5 h-5 text-slate-400 absolute left-4 group-hover:text-blue-600 transition-colors" />
              <input
                type="text"
                readOnly
                placeholder="Search any calculator or tool (e.g., percentage, loan, GPA, json, image)..."
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-blue-500 text-slate-800 dark:text-white shadow-lg shadow-blue-500/5 text-sm sm:text-base cursor-pointer focus:outline-none transition-all"
              />
              <span className="absolute right-3.5 px-2.5 py-1 text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                ⌘K or /
              </span>
            </form>
          </div>

          {/* Quick Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Jump:</span>
            {[
              { label: 'Percentage', slug: 'percentage-calculator' },
              { label: 'GPA', slug: 'college-gpa-calculator' },
              { label: 'EMI Loan', slug: 'emi-calculator' },
              { label: 'Age', slug: 'chronological-age-calculator' },
              { label: 'JSON Formatter', slug: 'json-formatter' },
              { label: 'Image Compressor', slug: 'image-compressor' },
            ].map(item => {
              const tool = getToolBySlug(item.slug);
              if (!tool) return null;
              return (
                <Link
                  key={tool.id}
                  to={`/${tool.slug}`}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Recently Used Tools Section */}
        {recentTools.length > 0 && (
          <section aria-labelledby="recent-tools-heading">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 id="recent-tools-heading" className="text-xl font-bold text-slate-900 dark:text-white">
                Recently Used Tools
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTools.map(tool => (
                <Link
                  key={tool.id}
                  to={`/${tool.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-sm transition-all flex items-center gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconRenderer name={tool.icon} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {tool.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section aria-labelledby="categories-heading">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="categories-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
                Browse by Category
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Explore our organized collections of calculators and productivity utilities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                    <IconRenderer name={cat.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{getToolsByCategory(cat.id).length} Tools</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured / Popular Tools Section */}
        <section aria-labelledby="popular-tools-heading">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h2 id="popular-tools-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
              Most Popular Tools
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            The most frequently used calculators and daily utilities on QuickSolve.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map(tool => (
              <Link
                key={tool.id}
                to={`/${tool.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconRenderer name={tool.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Popular
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Complete Directory of 46 Tools */}
        <section aria-labelledby="all-tools-heading">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 id="all-tools-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
              Complete Directory of Tools (46 Available)
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Every tool is completely free, runs instantly in your browser, and saves no private data.
          </p>

          <div className="space-y-10">
            {CATEGORIES.map(cat => {
              const catTools = allTools.filter(t => t.category === cat.id);
              return (
                <div key={cat.id} className="p-6 sm:p-8 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                        <IconRenderer name={cat.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>View category</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {catTools.map(t => (
                      <Link
                        key={t.id}
                        to={`/${t.slug}`}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconRenderer name={t.icon} className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                            {t.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Value Proposition / Architectural Pillars */}
        <section aria-labelledby="why-quicksolve-heading" className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="why-quicksolve-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Why Choose QuickSolve?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Built with precision engineering, clean standards, and zero tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Zero Latency Performance
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculations execute instantly in client memory. No waiting for roundtrip servers or slow APIs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                100% Client-Side Privacy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your financial numbers, student grades, text files, and images are never uploaded to our servers. Complete data privacy.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Verified Mathematical Precision
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every calculation formula adheres to standard financial amortization, GPA scales, and international ISO conversion tables.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

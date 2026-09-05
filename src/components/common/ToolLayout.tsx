import React, { useState } from 'react';
import {
  ChevronRight,
  Share2,
  Check,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ToolMetadata } from '../../types';
import { Link } from '../../utils/router';
import { getCategoryById } from '../../data/categories';
import { getToolBySlug } from '../../data/tools';
import { IconRenderer } from './IconRenderer';
import { SEOHead } from './SEOHead';
import { AdSlot } from './AdSlot';

interface ToolLayoutProps {
  tool: ToolMetadata;
  children: React.ReactNode;
  onReset?: () => void;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children, onReset }) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const category = getCategoryById(tool.category);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${tool.name} – QuickSolve`,
          text: tool.shortDescription,
          url: currentUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      console.error('Failed to copy share link', err);
    }
  };

  // Related tools resolving (deduplicated and excluding current tool)
  const relatedTools = Array.from(
    new Map(
      tool.relatedSlugs
        .filter(slug => slug !== tool.slug && slug !== tool.id)
        .map(slug => getToolBySlug(slug))
        .filter((t): t is ToolMetadata => Boolean(t))
        .map(t => [t.id, t])
    ).values()
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: category?.name || 'Tools', url: `/category/${tool.category}` },
    { name: tool.name, url: `/${tool.slug}` },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <SEOHead
        title={tool.name}
        description={tool.metaDescription}
        canonicalPath={`/${tool.slug}`}
        keywords={tool.tags}
        breadcrumbs={breadcrumbs}
        faqs={tool.faqs}
        type="application"
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/category/${tool.category}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {category?.name || tool.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/60 shadow-xs flex-shrink-0">
            <IconRenderer name={tool.icon} className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {tool.name}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                {category?.name || tool.category}
              </span>
            </div>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {tool.shortDescription}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Reset all inputs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Share this tool"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied Link</span>
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

      {/* Main Interactive Tool Body Card */}
      <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        {children}
      </div>

      <AdSlot slotId="tool-inline-slot" />

      {/* Methodology & Formula Explanation Section */}
      {(tool.formula || tool.calculationLogic) && (
        <section aria-labelledby="methodology-heading" className="mt-12 bg-slate-50/70 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 id="methodology-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              {tool.formulaTitle || 'How This Calculation Works'}
            </h2>
          </div>

          {tool.formula && (
            <div className="mb-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-sm text-blue-700 dark:text-blue-300 overflow-x-auto">
              {tool.formula}
            </div>
          )}

          {tool.calculationLogic && tool.calculationLogic.length > 0 && (
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Calculation Logic &amp; Steps
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                {tool.calculationLogic.map((logic, idx) => (
                  <li key={idx}>{logic}</li>
                ))}
              </ul>
            </div>
          )}

          {tool.assumptions && tool.assumptions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Notes &amp; Boundary Conditions: </span>
              {tool.assumptions.join(' ')}
            </div>
          )}
        </section>
      )}

      {/* Frequently Asked Questions (FAQ) Section */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 id="faq-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-slate-400 font-bold text-lg transform transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Tools Internal Linking Section */}
      {relatedTools.length > 0 && (
        <section aria-labelledby="related-tools-heading" className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 id="related-tools-heading" className="text-xl font-bold text-slate-900 dark:text-white">
                Related Tools &amp; Calculators
              </h2>
            </div>
            <Link
              to={`/category/${tool.category}`}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View all in {category?.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map(rel => (
              <Link
                key={rel.id}
                to={`/${rel.slug}`}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconRenderer name={rel.icon} className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {rel.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open tool</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

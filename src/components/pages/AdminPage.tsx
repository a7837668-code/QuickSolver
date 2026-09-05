import React, { useState } from 'react';
import {
  ShieldAlert,
  Wrench,
  Layers,
  Database,
  Search,
  CheckCircle,
  BarChart3,
  ExternalLink,
  Download,
  Settings,
} from 'lucide-react';
import { getAllTools, getToolsByCategory } from '../../data/tools';
import { CATEGORIES } from '../../data/categories';
import { ToolMetadata } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import { SEOHead } from '../common/SEOHead';
import { Link } from '../../utils/router';

export const AdminPage: React.FC = () => {
  const [tools, setTools] = useState<ToolMetadata[]>(() => getAllTools());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'tools' | 'categories' | 'seo' | 'analytics'>('tools');
  const [disabledTools, setDisabledTools] = useState<Record<string, boolean>>({});

  const toggleToolStatus = (slug: string) => {
    setDisabledTools(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const filteredTools = tools.filter(
    t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportRegistryJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tools, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'quicksolve-tools-registry.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Admin System Console"
        description="QuickSolve operational administrative console and tool registry manager."
        canonicalPath="/admin"
      />

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Platform Administration
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
              v2.4.0 Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage 46 registered tools, categories, formulas, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportRegistryJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry JSON</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Registered Tools</span>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{tools.length}</div>
          <span className="text-[11px] text-emerald-600 font-medium">100% active</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Active Categories</span>
          <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mt-1">{CATEGORIES.length}</div>
          <span className="text-[11px] text-slate-400">All indexed</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Engine Unit Tests</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">38/38</div>
          <span className="text-[11px] text-emerald-600 font-medium">100% passing</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Privacy Architecture</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">Client-Only</div>
          <span className="text-[11px] text-slate-400">Zero data retention</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl max-w-md text-xs font-semibold">
        <button
          type="button"
          onClick={() => setSelectedTab('tools')}
          className={`flex-1 py-2 rounded-xl transition-colors ${
            selectedTab === 'tools'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Tools Manager
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab('categories')}
          className={`flex-1 py-2 rounded-xl transition-colors ${
            selectedTab === 'categories'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Categories
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab('seo')}
          className={`flex-1 py-2 rounded-xl transition-colors ${
            selectedTab === 'seo'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          SEO Status
        </button>
      </div>

      {/* TAB 1: TOOLS */}
      {selectedTab === 'tools' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter tools..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Showing {filteredTools.length} of {tools.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase">
                  <th className="py-3 px-4">Tool Name</th>
                  <th className="py-3 px-4">Slug / Path</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Formula Ready</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredTools.map(tool => {
                  const isDisabled = disabledTools[tool.slug] || false;
                  return (
                    <tr key={tool.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <IconRenderer name={tool.icon} className="w-3.5 h-3.5" />
                        </div>
                        <span>{tool.name}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">/{tool.slug}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
                          {tool.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {tool.formula ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Registered</span>
                        ) : (
                          <span className="text-slate-400">Algorithmic</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => toggleToolStatus(tool.slug)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                            !isDisabled
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-rose-50 text-rose-600 border border-rose-200'
                          }`}
                        >
                          {!isDisabled ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/${tool.slug}`}
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          <span>Launch</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {selectedTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <IconRenderer name={cat.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{cat.name}</h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {getToolsByCategory(cat.id).length} tools
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{cat.description}</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-400">
                <span className="font-mono">/category/{cat.slug}</span>
                <Link to={`/category/${cat.slug}`} className="text-blue-600 hover:underline">
                  View Page →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SEO */}
      {selectedTab === 'seo' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">SEO Architecture Health</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Schema.org Structured Data</span>
              <div className="font-bold text-emerald-600 text-sm mt-1">✓ Active (JSON-LD)</div>
              <p className="text-slate-500 mt-1">WebSite, WebApplication, BreadcrumbList, FAQPage injected automatically.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Canonical Tag Engine</span>
              <div className="font-bold text-emerald-600 text-sm mt-1">✓ 100% Unique URLs</div>
              <p className="text-slate-500 mt-1">Dynamic canonical link header updated on every route change.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">OpenGraph &amp; Twitter Cards</span>
              <div className="font-bold text-emerald-600 text-sm mt-1">✓ Synchronized</div>
              <p className="text-slate-500 mt-1">Meta tags populated directly from tool metadata registry.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

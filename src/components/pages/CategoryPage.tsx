import React, { useState } from 'react';
import { ChevronRight, Search, ArrowRight, Layers } from 'lucide-react';
import { getCategoryBySlug } from '../../data/categories';
import { getToolsByCategory } from '../../data/tools';
import { Link } from '../../utils/router';
import { IconRenderer } from '../common/IconRenderer';
import { SEOHead } from '../common/SEOHead';

interface CategoryPageProps {
  categorySlug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Category Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested category does not exist.</p>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const allTools = getToolsByCategory(category.id);
  const tools = allTools.filter(
    t =>
      t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${category.slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <SEOHead
        title={`${category.name} Calculators & Tools`}
        description={category.description}
        canonicalPath={`/category/${category.slug}`}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">{category.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/60 shadow-xs flex-shrink-0">
            <IconRenderer name={category.icon} className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {category.name}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                {allTools.length} Tools
              </span>
            </div>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Filter within category */}
        <div className="relative w-full md:w-64 flex-shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            placeholder={`Filter ${category.name}...`}
            className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <Link
            key={tool.id}
            to={`/${tool.slug}`}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <IconRenderer name={tool.icon} className="w-5 h-5" />
                </div>
                {tool.popular && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    Popular
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {tool.shortDescription}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Open Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="font-medium">No tools found matching "{filterQuery}" in {category.name}.</p>
        </div>
      )}
    </div>
  );
};

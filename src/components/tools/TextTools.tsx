import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import {
  analyzeText,
  convertCase,
  removeDuplicateLines,
  sortLines,
  cleanText,
  generateSlug,
} from '../../utils/calculations/text';

interface TextToolsProps {
  toolSlug: string;
}

export const TextTools: React.FC<TextToolsProps> = ({ toolSlug }) => {
  const [text, setText] = useState<string>(
    'The quick brown fox jumps over the lazy dog. QuickSolve provides 46 free online tools designed for maximum accuracy, zero latency, and 100% privacy.'
  );

  // Case Converter mode
  const [caseType, setCaseType] = useState<
    'lower' | 'upper' | 'title' | 'sentence' | 'camel' | 'kebab' | 'snake' | 'constant'
  >('title');

  // Duplicate lines options
  const [dupCaseSensitive, setDupCaseSensitive] = useState<boolean>(true);
  const [dupTrim, setDupTrim] = useState<boolean>(true);

  // Sorter options
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'length_asc' | 'length_desc' | 'reverse'>('asc');
  const [sortCaseSensitive, setSortCaseSensitive] = useState<boolean>(false);

  // Cleaner options
  const [cleanExtraSpaces, setCleanExtraSpaces] = useState<boolean>(true);
  const [cleanEmptyLines, setCleanEmptyLines] = useState<boolean>(true);
  const [cleanStripHtml, setCleanStripHtml] = useState<boolean>(false);
  const [cleanTrimLines, setCleanTrimLines] = useState<boolean>(true);

  // Slug options
  const [slugSeparator, setSlugSeparator] = useState<string>('-');
  const [slugLowercase, setSlugLowercase] = useState<boolean>(true);

  const stats = analyzeText(text);

  // 1. Word Counter / Character Counter / Sentence Counter / Reading Time
  if (
    toolSlug === 'word-counter' ||
    toolSlug === 'character-counter' ||
    toolSlug === 'sentence-counter' ||
    toolSlug === 'reading-time-calculator'
  ) {
    return (
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Words</span>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">{stats.words.toLocaleString()}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Characters</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{stats.charactersWithSpaces.toLocaleString()}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Without Spaces</span>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{stats.charactersNoSpaces.toLocaleString()}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Sentences</span>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{stats.sentences.toLocaleString()}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Reading Time</span>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">{stats.readingTimeMinutes} min</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Speaking Time</span>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">{stats.speakingTimeMinutes} min</div>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Type or Paste Text Below
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setText('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
              <CopyButton text={text} size="sm" />
            </div>
          </div>
          <textarea
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start typing or paste your content here to analyze in real time..."
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-sans text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
          />
        </div>
      </div>
    );
  }

  // 2. Case Converter
  if (toolSlug === 'case-converter') {
    const converted = convertCase(text, caseType);

    return (
      <div className="space-y-6">
        {/* Buttons for cases */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'upper', label: 'UPPERCASE' },
            { id: 'lower', label: 'lowercase' },
            { id: 'title', label: 'Title Case' },
            { id: 'sentence', label: 'Sentence case' },
            { id: 'camel', label: 'camelCase' },
            { id: 'kebab', label: 'kebab-case' },
            { id: 'snake', label: 'snake_case' },
            { id: 'constant', label: 'CONSTANT_CASE' },
          ].map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCaseType(c.id as any)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                caseType === c.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Input Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Input Text
            </label>
            <textarea
              rows={8}
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Converted Output
              </label>
              <CopyButton text={converted} size="sm" />
            </div>
            <textarea
              rows={8}
              readOnly
              value={converted}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. Remove Duplicate Lines
  if (toolSlug === 'remove-duplicate-lines') {
    const res = removeDuplicateLines(text, { caseSensitive: dupCaseSensitive, trimLines: dupTrim });
    const originalLines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const remainingLines = res.result ? res.result.split('\n').length : 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={dupCaseSensitive}
              onChange={e => setDupCaseSensitive(e.target.checked)}
              className="rounded text-blue-600"
            />
            Case Sensitive
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={dupTrim}
              onChange={e => setDupTrim(e.target.checked)}
              className="rounded text-blue-600"
            />
            Trim Leading/Trailing Whitespace
          </label>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Removed {res.removedCount} duplicate {res.removedCount === 1 ? 'line' : 'lines'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Original Lines ({originalLines} lines)
            </label>
            <textarea
              rows={9}
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Unique Output ({remainingLines} lines)
              </label>
              <CopyButton text={res.result} size="sm" />
            </div>
            <textarea
              rows={9}
              readOnly
              value={res.result}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4. Text Sorter
  if (toolSlug === 'text-sorter') {
    const sorted = sortLines(text, sortOrder, sortCaseSensitive);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none"
          >
            <option value="asc">Alphabetical (A → Z)</option>
            <option value="desc">Alphabetical (Z → A)</option>
            <option value="length_asc">Shortest to Longest</option>
            <option value="length_desc">Longest to Shortest</option>
            <option value="reverse">Reverse Line Order</option>
          </select>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={sortCaseSensitive}
              onChange={e => setSortCaseSensitive(e.target.checked)}
              className="rounded text-blue-600"
            />
            Case Sensitive
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Input Lines
            </label>
            <textarea
              rows={9}
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sorted Output
              </label>
              <CopyButton text={sorted} size="sm" />
            </div>
            <textarea
              rows={9}
              readOnly
              value={sorted}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 5. Text Cleaner
  if (toolSlug === 'text-cleaner') {
    const cleaned = cleanText(text, {
      removeExtraSpaces: cleanExtraSpaces,
      removeEmptyLines: cleanEmptyLines,
      stripHtml: cleanStripHtml,
      trimLines: cleanTrimLines,
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={cleanExtraSpaces}
              onChange={e => setCleanExtraSpaces(e.target.checked)}
              className="rounded text-blue-600"
            />
            Collapse Extra Spaces
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={cleanEmptyLines}
              onChange={e => setCleanEmptyLines(e.target.checked)}
              className="rounded text-blue-600"
            />
            Remove Blank Lines
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={cleanStripHtml}
              onChange={e => setCleanStripHtml(e.target.checked)}
              className="rounded text-blue-600"
            />
            Strip HTML Tags
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={cleanTrimLines}
              onChange={e => setCleanTrimLines(e.target.checked)}
              className="rounded text-blue-600"
            />
            Trim Line Ends
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Dirty Text
            </label>
            <textarea
              rows={9}
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Cleaned Result
              </label>
              <CopyButton text={cleaned} size="sm" />
            </div>
            <textarea
              rows={9}
              readOnly
              value={cleaned}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 6. Slug Generator
  if (toolSlug === 'slug-generator') {
    const slug = generateSlug(slugLowercase ? text.toLowerCase() : text, slugSeparator as any);

    return (
      <div className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Title or Headline
          </label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. 10 Best Free Calculators for Students in 2025"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Separator:</span>
            <select
              value={slugSeparator}
              onChange={e => setSlugSeparator(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
            </select>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={slugLowercase}
              onChange={e => setSlugLowercase(e.target.checked)}
              className="rounded text-blue-600"
            />
            Lowercase only
          </label>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="min-w-0 pr-4">
            <span className="text-xs text-slate-400">URL-Friendly Slug</span>
            <div className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400 mt-1 break-all">
              {slug || '—'}
            </div>
          </div>
          <CopyButton text={slug} />
        </div>
      </div>
    );
  }

  return <div>Select a text tool.</div>;
};

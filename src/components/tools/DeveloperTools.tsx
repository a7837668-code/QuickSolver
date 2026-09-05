import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import {
  formatJSON,
  validateJSON,
  encodeBase64,
  decodeBase64,
  encodeUrl,
  decodeUrl,
  generateUUIDs,
  convertUnixTimestamp,
  testRegex,
} from '../../utils/calculations/developer';

interface DeveloperToolsProps {
  toolSlug: string;
}

export const DeveloperTools: React.FC<DeveloperToolsProps> = ({ toolSlug }) => {
  // 1. JSON Formatter / Validator State
  const [jsonInput, setJsonInput] = useState<string>(
    '{"product":"QuickSolve","version":1.0,"features":["Calculators","Converters","Image Tools"],"active":true,"meta":{"releaseYear":2025}}'
  );
  const [indentSize, setIndentSize] = useState<number>(2);

  // 2. Base64 State
  const [b64Mode, setB64Mode] = useState<'encode' | 'decode'>('encode');
  const [b64Input, setB64Input] = useState<string>('Hello QuickSolve! 🚀 100% Free developer utilities.');

  // 3. URL State
  const [urlMode, setUrlMode] = useState<'encode' | 'decode'>('encode');
  const [urlInput, setUrlInput] = useState<string>('https://quicksolve.tools/search?q=percentage calculator & category=finance');

  // 4. UUID State
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuidUppercase, setUuidUppercase] = useState<boolean>(false);
  const [uuidHyphens, setUuidHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>(() => generateUUIDs(5));

  // 5. Unix Timestamp State
  const [timestampInput, setTimestampInput] = useState<string>(Math.floor(Date.now() / 1000).toString());

  // 6. Regex State
  const [regexPattern, setRegexPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [regexFlags, setRegexFlags] = useState<string>('g');
  const [regexText, setRegexText] = useState<string>(
    'Contact team@quicksolve.tools or support@example.com for inquiries.'
  );

  // --- 1. JSON Formatter & Validator ---
  if (toolSlug === 'json-formatter' || toolSlug === 'json-validator') {
    const formatRes = formatJSON(jsonInput, indentSize);
    const validateRes = validateJSON(jsonInput);

    return (
      <div className="space-y-6">
        {/* Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Indentation:</span>
            <select
              value={indentSize}
              onChange={e => setIndentSize(parseInt(e.target.value, 10))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={0}>Minified / Compact (0)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setJsonInput('{"name":"Example","items":[1,2,3],"status":"success"}')
              }
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={() => setJsonInput('')}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Validation Status Banner */}
        <div
          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between ${
            validateRes.isValid
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
          }`}
        >
          <div>
            <span className="font-bold">{validateRes.isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}</span>
            {validateRes.isValid && (
              <span className="ml-2 opacity-80">
                (Type: {validateRes.type}, {validateRes.keysCount} keys)
              </span>
            )}
            {!validateRes.isValid && (
              <span className="ml-2 font-mono">{validateRes.message}</span>
            )}
          </div>
          {validateRes.isValid && <CopyButton text={formatRes.result || jsonInput} size="sm" />}
        </div>

        {/* Split Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Input Raw JSON
            </label>
            <textarea
              rows={14}
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Paste raw JSON here..."
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Formatted Output
            </label>
            <textarea
              rows={14}
              readOnly
              value={formatRes.success ? formatRes.result : formatRes.error}
              className={`w-full p-4 rounded-xl border font-mono text-xs focus:outline-none ${
                formatRes.success
                  ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white'
                  : 'border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600'
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. Base64 Encoder / Decoder
  if (toolSlug === 'base64-encoder') {
    const res =
      b64Mode === 'encode' ? encodeBase64(b64Input) : decodeBase64(b64Input);

    return (
      <div className="space-y-6">
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xs">
          <button
            type="button"
            onClick={() => setB64Mode('encode')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              b64Mode === 'encode'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setB64Mode('decode')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              b64Mode === 'decode'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {b64Mode === 'encode' ? 'Plaintext Input' : 'Base64 Encoded Input'}
            </label>
            <textarea
              rows={9}
              value={b64Input}
              onChange={e => setB64Input(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {b64Mode === 'encode' ? 'Base64 Result' : 'Decoded Plaintext'}
              </label>
              <CopyButton text={res.result || ''} size="sm" />
            </div>
            <textarea
              rows={9}
              readOnly
              value={res.success ? res.result : res.error}
              className={`w-full p-4 rounded-xl border font-mono text-xs focus:outline-none ${
                res.success
                  ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white'
                  : 'border-rose-200 bg-rose-50 text-rose-600'
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. URL Encoder / Decoder
  if (toolSlug === 'url-encoder-decoder') {
    const res = urlMode === 'encode' ? encodeUrl(urlInput) : decodeUrl(urlInput);

    return (
      <div className="space-y-6">
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xs">
          <button
            type="button"
            onClick={() => setUrlMode('encode')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              urlMode === 'encode'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setUrlMode('decode')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
              urlMode === 'decode'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {urlMode === 'encode' ? 'Raw URL or String' : 'Encoded URL String'}
            </label>
            <textarea
              rows={8}
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Output
              </label>
              <CopyButton text={res || ''} size="sm" />
            </div>
            <textarea
              rows={8}
              readOnly
              value={res}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4. UUID Generator
  if (toolSlug === 'uuid-generator') {
    const handleGenerate = () => {
      setUuids(generateUUIDs(uuidCount, { uppercase: uuidUppercase, hyphens: uuidHyphens }));
    };

    return (
      <div className="space-y-6 max-w-xl">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Quantity (1 to 50)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={uuidCount}
              onChange={e => setUuidCount(parseInt(e.target.value, 10) || 1)}
              className="w-32 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            />
          </div>
          <div className="pt-5 flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={uuidUppercase}
                onChange={e => setUuidUppercase(e.target.checked)}
                className="rounded text-blue-600"
              />
              Uppercase
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={uuidHyphens}
                onChange={e => setUuidHyphens(e.target.checked)}
                className="rounded text-blue-600"
              />
              Hyphens
            </label>
          </div>
          <div className="pt-5">
            <button
              type="button"
              onClick={handleGenerate}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Generate New
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Generated UUIDs v4</span>
            <CopyButton text={uuids.join('\n')} label="Copy All" size="sm" />
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200 max-h-72 overflow-y-auto">
            {uuids.map((id, index) => (
              <div key={index} className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                <span>{id}</span>
                <CopyButton text={id} label="Copy" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 5. Unix Timestamp Converter
  if (toolSlug === 'unix-timestamp-converter') {
    const res = convertUnixTimestamp(timestampInput);

    return (
      <div className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Unix Epoch Timestamp
            </label>
            <button
              type="button"
              onClick={() => setTimestampInput(Math.floor(Date.now() / 1000).toString())}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Set Current Time
            </button>
          </div>
          <input
            type="text"
            value={timestampInput}
            onChange={e => setTimestampInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">UTC Date &amp; Time</span>
                <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {res.utcDate}
                </div>
              </div>
              <CopyButton text={res.utcDate || ''} size="sm" />
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Local Browser Time</span>
                <div className="text-base font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {res.localDate}
                </div>
              </div>
              <CopyButton text={res.localDate || ''} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400">Seconds</span>
                <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{res.seconds}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Milliseconds</span>
                <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{res.milliseconds}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 6. Regex Tester
  if (toolSlug === 'regex-tester') {
    const res = testRegex(regexPattern, regexFlags, regexText);

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Regular Expression Pattern
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1">
              <span className="text-slate-400 font-mono">/</span>
              <input
                type="text"
                value={regexPattern}
                onChange={e => setRegexPattern(e.target.value)}
                className="w-full px-2 py-2 bg-transparent text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
              />
              <span className="text-slate-400 font-mono">/</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Flags
            </label>
            <input
              type="text"
              value={regexFlags}
              onChange={e => setRegexFlags(e.target.value)}
              placeholder="g, i, m"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Test String
          </label>
          <textarea
            rows={5}
            value={regexText}
            onChange={e => setRegexText(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
          />
        </div>

        {res.isValidPattern ? (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Matches Found: <span className="text-blue-600 dark:text-blue-400">{res.matchesCount}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                /{regexPattern}/{regexFlags}
              </span>
            </div>
            {res.matches.length > 0 ? (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {res.matches.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-xs"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{m.match}</span>
                    <span className="text-slate-400 text-[11px]">index: {m.index}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No matches in test string.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">Regex Error: {res.error}</p>
        )}
      </div>
    );
  }

  return <div>Select a developer tool.</div>;
};

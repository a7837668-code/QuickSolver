import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import {
  convertTemperature,
  convertLength,
  convertWeight,
  convertSpeed,
  convertTime,
  LENGTH_UNITS,
  WEIGHT_UNITS,
  SPEED_UNITS,
  TIME_UNITS,
} from '../../utils/calculations/converters';

interface ConverterToolsProps {
  toolSlug: string;
}

export const ConverterTools: React.FC<ConverterToolsProps> = ({ toolSlug }) => {
  // Unit Converter Multi-type
  const [activeCategory, setActiveCategory] = useState<'length' | 'weight' | 'temp' | 'speed' | 'time'>('length');

  // Value & Unit states
  const [val, setVal] = useState<string>('1');

  // Length
  const [lenFrom, setLenFrom] = useState<string>('m');
  const [lenTo, setLenTo] = useState<string>('ft');

  // Temp
  const [tempVal, setTempVal] = useState<string>('100');
  const [tempFrom, setTempFrom] = useState<'C' | 'F' | 'K'>('C');
  const [tempTo, setTempTo] = useState<'C' | 'F' | 'K'>('F');

  // Weight
  const [wtVal, setWtVal] = useState<string>('1');
  const [wtFrom, setWtFrom] = useState<string>('kg');
  const [wtTo, setWtTo] = useState<string>('lb');

  // Speed
  const [spdVal, setSpdVal] = useState<string>('60');
  const [spdFrom, setSpdFrom] = useState<string>('mph');
  const [spdTo, setSpdTo] = useState<string>('kmh');

  // Time
  const [timeVal, setTimeVal] = useState<string>('24');
  const [timeFrom, setTimeFrom] = useState<string>('hr');
  const [timeTo, setTimeTo] = useState<string>('day');

  // Render Generic Converter Layout
  const renderGeneric = (
    value: string,
    setValue: (v: string) => void,
    from: string,
    setFrom: (v: string) => void,
    to: string,
    setTo: (v: string) => void,
    units: { key: string; name: string; symbol: string }[],
    convertFn: (v: number, f: string, t: string) => any
  ) => {
    const num = parseFloat(value);
    const res = convertFn(isNaN(num) ? 0 : num, from, to);

    const swap = () => {
      const oldFrom = from;
      setFrom(to);
      setTo(oldFrom);
    };

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              From
            </label>
            <input
              type="number"
              step="any"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {units.map(u => (
                <option key={u.key} value={u.key}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={swap}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-2xs transition-colors"
              title="Swap units"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              To
            </label>
            <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-blue-600 dark:text-blue-400 font-bold truncate">
              {res.success ? res.result : '—'}
            </div>
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {units.map(u => (
                <option key={u.key} value={u.key}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result & Formula */}
        {res.success ? (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                Conversion Result
              </span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {value} {from} = {res.result} {to}
              </div>
              {res.formula && (
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  {res.formula}
                </div>
              )}
            </div>
            <CopyButton text={`${res.result} ${to}`} />
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  };

  // 1. Temperature
  if (toolSlug === 'temperature-converter') {
    const tempUnits = [
      { key: 'C', name: 'Celsius', symbol: '°C' },
      { key: 'F', name: 'Fahrenheit', symbol: '°F' },
      { key: 'K', name: 'Kelvin', symbol: 'K' },
    ];
    return renderGeneric(
      tempVal,
      setTempVal,
      tempFrom,
      v => setTempFrom(v as any),
      tempTo,
      v => setTempTo(v as any),
      tempUnits,
      convertTemperature as any
    );
  }

  // 2. Length
  if (toolSlug === 'length-converter') {
    return renderGeneric(val, setVal, lenFrom, setLenFrom, lenTo, setLenTo, LENGTH_UNITS, convertLength);
  }

  // 3. Weight
  if (toolSlug === 'weight-converter') {
    return renderGeneric(wtVal, setWtVal, wtFrom, setWtFrom, wtTo, setWtTo, WEIGHT_UNITS, convertWeight);
  }

  // 4. Speed
  if (toolSlug === 'speed-converter') {
    return renderGeneric(spdVal, setSpdVal, spdFrom, setSpdFrom, spdTo, setSpdTo, SPEED_UNITS, convertSpeed);
  }

  // 5. Time
  if (toolSlug === 'time-converter') {
    return renderGeneric(timeVal, setTimeVal, timeFrom, setTimeFrom, timeTo, setTimeTo, TIME_UNITS, convertTime);
  }

  // 6. Universal Unit Converter (Tabbed interface for all)
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xl">
        {(['length', 'weight', 'temp', 'speed', 'time'] as const).map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors capitalize ${
              activeCategory === cat
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat === 'temp' ? 'Temperature' : cat}
          </button>
        ))}
      </div>

      {activeCategory === 'length' && renderGeneric(val, setVal, lenFrom, setLenFrom, lenTo, setLenTo, LENGTH_UNITS, convertLength)}
      {activeCategory === 'weight' && renderGeneric(wtVal, setWtVal, wtFrom, setWtFrom, wtTo, setWtTo, WEIGHT_UNITS, convertWeight)}
      {activeCategory === 'temp' &&
        renderGeneric(
          tempVal,
          setTempVal,
          tempFrom,
          v => setTempFrom(v as any),
          tempTo,
          v => setTempTo(v as any),
          [
            { key: 'C', name: 'Celsius', symbol: '°C' },
            { key: 'F', name: 'Fahrenheit', symbol: '°F' },
            { key: 'K', name: 'Kelvin', symbol: 'K' },
          ],
          convertTemperature as any
        )}
      {activeCategory === 'speed' && renderGeneric(spdVal, setSpdVal, spdFrom, setSpdFrom, spdTo, setSpdTo, SPEED_UNITS, convertSpeed)}
      {activeCategory === 'time' && renderGeneric(timeVal, setTimeVal, timeFrom, setTimeFrom, timeTo, setTimeTo, TIME_UNITS, convertTime)}
    </div>
  );
};

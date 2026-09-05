import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'quicksolve-inline-slot',
  format = 'horizontal',
  className = '',
}) => {
  // If ads are not activated, render a very clean subtle notice or placeholder
  const adsEnabled = false; // toggled via environment or ad provider config

  if (!adsEnabled) {
    return null; // Keep the layout pristine and completely ad-free unless explicitly configured
  }

  return (
    <div
      id={slotId}
      className={`my-6 mx-auto flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs text-slate-400 ${className}`}
      aria-label="Advertisement Space"
    >
      <span className="uppercase tracking-widest text-[10px] text-slate-400 font-semibold mb-1">
        Advertisement
      </span>
      <div className={`w-full flex items-center justify-center ${format === 'horizontal' ? 'h-24' : 'h-60'}`}>
        <span className="text-slate-400">Ad Space Ready</span>
      </div>
    </div>
  );
};

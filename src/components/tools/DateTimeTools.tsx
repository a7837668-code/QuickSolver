import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import {
  calculateAge,
  calculateDateDifference,
  calculateDaysBetween,
  calculateTimeDuration,
} from '../../utils/calculations/dateTime';

interface DateTimeToolsProps {
  toolSlug: string;
}

export const DateTimeTools: React.FC<DateTimeToolsProps> = ({ toolSlug }) => {
  const todayIso = new Date().toISOString().split('T')[0];

  // 1. Age State
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [targetDate, setTargetDate] = useState<string>(todayIso);

  // 2. Date Diff State
  const [startDate, setStartDate] = useState<string>('2024-01-01');
  const [endDate, setEndDate] = useState<string>(todayIso);

  // 3. Days Between State
  const [dbStart, setDbStart] = useState<string>('2024-01-01');
  const [dbEnd, setDbEnd] = useState<string>(todayIso);
  const [dbIncludeEnd, setDbIncludeEnd] = useState<boolean>(true);

  // 4. Time Duration State
  const [timeStart, setTimeStart] = useState<string>('09:00');
  const [timeEnd, setTimeEnd] = useState<string>('17:30');
  const [breakMins, setBreakMins] = useState<string>('45');

  // --- 1. Age Calculator ---
  if (toolSlug === 'age-calculator') {
    const res = calculateAge(birthDate, targetDate);

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Age as of Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success && res.age ? (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Exact Age</span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.age.years} Years, {res.age.months} Months, {res.age.days} Days
                </div>
                {res.age.nextBirthdayDays !== undefined && (
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    🎉 Next birthday in <span className="text-blue-600 dark:text-blue-400 font-bold">{res.age.nextBirthdayDays}</span> days
                  </div>
                )}
              </div>
              <CopyButton text={`${res.age.years} years, ${res.age.months} months, ${res.age.days} days`} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Months</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{(res.age.years * 12 + res.age.months).toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Weeks</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{Math.floor(res.age.totalDays / 7).toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Days</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{res.age.totalDays.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Hours</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{res.age.totalHours.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 2. Date Difference Calculator
  if (toolSlug === 'date-difference-calculator') {
    const res = calculateDateDifference(startDate, endDate);

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Elapsed Difference</span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.years}y {res.months}m {res.days}d
                </div>
              </div>
              <CopyButton text={`${res.totalDays?.toLocaleString()} total days (${res.years}y ${res.months}m ${res.days}d)`} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-xs text-slate-400">Total Days</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{res.totalDays?.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total Weeks</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{res.totalWeeks?.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total Hours</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{res.totalHours?.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 3. Days Between Dates
  if (toolSlug === 'days-between-dates') {
    const res = calculateDaysBetween(dbStart, dbEnd, dbIncludeEnd);

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dbStart}
              onChange={e => setDbStart(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dbEnd}
              onChange={e => setDbEnd(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="include-end"
            type="checkbox"
            checked={dbIncludeEnd}
            onChange={e => setDbIncludeEnd(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="include-end" className="text-sm text-slate-700 dark:text-slate-300">
            Include end date in calculation (+1 day)
          </label>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Total Calendar Days</span>
                <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.days?.toLocaleString()} Days
                </div>
              </div>
              <CopyButton text={`${res.days} days (${res.businessDays} working days, ${res.weekendDays} weekend days)`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400">Working Days (Mon - Fri)</span>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{res.businessDays?.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Weekend Days (Sat - Sun)</span>
                <div className="text-xl font-bold text-slate-600 dark:text-slate-300">{res.weekendDays?.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 4. Time Duration Calculator
  if (toolSlug === 'time-duration-calculator') {
    const res = calculateTimeDuration(timeStart, timeEnd, parseInt(breakMins, 10) || 0);

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={timeStart}
              onChange={e => setTimeStart(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              End Time
            </label>
            <input
              type="time"
              value={timeEnd}
              onChange={e => setTimeEnd(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Break (Minutes)
            </label>
            <input
              type="number"
              min="0"
              value={breakMins}
              onChange={e => setBreakMins(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Total Duration</span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.hours} Hours {res.minutes} Minutes
                </div>
              </div>
              <CopyButton text={`${res.hours} hrs ${res.minutes} mins (${res.decimalHours} decimal hours)`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400">Decimal Hours (Payroll)</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{res.decimalHours} hrs</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total Minutes</span>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{res.totalMinutes} mins</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  return <div>Select a Date &amp; Time tool.</div>;
};

import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import {
  calculatePercentage,
  calculateDiscount,
  calculateProfitLoss,
  calculateSalary,
  calculateEmi,
  calculateCompoundInterest,
  calculateTip,
  calculateSplitBill,
} from '../../utils/calculations/finance';

interface FinanceToolsProps {
  toolSlug: string;
}

export const FinanceTools: React.FC<FinanceToolsProps> = ({ toolSlug }) => {
  // --- 1. Percentage Calculator State ---
  const [percMode, setPercMode] = useState<'what_is_p_of_x' | 'x_is_what_p_of_y' | 'percentage_change'>('what_is_p_of_x');
  const [percA, setPercA] = useState<string>('15');
  const [percB, setPercB] = useState<string>('200');

  // --- 2. Discount Calculator State ---
  const [discPrice, setDiscPrice] = useState<string>('120');
  const [discPercent, setDiscPercent] = useState<string>('20');
  const [discTax, setDiscTax] = useState<string>('8');

  // --- 3. Profit / Loss Calculator State ---
  const [plCost, setPlCost] = useState<string>('50');
  const [plSell, setPlSell] = useState<string>('75');

  // --- 4. Salary Calculator State ---
  const [salAmount, setSalAmount] = useState<string>('65000');
  const [salFreq, setSalFreq] = useState<'annual' | 'monthly' | 'biweekly' | 'weekly' | 'hourly'>('annual');
  const [salHours, setSalHours] = useState<string>('40');
  const [salTax, setSalTax] = useState<string>('18');

  // --- 5. EMI Loan Calculator State ---
  const [emiPrincipal, setEmiPrincipal] = useState<string>('250000');
  const [emiRate, setEmiRate] = useState<string>('6.5');
  const [emiTenureYears, setEmiTenureYears] = useState<string>('15');

  // --- 6. Compound Interest Calculator State ---
  const [ciPrincipal, setCiPrincipal] = useState<string>('10000');
  const [ciRate, setCiRate] = useState<string>('7');
  const [ciYears, setCiYears] = useState<string>('10');
  const [ciMonthlyContribution, setCiMonthlyContribution] = useState<string>('200');

  // --- 7. Tip Calculator State ---
  const [tipBill, setTipBill] = useState<string>('85.50');
  const [tipPercent, setTipPercent] = useState<string>('18');
  const [tipSplit, setTipSplit] = useState<string>('2');

  // --- 8. Split Bill Calculator State ---
  const [sbTotal, setSbTotal] = useState<string>('150');
  const [sbTip, setSbTip] = useState<string>('15');
  const [sbTax, setSbTax] = useState<string>('8');
  const [sbPeople, setSbPeople] = useState<string>('4');

  // Helper formatter
  const formatMoney = (val?: number) => {
    if (val === undefined || isNaN(val)) return '$0.00';
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // 1. Percentage Calculator
  if (toolSlug === 'percentage-calculator') {
    const res = calculatePercentage(percMode, parseFloat(percA), parseFloat(percB));

    return (
      <div className="space-y-6">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xl">
          <button
            type="button"
            onClick={() => setPercMode('what_is_p_of_x')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              percMode === 'what_is_p_of_x'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            What is X% of Y?
          </button>
          <button
            type="button"
            onClick={() => setPercMode('x_is_what_p_of_y')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              percMode === 'x_is_what_p_of_y'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            X is what % of Y?
          </button>
          <button
            type="button"
            onClick={() => setPercMode('percentage_change')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              percMode === 'percentage_change'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Percentage Change
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {percMode === 'what_is_p_of_x' ? 'Percentage (%)' : percMode === 'x_is_what_p_of_y' ? 'Value (X)' : 'Initial Value'}
            </label>
            <input
              type="number"
              step="any"
              value={percA}
              onChange={e => setPercA(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 15"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {percMode === 'what_is_p_of_x' ? 'Total Amount (Y)' : percMode === 'x_is_what_p_of_y' ? 'Total (Y)' : 'Final Value'}
            </label>
            <input
              type="number"
              step="any"
              value={percB}
              onChange={e => setPercB(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 200"
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 max-w-xl">
          {res.success ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Calculated Result</span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {res.result}
                  {percMode !== 'what_is_p_of_x' && '%'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">{res.explanation}</p>
              </div>
              <CopyButton text={`${res.result}${percMode !== 'what_is_p_of_x' ? '%' : ''}`} />
            </div>
          ) : (
            <p className="text-sm text-rose-500 font-medium">{res.error}</p>
          )}
        </div>
      </div>
    );
  }

  // 2. Discount Calculator
  if (toolSlug === 'discount-calculator') {
    const res = calculateDiscount(parseFloat(discPrice), parseFloat(discPercent), parseFloat(discTax));

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Original Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={discPrice}
              onChange={e => setDiscPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              value={discPercent}
              onChange={e => setDiscPercent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Sales Tax (%)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={discTax}
              onChange={e => setDiscTax(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Discount Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-medium">Popular Discounts:</span>
          {['10', '15', '20', '25', '30', '50', '70'].map(pct => (
            <button
              key={pct}
              type="button"
              onClick={() => setDiscPercent(pct)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition-colors ${
                discPercent === pct
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Results Overview */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          {res.success ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-xs text-slate-500">Final Price (with Tax)</span>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatMoney(res.finalPrice)}
                  </div>
                </div>
                <CopyButton text={formatMoney(res.finalPrice)} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <span className="text-xs text-slate-400">You Save</span>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatMoney(res.savings)}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Price Before Tax</span>
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{formatMoney(res.discountedPrice)}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Estimated Tax</span>
                  <div className="text-lg font-bold text-slate-600 dark:text-slate-300">{formatMoney(res.taxAmount)}</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-rose-500 font-medium">{res.error}</p>
          )}
        </div>
      </div>
    );
  }

  // 3. Profit / Loss Calculator
  if (toolSlug === 'profit-loss-calculator') {
    const res = calculateProfitLoss(parseFloat(plCost), parseFloat(plSell));

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Cost Price (Buying Price)
            </label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={plCost}
              onChange={e => setPlCost(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Selling Price
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={plSell}
              onChange={e => setPlSell(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          {res.success ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  {res.isProfit ? 'Net Profit' : 'Net Loss'}
                </span>
                <div
                  className={`text-3xl font-extrabold mt-1 ${
                    res.isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {formatMoney(res.difference)}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {res.percentage}% {res.isProfit ? 'Profit Margin' : 'Loss'}
                </div>
              </div>
              <CopyButton text={`${res.isProfit ? 'Profit' : 'Loss'}: ${formatMoney(res.difference)} (${res.percentage}%)`} />
            </div>
          ) : (
            <p className="text-sm text-rose-500 font-medium">{res.error}</p>
          )}
        </div>
      </div>
    );
  }

  // 4. Salary Calculator
  if (toolSlug === 'salary-calculator') {
    const res = calculateSalary(
      parseFloat(salAmount),
      salFreq,
      parseFloat(salHours),
      5,
      parseFloat(salTax)
    );

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Salary / Wage Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={salAmount}
              onChange={e => setSalAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Frequency
            </label>
            <select
              value={salFreq}
              onChange={e => setSalFreq(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="annual">Per Year (Annual)</option>
              <option value="monthly">Per Month</option>
              <option value="biweekly">Bi-Weekly (Every 2 weeks)</option>
              <option value="weekly">Per Week</option>
              <option value="hourly">Per Hour</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Working Hours / Week
            </label>
            <input
              type="number"
              min="1"
              max="168"
              value={salHours}
              onChange={e => setSalHours(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Estimated Tax Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={salTax}
              onChange={e => setSalTax(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Estimated Take-Home (Net Annual)
                </span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {formatMoney(res.netAnnual)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Net Monthly: <span className="font-semibold text-slate-700 dark:text-slate-200">{formatMoney(res.netMonthly)}</span>
                </div>
              </div>
              <CopyButton text={`Net Annual: ${formatMoney(res.netAnnual)}, Net Monthly: ${formatMoney(res.netMonthly)}`} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Annual Gross</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{formatMoney(res.annualGross)}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Monthly Gross</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{formatMoney(res.monthlyGross)}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Bi-Weekly Gross</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{formatMoney(res.biweeklyGross)}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Hourly Equivalent</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{formatMoney(res.hourlyGross)}/hr</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 5. EMI / Loan Calculator
  if (toolSlug === 'emi-calculator') {
    const tenureMonths = Math.round(parseFloat(emiTenureYears) * 12);
    const res = calculateEmi(parseFloat(emiPrincipal), parseFloat(emiRate), tenureMonths);

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              min="1"
              value={emiPrincipal}
              onChange={e => setEmiPrincipal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={emiRate}
              onChange={e => setEmiRate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={emiTenureYears}
              onChange={e => setEmiTenureYears(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Monthly Payment (EMI)
                </span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {formatMoney(res.monthlyEmi)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Total of {tenureMonths} monthly payments
                </div>
              </div>
              <CopyButton text={`Monthly EMI: ${formatMoney(res.monthlyEmi)}`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Interest Payable</span>
                <div className="font-bold text-rose-600 dark:text-rose-400 text-lg mt-1">{formatMoney(res.totalInterest)}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Payment (Principal + Interest)</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-lg mt-1">{formatMoney(res.totalPayment)}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 6. Compound Interest Calculator
  if (toolSlug === 'compound-interest-calculator') {
    const res = calculateCompoundInterest(
      parseFloat(ciPrincipal),
      parseFloat(ciRate),
      parseFloat(ciYears),
      12,
      parseFloat(ciMonthlyContribution) || 0
    );

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Initial Principal ($)
            </label>
            <input
              type="number"
              min="0"
              value={ciPrincipal}
              onChange={e => setCiPrincipal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={ciRate}
              onChange={e => setCiRate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Time Horizon (Years)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={ciYears}
              onChange={e => setCiYears(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              min="0"
              value={ciMonthlyContribution}
              onChange={e => setCiMonthlyContribution(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-emerald-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Future Portfolio Value
                </span>
                <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatMoney(res.futureValue)}
                </div>
              </div>
              <CopyButton text={`Future Value: ${formatMoney(res.futureValue)}`} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Interest Earned</span>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base mt-1">{formatMoney(res.totalInterest)}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Starting Principal</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{formatMoney(res.totalPrincipal)}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">Total Contributions</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-base mt-1">{formatMoney(res.totalContributions)}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 7. Tip Calculator
  if (toolSlug === 'tip-calculator') {
    const res = calculateTip(parseFloat(tipBill), parseFloat(tipPercent), parseInt(tipSplit, 10));

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Bill Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={tipBill}
              onChange={e => setTipBill(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Tip %
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={tipPercent}
              onChange={e => setTipPercent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Split (People)
            </label>
            <input
              type="number"
              min="1"
              value={tipSplit}
              onChange={e => setTipSplit(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Tip presets */}
        <div className="flex items-center gap-2">
          {['10', '15', '18', '20', '25'].map(pct => (
            <button
              key={pct}
              type="button"
              onClick={() => setTipPercent(pct)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                tipPercent === pct
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Total Bill (with Tip)</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatMoney(res.totalAmount)}</div>
              </div>
              <CopyButton text={`Total: ${formatMoney(res.totalAmount)}, Tip: ${formatMoney(res.tipAmount)}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400">Tip Amount</span>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatMoney(res.tipAmount)}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Per Person Share</span>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(res.totalPerPerson)}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  // 8. Split Bill Calculator
  if (toolSlug === 'split-bill-calculator') {
    const res = calculateSplitBill(
      parseFloat(sbTotal),
      parseFloat(sbTip),
      parseFloat(sbTax),
      parseInt(sbPeople, 10)
    );

    return (
      <div className="space-y-6 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Subtotal Bill ($)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={sbTotal}
              onChange={e => setSbTotal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Number of People
            </label>
            <input
              type="number"
              min="1"
              value={sbPeople}
              onChange={e => setSbPeople(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Tip %
            </label>
            <input
              type="number"
              min="0"
              value={sbTip}
              onChange={e => setSbTip(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Sales Tax %
            </label>
            <input
              type="number"
              min="0"
              value={sbTax}
              onChange={e => setSbTax(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {res.success ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400">Each Person Pays</span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{formatMoney(res.perPersonTotal)}</div>
              </div>
              <CopyButton text={`Per person: ${formatMoney(res.perPersonTotal)}, Grand Total: ${formatMoney(res.grandTotal)}`} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs text-slate-400">Grand Total</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">{formatMoney(res.grandTotal)}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total Tip</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">{formatMoney(res.tipAmount)}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Total Tax</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">{formatMoney(res.taxAmount)}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-500 font-medium">{res.error}</p>
        )}
      </div>
    );
  }

  return <div>Select a valid financial tool.</div>;
};

// Accurate financial calculation utilities

export interface PercentageResult {
  result: number;
  explanation: string;
  type: 'what_is_p_of_x' | 'x_is_what_p_of_y' | 'percentage_change';
}

export function calculatePercentage(
  mode: 'what_is_p_of_x' | 'x_is_what_p_of_y' | 'percentage_change',
  valA: number,
  valB: number
): { success: boolean; result?: number; error?: string; explanation?: string } {
  if (isNaN(valA) || isNaN(valB)) {
    return { success: false, error: 'Please enter valid numbers.' };
  }

  if (mode === 'what_is_p_of_x') {
    // What is valA % of valB?
    const res = (valA * valB) / 100;
    return {
      success: true,
      result: Number(res.toFixed(4)),
      explanation: `${valA}% of ${valB} is ${Number(res.toFixed(4))}`,
    };
  } else if (mode === 'x_is_what_p_of_y') {
    // valA is what % of valB?
    if (valB === 0) {
      return { success: false, error: 'Total value cannot be zero (division by zero).' };
    }
    const res = (valA / valB) * 100;
    return {
      success: true,
      result: Number(res.toFixed(4)),
      explanation: `${valA} is ${Number(res.toFixed(4))}% of ${valB}`,
    };
  } else {
    // Percentage change from valA to valB
    if (valA === 0) {
      return { success: false, error: 'Initial value cannot be zero for percentage change calculation.' };
    }
    const diff = valB - valA;
    const res = (diff / Math.abs(valA)) * 100;
    const direction = diff >= 0 ? 'increase' : 'decrease';
    return {
      success: true,
      result: Number(res.toFixed(4)),
      explanation: `Change from ${valA} to ${valB} is a ${Math.abs(Number(res.toFixed(4)))}% ${direction}`,
    };
  }
}

export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
  taxPercent: number = 0
): {
  success: boolean;
  savings?: number;
  finalPrice?: number;
  discountedPrice?: number;
  taxAmount?: number;
  error?: string;
} {
  if (isNaN(originalPrice) || isNaN(discountPercent)) {
    return { success: false, error: 'Please enter valid numbers.' };
  }
  if (originalPrice < 0) {
    return { success: false, error: 'Original price cannot be negative.' };
  }
  if (discountPercent < 0 || discountPercent > 100) {
    return { success: false, error: 'Discount percentage must be between 0% and 100%.' };
  }
  if (taxPercent < 0) {
    return { success: false, error: 'Tax percentage cannot be negative.' };
  }

  const savings = (originalPrice * discountPercent) / 100;
  const discountedPrice = originalPrice - savings;
  const taxAmount = (discountedPrice * taxPercent) / 100;
  const finalPrice = discountedPrice + taxAmount;

  return {
    success: true,
    savings: Number(savings.toFixed(2)),
    discountedPrice: Number(discountedPrice.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
  };
}

export function calculateProfitLoss(
  costPrice: number,
  sellingPrice: number
): {
  success: boolean;
  isProfit?: boolean;
  difference?: number;
  percentage?: number;
  error?: string;
} {
  if (isNaN(costPrice) || isNaN(sellingPrice)) {
    return { success: false, error: 'Please enter valid numeric amounts.' };
  }
  if (costPrice <= 0) {
    return { success: false, error: 'Cost price must be greater than zero.' };
  }
  if (sellingPrice < 0) {
    return { success: false, error: 'Selling price cannot be negative.' };
  }

  const difference = sellingPrice - costPrice;
  const percentage = (Math.abs(difference) / costPrice) * 100;

  return {
    success: true,
    isProfit: difference >= 0,
    difference: Number(Math.abs(difference).toFixed(2)),
    percentage: Number(percentage.toFixed(2)),
  };
}

export function calculateSalary(
  amount: number,
  frequency: 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual',
  hoursPerWeek: number = 40,
  daysPerWeek: number = 5,
  taxRatePercent: number = 0
): {
  success: boolean;
  annualGross?: number;
  monthlyGross?: number;
  biweeklyGross?: number;
  weeklyGross?: number;
  dailyGross?: number;
  hourlyGross?: number;
  netAnnual?: number;
  netMonthly?: number;
  totalTaxAnnual?: number;
  error?: string;
} {
  if (isNaN(amount) || amount < 0) {
    return { success: false, error: 'Please enter a valid non-negative salary amount.' };
  }
  if (hoursPerWeek <= 0 || hoursPerWeek > 168) {
    return { success: false, error: 'Hours per week must be between 1 and 168.' };
  }
  if (daysPerWeek <= 0 || daysPerWeek > 7) {
    return { success: false, error: 'Days per week must be between 1 and 7.' };
  }
  if (taxRatePercent < 0 || taxRatePercent > 100) {
    return { success: false, error: 'Tax rate must be between 0% and 100%.' };
  }

  let annualGross = 0;
  switch (frequency) {
    case 'hourly':
      annualGross = amount * hoursPerWeek * 52;
      break;
    case 'daily':
      annualGross = amount * daysPerWeek * 52;
      break;
    case 'weekly':
      annualGross = amount * 52;
      break;
    case 'biweekly':
      annualGross = amount * 26;
      break;
    case 'monthly':
      annualGross = amount * 12;
      break;
    case 'annual':
      annualGross = amount;
      break;
  }

  const monthlyGross = annualGross / 12;
  const biweeklyGross = annualGross / 26;
  const weeklyGross = annualGross / 52;
  const dailyGross = annualGross / (52 * daysPerWeek);
  const hourlyGross = annualGross / (52 * hoursPerWeek);

  const totalTaxAnnual = (annualGross * taxRatePercent) / 100;
  const netAnnual = annualGross - totalTaxAnnual;
  const netMonthly = netAnnual / 12;

  return {
    success: true,
    annualGross: Number(annualGross.toFixed(2)),
    monthlyGross: Number(monthlyGross.toFixed(2)),
    biweeklyGross: Number(biweeklyGross.toFixed(2)),
    weeklyGross: Number(weeklyGross.toFixed(2)),
    dailyGross: Number(dailyGross.toFixed(2)),
    hourlyGross: Number(hourlyGross.toFixed(2)),
    totalTaxAnnual: Number(totalTaxAnnual.toFixed(2)),
    netAnnual: Number(netAnnual.toFixed(2)),
    netMonthly: Number(netMonthly.toFixed(2)),
  };
}

export function calculateEmi(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): {
  success: boolean;
  monthlyEmi?: number;
  totalInterest?: number;
  totalPayment?: number;
  error?: string;
} {
  if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureMonths)) {
    return { success: false, error: 'Please enter valid numerical values.' };
  }
  if (principal <= 0) {
    return { success: false, error: 'Loan principal amount must be greater than zero.' };
  }
  if (annualInterestRate < 0) {
    return { success: false, error: 'Interest rate cannot be negative.' };
  }
  if (tenureMonths <= 0 || !Number.isInteger(tenureMonths)) {
    return { success: false, error: 'Tenure must be at least 1 whole month.' };
  }

  if (annualInterestRate === 0) {
    const monthlyEmi = principal / tenureMonths;
    return {
      success: true,
      monthlyEmi: Number(monthlyEmi.toFixed(2)),
      totalInterest: 0,
      totalPayment: Number(principal.toFixed(2)),
    };
  }

  const monthlyRate = annualInterestRate / (12 * 100);
  // Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const rateFactor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEmi = (principal * monthlyRate * rateFactor) / (rateFactor - 1);
  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    success: true,
    monthlyEmi: Number(monthlyEmi.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
  };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number = 12,
  monthlyContribution: number = 0
): {
  success: boolean;
  futureValue?: number;
  totalInterest?: number;
  totalPrincipal?: number;
  totalContributions?: number;
  error?: string;
} {
  if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) {
    return { success: false, error: 'Please enter valid numeric parameters.' };
  }
  if (principal < 0) {
    return { success: false, error: 'Principal cannot be negative.' };
  }
  if (annualRate < 0) {
    return { success: false, error: 'Annual rate cannot be negative.' };
  }
  if (years <= 0 || years > 100) {
    return { success: false, error: 'Investment period must be between 1 and 100 years.' };
  }
  if (compoundsPerYear <= 0) {
    return { success: false, error: 'Compounding frequency must be greater than zero.' };
  }
  if (monthlyContribution < 0) {
    return { success: false, error: 'Contribution cannot be negative.' };
  }

  const r = annualRate / 100;
  const n = compoundsPerYear;
  const t = years;

  // Compound amount on initial principal: P * (1 + r/n)^(n*t)
  const compoundPrincipal = principal * Math.pow(1 + r / n, n * t);

  // Future value of regular monthly contributions: PMT * [((1 + r/12)^(12*t) - 1) / (r/12)]
  let futureContributions = 0;
  const totalContributions = monthlyContribution * 12 * t;

  if (monthlyContribution > 0) {
    const monthlyRate = r / 12;
    if (monthlyRate === 0) {
      futureContributions = totalContributions;
    } else {
      futureContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, 12 * t) - 1) / monthlyRate);
    }
  }

  const futureValue = compoundPrincipal + futureContributions;
  const totalPrincipalInvested = principal + totalContributions;
  const totalInterest = futureValue - totalPrincipalInvested;

  return {
    success: true,
    futureValue: Number(futureValue.toFixed(2)),
    totalInterest: Number(Math.max(0, totalInterest).toFixed(2)),
    totalPrincipal: Number(principal.toFixed(2)),
    totalContributions: Number(totalContributions.toFixed(2)),
  };
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  splitCount: number = 1
): {
  success: boolean;
  tipAmount?: number;
  totalAmount?: number;
  tipPerPerson?: number;
  totalPerPerson?: number;
  error?: string;
} {
  if (isNaN(billAmount) || isNaN(tipPercent) || isNaN(splitCount)) {
    return { success: false, error: 'Please enter valid numbers.' };
  }
  if (billAmount < 0) {
    return { success: false, error: 'Bill amount cannot be negative.' };
  }
  if (tipPercent < 0) {
    return { success: false, error: 'Tip percentage cannot be negative.' };
  }
  if (splitCount < 1 || !Number.isInteger(splitCount)) {
    return { success: false, error: 'Split count must be at least 1 person.' };
  }

  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;
  const tipPerPerson = tipAmount / splitCount;
  const totalPerPerson = totalAmount / splitCount;

  return {
    success: true,
    tipAmount: Number(tipAmount.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    tipPerPerson: Number(tipPerPerson.toFixed(2)),
    totalPerPerson: Number(totalPerPerson.toFixed(2)),
  };
}

export function calculateSplitBill(
  totalBill: number,
  tipPercent: number = 0,
  taxPercent: number = 0,
  numberOfPeople: number = 1
): {
  success: boolean;
  subtotal?: number;
  taxAmount?: number;
  tipAmount?: number;
  grandTotal?: number;
  perPersonTotal?: number;
  error?: string;
} {
  if (isNaN(totalBill) || isNaN(tipPercent) || isNaN(taxPercent) || isNaN(numberOfPeople)) {
    return { success: false, error: 'Please enter valid numeric parameters.' };
  }
  if (totalBill < 0) {
    return { success: false, error: 'Bill amount cannot be negative.' };
  }
  if (numberOfPeople < 1 || !Number.isInteger(numberOfPeople)) {
    return { success: false, error: 'Number of people must be at least 1.' };
  }
  if (tipPercent < 0 || taxPercent < 0) {
    return { success: false, error: 'Percentages cannot be negative.' };
  }

  const taxAmount = (totalBill * taxPercent) / 100;
  const billWithTax = totalBill + taxAmount;
  const tipAmount = (totalBill * tipPercent) / 100;
  const grandTotal = billWithTax + tipAmount;
  const perPersonTotal = grandTotal / numberOfPeople;

  return {
    success: true,
    subtotal: Number(totalBill.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    tipAmount: Number(tipAmount.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
    perPersonTotal: Number(perPersonTotal.toFixed(2)),
  };
}

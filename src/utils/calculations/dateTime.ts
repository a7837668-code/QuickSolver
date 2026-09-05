// Date and Time calculation utilities

export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
  dayOfWeekBorn: string;
}

export function calculateAge(birthDateStr: string, asOfDateStr?: string): {
  success: boolean;
  age?: AgeBreakdown;
  error?: string;
} {
  if (!birthDateStr) {
    return { success: false, error: 'Please select a valid birth date.' };
  }

  const birthDate = new Date(birthDateStr + 'T00:00:00');
  const asOf = asOfDateStr ? new Date(asOfDateStr + 'T00:00:00') : new Date();

  if (isNaN(birthDate.getTime())) {
    return { success: false, error: 'Invalid birth date format.' };
  }
  if (isNaN(asOf.getTime())) {
    return { success: false, error: 'Invalid target date format.' };
  }
  if (birthDate > asOf) {
    return { success: false, error: 'Date of birth cannot be in the future of the comparison date.' };
  }

  let years = asOf.getFullYear() - birthDate.getFullYear();
  let months = asOf.getMonth() - birthDate.getMonth();
  let days = asOf.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month of asOf
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = asOf.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  // Next birthday calculation
  const currentYearBirthday = new Date(asOf.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  let nextBirthday = currentYearBirthday;
  if (currentYearBirthday < asOf) {
    nextBirthday = new Date(asOf.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const nextBirthdayMs = nextBirthday.getTime() - asOf.getTime();
  const nextBirthdayDays = Math.ceil(nextBirthdayMs / (1000 * 60 * 60 * 24));

  const dayOfWeekBorn = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

  return {
    success: true,
    age: {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthdayDays,
      dayOfWeekBorn,
    },
  };
}

export function calculateDateDifference(
  startDateStr: string,
  endDateStr: string,
  includeEndDate: boolean = false
): {
  success: boolean;
  years?: number;
  months?: number;
  days?: number;
  totalDays?: number;
  totalWeeks?: number;
  totalHours?: number;
  businessDays?: number;
  weekendDays?: number;
  error?: string;
} {
  if (!startDateStr || !endDateStr) {
    return { success: false, error: 'Please enter both start and end dates.' };
  }

  const start = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T00:00:00');

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { success: false, error: 'Please enter valid calendar dates.' };
  }
  if (end < start) {
    return { success: false, error: 'End date cannot be earlier than start date.' };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = end.getTime() - start.getTime();
  let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (includeEndDate) {
    totalDays += 1;
    days += 1;
  }

  const totalWeeks = Number((totalDays / 7).toFixed(1));
  const totalHours = totalDays * 24;

  // Calculate business days vs weekend days
  let businessDays = 0;
  let weekendDays = 0;
  const curr = new Date(start);
  const endLimit = new Date(end);
  if (includeEndDate) {
    endLimit.setDate(endLimit.getDate() + 1);
  }

  while (curr < endLimit) {
    const day = curr.getDay();
    if (day === 0 || day === 6) {
      weekendDays++;
    } else {
      businessDays++;
    }
    curr.setDate(curr.getDate() + 1);
  }

  return {
    success: true,
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    businessDays,
    weekendDays,
  };
}

export function calculateDaysBetween(
  startDateStr: string,
  endDateStr: string,
  includeEndDate: boolean = false
): {
  success: boolean;
  days?: number;
  weeks?: number;
  remainingDays?: number;
  percentageOfYear?: number;
  businessDays?: number;
  weekendDays?: number;
  error?: string;
} {
  const res = calculateDateDifference(startDateStr, endDateStr, includeEndDate);
  if (!res.success) {
    return { success: false, error: res.error };
  }

  const days = res.totalDays ?? 0;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const percentageOfYear = Number(((days / 365.25) * 100).toFixed(2));

  return {
    success: true,
    days,
    weeks,
    remainingDays,
    percentageOfYear,
    businessDays: res.businessDays,
    weekendDays: res.weekendDays,
  };
}

export function calculateTimeDuration(
  startTimeStr: string, // "HH:MM"
  endTimeStr: string,   // "HH:MM"
  breakMinutesOrMidnight: number | boolean = 0
): {
  success: boolean;
  hours?: number;
  minutes?: number;
  totalMinutes?: number;
  decimalHours?: number;
  error?: string;
} {
  if (!startTimeStr || !endTimeStr) {
    return { success: false, error: 'Please enter both start time and end time.' };
  }

  const [startH, startM] = startTimeStr.split(':').map(Number);
  const [endH, endM] = endTimeStr.split(':').map(Number);

  if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
    return { success: false, error: 'Invalid time format.' };
  }

  const breakMins = typeof breakMinutesOrMidnight === 'number' ? breakMinutesOrMidnight : 0;
  const crossesMidnight = typeof breakMinutesOrMidnight === 'boolean' ? breakMinutesOrMidnight : false;

  const startTotalMinutes = startH * 60 + startM;
  let endTotalMinutes = endH * 60 + endM;

  if (endTotalMinutes < startTotalMinutes || crossesMidnight) {
    endTotalMinutes += 24 * 60;
  }

  let diffMinutes = endTotalMinutes - startTotalMinutes;
  if (breakMins > 0) {
    diffMinutes = Math.max(0, diffMinutes - breakMins);
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const decimalHours = Number((diffMinutes / 60).toFixed(2));

  return {
    success: true,
    hours,
    minutes,
    totalMinutes: diffMinutes,
    decimalHours,
  };
}

// Conversion utilities with high precision

// Units lists
export const LENGTH_UNITS = [
  { key: 'mm', name: 'Millimeter', symbol: 'mm' },
  { key: 'cm', name: 'Centimeter', symbol: 'cm' },
  { key: 'm', name: 'Meter', symbol: 'm' },
  { key: 'km', name: 'Kilometer', symbol: 'km' },
  { key: 'in', name: 'Inch', symbol: 'in' },
  { key: 'ft', name: 'Foot', symbol: 'ft' },
  { key: 'yd', name: 'Yard', symbol: 'yd' },
  { key: 'mi', name: 'Mile', symbol: 'mi' },
  { key: 'nmi', name: 'Nautical Mile', symbol: 'nmi' },
];

export const WEIGHT_UNITS = [
  { key: 'mg', name: 'Milligram', symbol: 'mg' },
  { key: 'g', name: 'Gram', symbol: 'g' },
  { key: 'kg', name: 'Kilogram', symbol: 'kg' },
  { key: 'mt', name: 'Metric Ton', symbol: 't' },
  { key: 'oz', name: 'Ounce', symbol: 'oz' },
  { key: 'lb', name: 'Pound', symbol: 'lb' },
  { key: 'st', name: 'Stone', symbol: 'st' },
];

export const SPEED_UNITS = [
  { key: 'mps', name: 'Meter/second', symbol: 'm/s' },
  { key: 'kmh', name: 'Kilometer/hour', symbol: 'km/h' },
  { key: 'mph', name: 'Miles/hour', symbol: 'mph' },
  { key: 'knot', name: 'Knot', symbol: 'kn' },
  { key: 'fps', name: 'Feet/second', symbol: 'ft/s' },
];

export const TIME_UNITS = [
  { key: 'ms', name: 'Millisecond', symbol: 'ms' },
  { key: 's', name: 'Second', symbol: 's' },
  { key: 'min', name: 'Minute', symbol: 'min' },
  { key: 'h', name: 'Hour', symbol: 'h' },
  { key: 'd', name: 'Day', symbol: 'd' },
  { key: 'w', name: 'Week', symbol: 'w' },
  { key: 'm', name: 'Month (avg)', symbol: 'mo' },
  { key: 'y', name: 'Year (365d)', symbol: 'yr' },
];

// Temperature conversions
export function convertTemperature(value: number, from: 'C' | 'F' | 'K' | 'R', to: 'C' | 'F' | 'K' | 'R'): {
  success: boolean;
  result?: number;
  formula?: string;
  error?: string;
} {
  if (isNaN(value)) {
    return { success: false, error: 'Please enter a valid temperature value.' };
  }

  // Convert to Kelvin first
  let kelvin = 0;
  if (from === 'C') {
    kelvin = value + 273.15;
  } else if (from === 'F') {
    kelvin = ((value - 32) * 5) / 9 + 273.15;
  } else if (from === 'K') {
    kelvin = value;
  } else if (from === 'R') {
    kelvin = (value * 5) / 9;
  }

  if (kelvin < 0) {
    return { success: false, error: 'Temperature cannot be below Absolute Zero (0 Kelvin / -273.15°C).' };
  }

  let result = 0;
  let formula = '';
  if (to === 'C') {
    result = kelvin - 273.15;
    formula = '°C = K - 273.15';
  } else if (to === 'F') {
    result = ((kelvin - 273.15) * 9) / 5 + 32;
    formula = '°F = (°C × 9/5) + 32';
  } else if (to === 'K') {
    result = kelvin;
    formula = 'K = °C + 273.15';
  } else if (to === 'R') {
    result = (kelvin * 9) / 5;
    formula = '°R = K × 9/5';
  }

  return {
    success: true,
    result: Number(result.toFixed(4)),
    formula,
  };
}

// Length rates relative to 1 meter (base unit)
const LENGTH_TO_METERS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1.0,
  km: 1000.0,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  nmi: 1852.0,
};

export function convertLength(value: number, from: string, to: string): {
  success: boolean;
  result?: number;
  error?: string;
} {
  if (isNaN(value)) return { success: false, error: 'Please enter a valid length.' };
  if (value < 0) return { success: false, error: 'Length measurement cannot be negative.' };
  if (!LENGTH_TO_METERS[from] || !LENGTH_TO_METERS[to]) {
    return { success: false, error: 'Unsupported length unit.' };
  }

  const inMeters = value * LENGTH_TO_METERS[from];
  const converted = inMeters / LENGTH_TO_METERS[to];
  return {
    success: true,
    result: Number(converted.toPrecision(7)),
  };
}

// Weight rates relative to 1 kilogram (base unit)
const WEIGHT_TO_KG: Record<string, number> = {
  mg: 0.000001,
  g: 0.001,
  kg: 1.0,
  mt: 1000.0, // metric ton
  oz: 0.028349523125,
  lb: 0.45359237,
  st: 6.35029318, // stone
};

export function convertWeight(value: number, from: string, to: string): {
  success: boolean;
  result?: number;
  error?: string;
} {
  if (isNaN(value)) return { success: false, error: 'Please enter a valid weight.' };
  if (value < 0) return { success: false, error: 'Weight measurement cannot be negative.' };
  if (!WEIGHT_TO_KG[from] || !WEIGHT_TO_KG[to]) {
    return { success: false, error: 'Unsupported weight unit.' };
  }

  const inKg = value * WEIGHT_TO_KG[from];
  const converted = inKg / WEIGHT_TO_KG[to];
  return {
    success: true,
    result: Number(converted.toPrecision(7)),
  };
}

// Speed rates relative to 1 meter/second (base unit)
const SPEED_TO_MPS: Record<string, number> = {
  mps: 1.0,
  kmh: 1 / 3.6,
  mph: 0.44704,
  knot: 0.514444,
  fps: 0.3048,
};

export function convertSpeed(value: number, from: string, to: string): {
  success: boolean;
  result?: number;
  error?: string;
} {
  if (isNaN(value)) return { success: false, error: 'Please enter a valid speed value.' };
  if (value < 0) return { success: false, error: 'Speed magnitude cannot be negative.' };
  if (!SPEED_TO_MPS[from] || !SPEED_TO_MPS[to]) {
    return { success: false, error: 'Unsupported speed unit.' };
  }

  const inMps = value * SPEED_TO_MPS[from];
  const converted = inMps / SPEED_TO_MPS[to];
  return {
    success: true,
    result: Number(converted.toPrecision(7)),
  };
}

// Time rates relative to 1 second (base unit)
const TIME_TO_SECONDS: Record<string, number> = {
  ms: 0.001,
  s: 1.0,
  min: 60.0,
  h: 3600.0,
  d: 86400.0,
  w: 604800.0,
  m: 2629800.0, // average month (30.4375 days)
  y: 31557600.0, // average solar year (365.25 days)
};

export function convertTime(value: number, from: string, to: string): {
  success: boolean;
  result?: number;
  error?: string;
} {
  if (isNaN(value)) return { success: false, error: 'Please enter a valid time value.' };
  if (value < 0) return { success: false, error: 'Time value cannot be negative.' };
  if (!TIME_TO_SECONDS[from] || !TIME_TO_SECONDS[to]) {
    return { success: false, error: 'Unsupported time unit.' };
  }

  const inSec = value * TIME_TO_SECONDS[from];
  const converted = inSec / TIME_TO_SECONDS[to];
  return {
    success: true,
    result: Number(converted.toPrecision(7)),
  };
}

// Multi-category generic unit converter
export function convertGeneralUnit(
  category: 'length' | 'weight' | 'speed' | 'time' | 'temperature',
  value: number,
  from: string,
  to: string
) {
  if (category === 'temperature') {
    return convertTemperature(value, from as any, to as any);
  } else if (category === 'length') {
    return convertLength(value, from, to);
  } else if (category === 'weight') {
    return convertWeight(value, from, to);
  } else if (category === 'speed') {
    return convertSpeed(value, from, to);
  } else if (category === 'time') {
    return convertTime(value, from, to);
  }
  return { success: false, error: 'Invalid conversion category.' };
}

// Developer utilities: JSON, Base64, URL, UUID, Unix Timestamp, Regex

export function formatJSON(
  input: string,
  indent: number | 'tab' | 'minify' = 2,
  sortKeys: boolean = false
): { success: boolean; result?: string; error?: string } {
  if (!input || input.trim() === '') {
    return { success: false, error: 'Please provide JSON input to format.' };
  }

  try {
    const parsed = JSON.parse(input);

    const sortObjectKeys = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
      } else if (obj !== null && typeof obj === 'object') {
        const sorted: Record<string, any> = {};
        Object.keys(obj)
          .sort()
          .forEach(k => {
            sorted[k] = sortObjectKeys(obj[k]);
          });
        return sorted;
      }
      return obj;
    };

    const targetObj = sortKeys ? sortObjectKeys(parsed) : parsed;

    if (indent === 'minify') {
      return { success: true, result: JSON.stringify(targetObj) };
    }
    const space = indent === 'tab' ? '\t' : indent;
    return { success: true, result: JSON.stringify(targetObj, null, space) };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Invalid JSON syntax' };
  }
}

export function validateJSON(input: string): {
  isValid: boolean;
  message: string;
  type?: string;
  keysCount?: number;
  arrayLength?: number;
} {
  if (!input || input.trim() === '') {
    return { isValid: false, message: 'JSON input is empty.' };
  }

  try {
    const parsed = JSON.parse(input);
    const isArr = Array.isArray(parsed);
    const isObj = parsed !== null && typeof parsed === 'object' && !isArr;

    return {
      isValid: true,
      message: 'Valid JSON format!',
      type: isArr ? 'Array' : isObj ? 'Object' : typeof parsed,
      keysCount: isObj ? Object.keys(parsed).length : undefined,
      arrayLength: isArr ? parsed.length : undefined,
    };
  } catch (err: any) {
    return {
      isValid: false,
      message: err?.message || 'Malformed JSON syntax.',
    };
  }
}

// UTF-8 safe Base64 Encoder / Decoder
export function encodeBase64(input: string): { success: boolean; result?: string; error?: string } {
  try {
    // encode UTF-8 bytes to binary string
    const bytes = new TextEncoder().encode(input);
    let binString = '';
    for (let i = 0; i < bytes.length; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    const encoded = btoa(binString);
    return { success: true, result: encoded };
  } catch (err: any) {
    return { success: false, error: 'Failed to encode to Base64: ' + err?.message };
  }
}

export function decodeBase64(input: string): { success: boolean; result?: string; error?: string } {
  try {
    const clean = input.trim().replace(/\s/g, '');
    const binString = atob(clean);
    const bytes = Uint8Array.from(binString, m => m.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    return { success: true, result: decoded };
  } catch (err: any) {
    return { success: false, error: 'Invalid Base64 string: ' + (err?.message || 'decoding failed') };
  }
}

export function encodeUrl(input: string, componentMode: boolean = true): string {
  if (!input) return '';
  return componentMode ? encodeURIComponent(input) : encodeURI(input);
}

export function decodeUrl(input: string, componentMode: boolean = true): string {
  if (!input) return '';
  try {
    return componentMode ? decodeURIComponent(input) : decodeURI(input);
  } catch {
    return 'Error: Malformed URI sequence';
  }
}

export function generateUUIDs(
  count: number = 1,
  options: { uppercase?: boolean; hyphens?: boolean } = { uppercase: false, hyphens: true }
): string[] {
  const list: string[] = [];
  const safeCount = Math.max(1, Math.min(count, 100));

  for (let i = 0; i < safeCount; i++) {
    let id = '';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      // Fallback RFC4122 v4
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!options.hyphens) {
      id = id.replace(/-/g, '');
    }
    if (options.uppercase) {
      id = id.toUpperCase();
    }
    list.push(id);
  }

  return list;
}

export function convertUnixTimestamp(timestamp: number | string): {
  success: boolean;
  utcDate?: string;
  localDate?: string;
  isoDate?: string;
  relativeTime?: string;
  seconds?: number;
  milliseconds?: number;
  error?: string;
} {
  if (timestamp === '' || timestamp === null || timestamp === undefined) {
    return { success: false, error: 'Please enter a timestamp.' };
  }

  let num = Number(timestamp);
  if (isNaN(num)) {
    return { success: false, error: 'Timestamp must be numeric.' };
  }

  // Detect whether it is seconds or milliseconds
  // Seconds are typically ~10 digits, ms are ~13 digits
  let ms = num;
  let s = Math.floor(num);
  if (num < 10000000000) {
    // It's in seconds
    ms = num * 1000;
  } else {
    s = Math.floor(num / 1000);
  }

  const d = new Date(ms);
  if (isNaN(d.getTime())) {
    return { success: false, error: 'Timestamp results in an invalid date.' };
  }

  // Relative time
  const now = Date.now();
  const diffSec = Math.floor((now - ms) / 1000);
  let relativeTime = '';
  if (Math.abs(diffSec) < 60) {
    relativeTime = `${diffSec >= 0 ? diffSec : -diffSec} seconds ${diffSec >= 0 ? 'ago' : 'from now'}`;
  } else if (Math.abs(diffSec) < 3600) {
    const mins = Math.floor(Math.abs(diffSec) / 60);
    relativeTime = `${mins} minute${mins > 1 ? 's' : ''} ${diffSec >= 0 ? 'ago' : 'from now'}`;
  } else if (Math.abs(diffSec) < 86400) {
    const hrs = Math.floor(Math.abs(diffSec) / 3600);
    relativeTime = `${hrs} hour${hrs > 1 ? 's' : ''} ${diffSec >= 0 ? 'ago' : 'from now'}`;
  } else {
    const days = Math.floor(Math.abs(diffSec) / 86400);
    relativeTime = `${days} day${days > 1 ? 's' : ''} ${diffSec >= 0 ? 'ago' : 'from now'}`;
  }

  return {
    success: true,
    utcDate: d.toUTCString(),
    localDate: d.toLocaleString(),
    isoDate: d.toISOString(),
    relativeTime,
    seconds: s,
    milliseconds: ms,
  };
}

export function testRegex(
  pattern: string,
  flags: string,
  testString: string
): {
  isValidPattern: boolean;
  matchesCount: number;
  matches: Array<{ match: string; index: number; groups?: Record<string, string> }>;
  error?: string;
} {
  if (!pattern) {
    return { isValidPattern: false, matchesCount: 0, matches: [], error: 'Please enter a regex pattern.' };
  }

  try {
    const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    const matches: Array<{ match: string; index: number; groups?: Record<string, string> }> = [];
    let match: RegExpExecArray | null;

    let iterations = 0;
    while ((match = regex.exec(testString)) !== null && iterations < 500) {
      iterations++;
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.groups ? { ...match.groups } : undefined,
      });
      if (match[0].length === 0) {
        regex.lastIndex++; // avoid infinite loop on empty match
      }
    }

    return {
      isValidPattern: true,
      matchesCount: matches.length,
      matches,
    };
  } catch (err: any) {
    return {
      isValidPattern: false,
      matchesCount: 0,
      matches: [],
      error: err?.message || 'Invalid regular expression syntax.',
    };
  }
}

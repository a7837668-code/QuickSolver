// Text processing and statistics utilities

export interface TextStatistics {
  words: number;
  charactersWithSpaces: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  lines: number;
}

export function analyzeText(text: string): TextStatistics {
  if (!text || text.trim() === '') {
    return {
      words: 0,
      charactersWithSpaces: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      lines: 0,
    };
  }

  const charactersWithSpaces = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Words: match alphanumeric/word sequences
  const wordsArray = text.trim().match(/[\w\u00C0-\u024F\u1E00-\u1EFF'-]+/g);
  const words = wordsArray ? wordsArray.length : 0;

  // Sentences: match end punctuation followed by whitespace or end
  const sentenceMatches = text.match(/[.!?]+(?:\s+|$)/g);
  const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0);

  // Paragraphs
  const paragraphs = text
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0).length;

  // Lines
  const lines = text.split(/\r\n|\r|\n/).length;

  // Reading time at ~225 words per minute
  const readingTimeMinutes = Number((words / 225).toFixed(1));

  // Speaking time at ~140 words per minute
  const speakingTimeMinutes = Number((words / 140).toFixed(1));

  return {
    words,
    charactersWithSpaces,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    lines,
  };
}

export function convertCase(
  text: string,
  targetCase: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'pascal' | 'constant'
): string {
  if (!text) return '';

  switch (targetCase) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      );
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    case 'camel': {
      const words = text
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .split(/\s+/);
      return words
        .map((w, idx) =>
          idx === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
        )
        .join('');
    }
    case 'pascal': {
      const words = text
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .split(/\s+/);
      return words
        .map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
        .join('');
    }
    case 'snake':
      return text
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');
    case 'kebab':
      return text
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
    case 'constant':
      return text
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '_');
    default:
      return text;
  }
}

export function removeDuplicateLines(
  text: string,
  options: { caseSensitive: boolean; trimLines: boolean } = { caseSensitive: true, trimLines: false }
): { result: string; removedCount: number } {
  if (!text) return { result: '', removedCount: 0 };

  const rawLines = text.split(/\r\n|\r|\n/);
  const seen = new Set<string>();
  const output: string[] = [];
  let removedCount = 0;

  for (const line of rawLines) {
    let checkLine = options.trimLines ? line.trim() : line;
    if (!options.caseSensitive) {
      checkLine = checkLine.toLowerCase();
    }

    if (seen.has(checkLine)) {
      removedCount++;
    } else {
      seen.add(checkLine);
      output.push(line);
    }
  }

  return {
    result: output.join('\n'),
    removedCount,
  };
}

export function sortLines(
  text: string,
  mode: 'az' | 'za' | 'asc' | 'desc' | 'reverse' | 'length_asc' | 'length_desc' | 'natural',
  caseSensitive: boolean = false
): string {
  if (!text) return '';

  const lines = text.split(/\r\n|\r|\n/);

  if (mode === 'reverse') {
    return lines.reverse().join('\n');
  }

  lines.sort((a, b) => {
    if (mode === 'length_asc') return a.length - b.length;
    if (mode === 'length_desc') return b.length - a.length;

    const compA = caseSensitive ? a : a.toLowerCase();
    const compB = caseSensitive ? b : b.toLowerCase();

    if (mode === 'az' || mode === 'asc' || mode === 'natural') {
      return compA.localeCompare(compB, undefined, { numeric: true });
    } else {
      return compB.localeCompare(compA, undefined, { numeric: true });
    }
  });

  return lines.join('\n');
}

export function cleanText(
  text: string,
  options: {
    removeExtraSpaces: boolean;
    removeEmptyLines: boolean;
    trimLines: boolean;
    stripHtml: boolean;
  }
): string {
  if (!text) return '';

  let res = text;

  if (options.stripHtml) {
    res = res.replace(/<[^>]*>/g, '');
  }

  let lines = res.split(/\r\n|\r|\n/);

  if (options.trimLines) {
    lines = lines.map(l => l.trim());
  }

  if (options.removeExtraSpaces) {
    lines = lines.map(l => l.replace(/[ \t]+/g, ' '));
  }

  if (options.removeEmptyLines) {
    lines = lines.filter(l => l.length > 0);
  }

  return lines.join('\n');
}

export function generateSlug(text: string, separator: '-' | '_' = '-'): string {
  if (!text) return '';

  return text
    .normalize('NFD') // decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, '') // remove illegal chars
    .replace(/[\s_]+/g, separator) // replace spaces/underscores with separator
    .replace(new RegExp(`\\${separator}+`, 'g'), separator) // collapse repeats
    .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), ''); // trim edges
}

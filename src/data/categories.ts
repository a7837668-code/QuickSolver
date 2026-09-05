import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Accurate financial tools for loans, investments, salary projections, discounts, and margins.',
    icon: 'DollarSign',
    accentColor: 'blue',
  },
  {
    id: 'students',
    name: 'Students & Academics',
    slug: 'students',
    description: 'Essential GPA/CGPA calculators, attendance targets, grade predictors, and marks converters.',
    icon: 'GraduationCap',
    accentColor: 'indigo',
  },
  {
    id: 'date-time',
    name: 'Date & Time',
    slug: 'date-time',
    description: 'Age calculations, exact date durations, business days, and time interval breakdowns.',
    icon: 'Calendar',
    accentColor: 'emerald',
  },
  {
    id: 'converters',
    name: 'Converters',
    slug: 'converters',
    description: 'High-precision unit conversions for temperature, length, mass, speed, and duration.',
    icon: 'ArrowLeftRight',
    accentColor: 'amber',
  },
  {
    id: 'text',
    name: 'Text Tools',
    slug: 'text',
    description: 'Word & character count, line sorting, case transformations, duplicate line cleaner, and slug generator.',
    icon: 'FileText',
    accentColor: 'purple',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    slug: 'developer',
    description: 'JSON formatters, Base64 codecs, UUID generators, Unix epoch converters, and regex testers.',
    icon: 'Code2',
    accentColor: 'cyan',
  },
  {
    id: 'image',
    name: 'Image Tools',
    slug: 'image',
    description: 'Fast, browser-based image compression, resizing, format conversion (JPG/PNG/WebP), and cropping.',
    icon: 'Image',
    accentColor: 'rose',
  },
];

export function getCategoryById(id: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.id === id || c.slug === id);
}

export const getCategoryBySlug = getCategoryById;

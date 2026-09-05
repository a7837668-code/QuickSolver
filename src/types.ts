export type ToolCategory = 
  | 'finance'
  | 'students'
  | 'date-time'
  | 'converters'
  | 'text'
  | 'developer'
  | 'image';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  slug: string; // e.g. "percentage-calculator"
  category: ToolCategory;
  name: string;
  shortDescription: string;
  metaDescription: string;
  icon: string;
  featured?: boolean;
  popular?: boolean;
  tags: string[];
  formulaTitle?: string;
  formula?: string;
  calculationLogic?: string[];
  assumptions?: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  accentColor: string;
  toolCount?: number;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  toolSlug?: string;
}

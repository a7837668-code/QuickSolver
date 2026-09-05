import React, { useEffect } from 'react';
import { BreadcrumbItem, FAQItem } from '../../types';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  type?: 'website' | 'article' | 'application';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords = [],
  breadcrumbs = [],
  faqs = [],
  type = 'website',
}) => {
  useEffect(() => {
    // 1. Update Page Title
    const fullTitle = title.includes('QuickSolve') ? title : `${title} – QuickSolve`;
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper for link tags
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // 2. Set Meta Description and Keywords
    setMeta('name', 'description', description);
    if (keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }

    // 3. Set Canonical Link
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://quicksolve.tools';
    const fullCanonicalUrl = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;
    setLink('canonical', fullCanonicalUrl);

    // 4. OpenGraph & Twitter
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullCanonicalUrl);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);

    // 5. Inject Structured JSON-LD Data
    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'QuickSolve',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];

    if (type === 'application') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description: description,
        url: fullCanonicalUrl,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      });
    }

    if (breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url.startsWith('/') ? item.url : '/' + item.url}`,
        })),
      });
    }

    if (faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Clean existing json-ld injected scripts
    const existingScript = document.getElementById('quicksolve-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const scriptTag = document.createElement('script');
    scriptTag.id = 'quicksolve-structured-data';
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schemas);
    document.head.appendChild(scriptTag);

    return () => {
      const el = document.getElementById('quicksolve-structured-data');
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, keywords, breadcrumbs, faqs, type]);

  return null;
};

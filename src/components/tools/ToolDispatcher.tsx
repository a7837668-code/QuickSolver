import React, { useEffect } from 'react';
import { getToolBySlug } from '../../data/tools';
import { ToolLayout } from '../common/ToolLayout';
import { FinanceTools } from './FinanceTools';
import { StudentTools } from './StudentTools';
import { DateTimeTools } from './DateTimeTools';
import { ConverterTools } from './ConverterTools';
import { TextTools } from './TextTools';
import { DeveloperTools } from './DeveloperTools';
import { ImageTools } from './ImageTools';
import { addRecentTool } from '../../utils/recentTools';
import { Link } from '../../utils/router';

interface ToolDispatcherProps {
  slug: string;
}

export const ToolDispatcher: React.FC<ToolDispatcherProps> = ({ slug }) => {
  const tool = getToolBySlug(slug);

  useEffect(() => {
    if (slug) {
      addRecentTool(slug);
    }
  }, [slug]);

  if (!tool) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tool Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          The tool you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          Return to QuickSolve Home
        </Link>
      </div>
    );
  }

  const renderToolComponent = () => {
    switch (tool.category) {
      case 'finance':
        return <FinanceTools toolSlug={tool.slug} />;
      case 'students':
        return <StudentTools toolSlug={tool.slug} />;
      case 'date-time':
        return <DateTimeTools toolSlug={tool.slug} />;
      case 'converters':
        return <ConverterTools toolSlug={tool.slug} />;
      case 'text':
        return <TextTools toolSlug={tool.slug} />;
      case 'developer':
        return <DeveloperTools toolSlug={tool.slug} />;
      case 'image':
        return <ImageTools toolSlug={tool.slug} />;
      default:
        return <div>Tool coming soon</div>;
    }
  };

  return <ToolLayout tool={tool}>{renderToolComponent()}</ToolLayout>;
};

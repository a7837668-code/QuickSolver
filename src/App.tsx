import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { ThemeProvider } from './utils/theme';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './components/pages/HomePage';
import { CategoryPage } from './components/pages/CategoryPage';
import { LegalPages } from './components/pages/LegalPages';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPage } from './components/pages/AdminPage';
import { ToolDispatcher } from './components/tools/ToolDispatcher';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut (Cmd+K / Ctrl+K / slash) to trigger global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  // Route matching
  const renderCurrentView = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 2. Category Pages: /category/:slug
    if (currentPath.startsWith('/category/')) {
      const categorySlug = currentPath.replace('/category/', '').split('/')[0];
      return <CategoryPage categorySlug={categorySlug} />;
    }

    // 3. Admin Console
    if (currentPath === '/admin') {
      return <AdminPage />;
    }

    // 4. Contact & Support
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 5. Legal Pages
    if (currentPath === '/privacy-policy') {
      return <LegalPages pageType="privacy" />;
    }
    if (currentPath === '/terms') {
      return <LegalPages pageType="terms" />;
    }
    if (currentPath === '/disclaimer') {
      return <LegalPages pageType="disclaimer" />;
    }

    // 6. Tool Pages: /:toolSlug
    const toolSlug = currentPath.replace(/^\//, '').split('/')[0];
    return <ToolDispatcher slug={toolSlug} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}

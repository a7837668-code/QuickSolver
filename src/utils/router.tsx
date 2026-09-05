import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  path: string;
  currentPath: string;
  navigate: (to: string, replace?: boolean) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: typeof window !== 'undefined' ? window.location.pathname : '/',
  currentPath: typeof window !== 'undefined' ? window.location.pathname : '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, replace: boolean = false) => {
    if (typeof window === 'undefined') return;
    if (to === path) return;

    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, currentPath: path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export function Link({
  to,
  children,
  className = '',
  title,
  id,
  target,
  rel,
  onClick,
  ...rest
}: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // If modifier keys or external target, let browser handle normally
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      target === '_blank' ||
      to.startsWith('http') ||
      to.startsWith('mailto:') ||
      to.startsWith('tel:')
    ) {
      return;
    }

    e.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      title={title}
      id={id}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  );
}

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Set initial state to false/true based on the expected mobile breakpoint
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list only on client side
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Add listener
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
} 
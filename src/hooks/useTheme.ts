import { useState } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#0b0c10' : '#f7f8fc');
    try {
      localStorage.setItem('nk-theme', next);
    } catch {
      /* Theme remains usable without storage. */
    }
  };
  return { theme, toggle };
}

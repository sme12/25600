export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );
  const color = themeColor?.dataset[theme];
  if (themeColor && color) themeColor.content = color;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (blocked cookies, sandboxed frame);
    // the theme still applies for the session.
  }
}

export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

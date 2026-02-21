import { useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

export function useNavbarTheme() {
  const navbarRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    if (sections.length === 0) return;

    const intersecting = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        }

        // Pick the bottom-most intersecting section (last in DOM order)
        // to ensure the theme updates as expected when scrolling up and down the page.
        let active: HTMLElement | undefined;
        sections.forEach((s) => {
          if (intersecting.has(s)) active = s;
        });

        if (active) {
          setTheme(active.dataset.section === 'dark' ? 'dark' : 'light');
        }
      },
      {
        root: null,
        rootMargin: '-8px 0px -93% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return { theme, navbarRef };
}

import { useEffect, useRef } from 'react';
import styles from './FrostBackdrop.module.css';

const LAYERS = [
  { blur: 1, end: 100 },
  { blur: 1, end: 95 },
  { blur: 2, end: 90 },
  { blur: 2, end: 85 },
  { blur: 3, end: 80 },
  { blur: 4, end: 75 },
  { blur: 5, end: 70 },
  { blur: 6, end: 65 },
  { blur: 8, end: 60 },
  { blur: 10, end: 55 },
  { blur: 12, end: 50 },
  { blur: 16, end: 45 },
];

const MASK_START = `rgba(0,0,0,var(--mask-opacity,1))`;
const SCROLL_FADE_DISTANCE = 300; // px to scroll before frost is fully opaque

export function FrostBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const opacity = Math.min(window.scrollY / SCROLL_FADE_DISTANCE, 1);
          el!.style.setProperty('--mask-opacity', String(opacity));
          ticking = false;
        });
        ticking = true;
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className={styles.frostContainer} aria-hidden="true">
      {LAYERS.map(({ blur, end }, i) => (
        <div
          key={i}
          className={styles.frostLayer}
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(to bottom, ${MASK_START} 40%, transparent ${end}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, ${MASK_START} 40%, transparent ${end}%)`,
          }}
        />
      ))}
    </div>
  );
}

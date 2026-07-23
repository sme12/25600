import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { HeroCopy } from '#/components/hero';
import { LOUPE_SIZE, LOUPE_ZOOM } from '#/lib/constants';

const HERO_W = 1040;
const INNER_H = 248;
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// Resting spot near the hero's right side; resting sample point is the
// accent "%" in the headline.
const REST = { px: 840, py: 150, qx: 585, qy: 70 };

const R = LOUPE_SIZE / 2;
const S = LOUPE_ZOOM;

export function Loupe({
  heroRef,
  copyRef,
}: {
  heroRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLElement | null>;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!hero || !outer || !inner) return;

    // Bounding box (viewport coords) of the headline + paragraph text, so
    // the loupe only tracks over the copy and not the empty right side.
    const copyBox = () => {
      const els = copyRef.current?.querySelectorAll('h1, p');
      if (!els || els.length === 0) return null;
      let left = Infinity;
      let top = Infinity;
      let right = -Infinity;
      let bottom = -Infinity;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        left = Math.min(left, r.left);
        top = Math.min(top, r.top);
        right = Math.max(right, r.right);
        bottom = Math.max(bottom, r.bottom);
      });
      return { left, top, right, bottom };
    };

    const place = (px: number, py: number, qx: number, qy: number) => {
      outer.style.left = `${px - R}px`;
      outer.style.top = `${py - R}px`;
      inner.style.transform = `translate(${R - qx * S}px, ${R - qy * S}px) scale(${S})`;
    };

    const rest = () => {
      activeRef.current = false;
      hero.style.cursor = '';
      outer.style.transition = `left 0.6s ${EASE}, top 0.6s ${EASE}`;
      inner.style.transition = `transform 0.6s ${EASE}, opacity 0.3s ease`;
      inner.style.opacity = '0';
      place(REST.px, REST.py, REST.qx, REST.qy);
    };

    const move = (e: MouseEvent) => {
      const box = copyBox();
      const overText =
        box !== null &&
        e.clientX >= box.left &&
        e.clientX <= box.right &&
        e.clientY >= box.top &&
        e.clientY <= box.bottom;
      if (!overText) {
        if (activeRef.current) rest();
        return;
      }
      // Sample in the hero's own 1040px coordinate space in case the
      // page is render-scaled.
      const rect = hero.getBoundingClientRect();
      const scale = rect.width / HERO_W;
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      if (!activeRef.current) {
        activeRef.current = true;
        hero.style.cursor = 'none';
        outer.style.transition = 'none';
        inner.style.transition = 'opacity 0.2s ease';
        inner.style.opacity = '1';
      }
      place(x, y, x, y);
    };

    hero.addEventListener('mousemove', move, { passive: true });
    hero.addEventListener('mouseleave', rest);
    return () => {
      hero.removeEventListener('mousemove', move);
      hero.removeEventListener('mouseleave', rest);
      hero.style.cursor = '';
    };
  }, [heroRef, copyRef]);

  return (
    <div
      ref={outerRef}
      aria-hidden
      className="pointer-events-none absolute z-[5] overflow-hidden rounded-full border border-loupe-border bg-bg shadow-loupe"
      style={{
        width: LOUPE_SIZE,
        height: LOUPE_SIZE,
        left: REST.px - R,
        top: REST.py - R,
        transition: `left 0.6s ${EASE}, top 0.6s ${EASE}`,
      }}
    >
      <div
        ref={innerRef}
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: HERO_W,
          height: INNER_H,
          opacity: 0,
          transform: `translate(${R - REST.qx * S}px, ${R - REST.qy * S}px) scale(${S})`,
          transition: `transform 0.6s ${EASE}, opacity 0.3s ease`,
        }}
      >
        <div className="absolute inset-0 h-[300px] w-[1040px] bg-bg px-12 pt-11">
          <HeroCopy />
        </div>
      </div>
      <div
        className="bg-grid-loupe absolute inset-0 rounded-full"
        style={{ boxShadow: 'inset 0 0 0 6px var(--loupe-inset)' }}
      />
    </div>
  );
}

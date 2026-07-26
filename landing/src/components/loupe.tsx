import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { HeroCopy } from '#/components/hero-copy';
import { HERO_WIDTH, LOUPE_SIZE, LOUPE_ZOOM } from '#/lib/constants';

const INNER_H = 248;
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// Resting spot near the hero's right side; resting sample point is the
// accent "%" in the headline.
const REST = { px: 840, py: 150, qx: 585, qy: 70 };

const R = LOUPE_SIZE / 2;
const S = LOUPE_ZOOM;

// Handle: a pill on the down-right diagonal (matches the favicon), its near end
// tucked under the glass so the frame reads as extending into a grip.
const HANDLE_LEN = 110; // length along the diagonal
const HANDLE_W = 32; // thickness
const HANDLE_TUCK = 12; // how far the near end hides under the rim
const HANDLE_ANGLE = 54; // degrees from +x (45 = radial down-right; higher swings it left)
// Cylindrical grip shading; edges darkened to the frame color so the silhouette
// reads on the light side too.
const HANDLE_BG =
  'linear-gradient(to bottom, var(--loupe-shade) 0%, var(--bg) 15%, var(--loupe-sheen) 40%, var(--bg) 66%, var(--loupe-shade) 100%)';
const HANDLE_RAD = (HANDLE_ANGLE * Math.PI) / 180;
const HANDLE_X = R + (R - HANDLE_TUCK) * Math.cos(HANDLE_RAD); // near-end anchor
const HANDLE_Y = R + (R - HANDLE_TUCK) * Math.sin(HANDLE_RAD);

// Rim bezel: the frame's rounded cross-section (dark edges, bright middle),
// radial so the glass shares the handle's tube-like depth.
const RIM_BG =
  'radial-gradient(circle closest-side, transparent 0 89.5%, var(--loupe-shade) 91%, var(--bg) 93%, var(--loupe-sheen) 95.5%, var(--bg) 98%, var(--loupe-shade) 100%)';

// Grid origin, in loupe-local coords, for a sample point (qx, qy) in hero
// space — identical to the zoomed content's origin, so the two travel as one.
const gridPos = (qx: number, qy: number) => `${R - qx * S}px ${R - qy * S}px`;

export function Loupe({
  heroRef,
  copyRef,
}: {
  heroRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLElement | null>;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const grid = gridRef.current;
    if (!hero || !outer || !inner || !grid) return;

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
      outer.style.transform = `translate(${px - R}px, ${py - R}px)`;
      inner.style.transform = `translate(${R - qx * S}px, ${R - qy * S}px) scale(${S})`;
      // The grid belongs to the magnified canvas, not to the glass: share the
      // zoomed content's origin so it stays pinned to what's underneath and
      // only the window over it moves.
      grid.style.backgroundPosition = gridPos(qx, qy);
    };

    const rest = () => {
      activeRef.current = false;
      hero.style.cursor = '';
      outer.style.transition = `transform 0.6s ${EASE}`;
      inner.style.transition = `transform 0.6s ${EASE}, opacity 0.3s ease`;
      grid.style.transition = `background-position 0.6s ${EASE}`;
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
      const scale = rect.width / HERO_WIDTH;
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      if (!activeRef.current) {
        activeRef.current = true;
        hero.style.cursor = 'none';
        outer.style.transition = 'none';
        inner.style.transition = 'opacity 0.2s ease';
        grid.style.transition = 'none';
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
      className="pointer-events-none absolute top-0 left-0 z-[5]"
      style={{
        width: LOUPE_SIZE,
        height: LOUPE_SIZE,
        transform: `translate(${REST.px - R}px, ${REST.py - R}px)`,
        transition: `transform 0.6s ${EASE}`,
      }}
    >
      {/* Handle: pill on the 45° diagonal, rotated about its near end (which is
          tucked under the glass) so the frame appears to extend into a grip. */}
      <div
        className="absolute rounded-full shadow-loupe"
        style={{
          width: HANDLE_LEN,
          height: HANDLE_W,
          left: HANDLE_X,
          top: HANDLE_Y - HANDLE_W / 2,
          background: HANDLE_BG,
          transform: `rotate(${HANDLE_ANGLE}deg)`,
          transformOrigin: '0 50%',
        }}
      />
      <div className="absolute inset-0 overflow-hidden rounded-full border border-loupe-shade bg-bg shadow-loupe">
        <div
          ref={innerRef}
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: HERO_WIDTH,
            height: INNER_H,
            opacity: 0,
            transform: `translate(${R - REST.qx * S}px, ${R - REST.qy * S}px) scale(${S})`,
            transition: `transform 0.6s ${EASE}, opacity 0.3s ease`,
          }}
        >
          <div
            className="absolute inset-0 h-[300px] bg-bg px-12 pt-11"
            style={{ width: HERO_WIDTH }}
          >
            <HeroCopy />
          </div>
        </div>
        <div
          ref={gridRef}
          className="bg-grid-loupe absolute inset-0 rounded-full"
          style={{
            backgroundPosition: gridPos(REST.qx, REST.qy),
            transition: `background-position 0.6s ${EASE}`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: RIM_BG }}
        />
      </div>
    </div>
  );
}

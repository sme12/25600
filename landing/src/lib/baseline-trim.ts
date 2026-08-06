import { lineMetrics, resetLineMetrics } from '#/lib/text-box';

/**
 * Cell size of the canvas grid the loupe paints, in hero px. Keep in step with
 * `bg-grid-loupe`, which draws it at `GRID * LOUPE_ZOOM` on screen.
 */
const GRID = 8;

/**
 * Pad a text block so its first baseline lands on the grid.
 *
 * A block's first baseline sits `rise` below its content top, where `rise` is
 * half the leading plus the font's own asymmetry. Spend one whole grid cell on
 * padding and split it either side of that overhang — `GRID - rise % GRID` on
 * top, `rise % GRID` underneath — and the baselines come onto the lines while
 * the border box stays a whole number of cells tall. Given a block whose top
 * edge is itself on the grid, box and baselines then both meet it.
 *
 * The values go on `:root` rather than the element so the hero and the loupe's
 * duplicate of it trim identically, and because `styles.css` needs somewhere to
 * fall back from.
 */
function trim(el: Element, name: string) {
  const { baseline } = lineMetrics(getComputedStyle(el));
  const over = baseline % GRID;
  const root = document.documentElement.style;
  root.setProperty(`--trim-${name}-top`, `${GRID - over}px`);
  root.setProperty(`--trim-${name}-bottom`, `${over}px`);
}

/**
 * Measure the hero copy and publish its trims, then do it again once webfonts
 * have settled — until then the metrics belong to the fallback face.
 *
 * Measuring beats computing the rise from Inter's tables: Blink, WebKit and
 * Gecko each round a font's ascent and descent differently before laying out a
 * line box, and the loupe multiplies that fraction of a px by LOUPE_ZOOM.
 * `styles.css` carries the arithmetic as a fallback, so the correction applied
 * here is only ever a fraction of a px and never reads as a shift.
 */
export function applyBaselineTrim(copy: HTMLElement) {
  const measure = () => {
    const h1 = copy.querySelector('h1');
    const p = copy.querySelector('p');
    if (h1) trim(h1, 'display');
    if (p) trim(p, 'body');
  };

  measure();

  let stale = false;
  void document.fonts.ready.then(() => {
    if (stale) return;
    resetLineMetrics();
    measure();
  });

  return () => {
    stale = true;
  };
}

/**
 * Geometry of a text element, in hero-space px: its border box plus the y of
 * every rendered baseline — the two things Figma draws over a selected text
 * layer.
 */
export type TextBox = {
  left: number;
  top: number;
  width: number;
  height: number;
  baselines: number[];
};

type LineMetrics = {
  /** Height of one line box. */
  lineHeight: number;
  /** Distance from a line box's top edge down to its baseline. */
  baseline: number;
};

const cache = new Map<string, LineMetrics>();

/**
 * Drop every cached measurement. Worth doing once webfonts have settled: the
 * cache key describes the requested font, not the one that was actually
 * available when the probe ran, so entries measured against the fallback face
 * would otherwise stand forever.
 */
export function resetLineMetrics() {
  cache.clear();
}

/**
 * Measure a font's line box by laying one out and asking the browser where the
 * baseline landed.
 *
 * Canvas `TextMetrics` looks like the shortcut here, but `fontBoundingBox*`
 * reports the font's ink bounding box rather than the ascent/descent that line
 * boxes are actually built from, and engines don't agree on it — so half-leading
 * derived from it is off by a pixel or two. A probe can't drift: a zero-height
 * inline-block sits with its bottom margin edge exactly on the baseline, so its
 * offset from the line box top *is* the baseline.
 *
 * The probe is appended to `<body>`, outside any render-scaled subtree, so it
 * reports plain unscaled CSS px.
 */
export function lineMetrics(cs: CSSStyleDeclaration): LineMetrics {
  const key = `${cs.fontStyle}|${cs.fontWeight}|${cs.fontSize}|${cs.fontFamily}|${cs.lineHeight}|${cs.fontVariationSettings}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const probe = document.createElement('div');
  probe.style.cssText =
    'position:absolute;top:0;left:-9999px;visibility:hidden;white-space:nowrap';
  probe.style.fontStyle = cs.fontStyle;
  probe.style.fontWeight = cs.fontWeight;
  probe.style.fontSize = cs.fontSize;
  probe.style.fontFamily = cs.fontFamily;
  probe.style.fontVariationSettings = cs.fontVariationSettings;
  probe.style.lineHeight = cs.lineHeight;

  const strut = document.createElement('span');
  strut.style.cssText = 'display:inline-block;width:0;height:0';
  probe.append('x', strut);
  document.body.append(probe);

  const box = probe.getBoundingClientRect();
  const out = {
    lineHeight: box.height,
    baseline: strut.getBoundingClientRect().bottom - box.top,
  };
  probe.remove();

  cache.set(key, out);
  return out;
}

/**
 * Measure `el` relative to `origin` (the hero's viewport rect), undoing
 * `scale` so the result is in the hero's own coordinate space.
 */
export function measureTextBox(
  el: Element,
  origin: DOMRect,
  scale: number
): TextBox {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const { lineHeight, baseline } = lineMetrics(cs);

  const left = (r.left - origin.left) / scale;
  const top = (r.top - origin.top) / scale;
  const width = r.width / scale;
  const height = r.height / scale;

  const padTop = parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth);
  const padBottom =
    parseFloat(cs.paddingBottom) + parseFloat(cs.borderBottomWidth);
  const lines = Math.max(
    1,
    Math.round((height - padTop - padBottom) / lineHeight)
  );
  const first = top + padTop + baseline;

  return {
    left,
    top,
    width,
    height,
    baselines: Array.from({ length: lines }, (_, i) => first + i * lineHeight),
  };
}

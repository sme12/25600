Here is the full implementation spec based on the live DOM inspection of Clerk's Product dropdown:

---

# Spec: Product Nav Dropdown with Slide-in Submenu

## Overview

A two-panel navigation mega-dropdown triggered by hovering a nav button. The left panel shows top-level nav items with icons; hovering each item swaps the right panel (submenu) content via a `grid-template-columns` transition that makes the right column "slide in." Built with **Base UI `<Popup>`** or **`<Menu>`** primitives + **CSS Modules**.

---

## 1. Data Model

```ts
// nav.types.ts

interface SubItem {
  label: string; // e.g. "<SignUp />"
  href: string;
  isMono?: boolean; // true = render in monospace
  badge?: string; // e.g. "Docs" — appears on hover
}

interface SubSection {
  heading: string; // e.g. "Authentication Components"
  items: SubItem[];
}

interface NavItem {
  label: string; // e.g. "User Authentication"
  href: string;
  description: string; // e.g. "For effortless sign-up, sign-in, and user profiles"
  icon: React.ReactNode;
  tag?: string; // e.g. "Beta"
  subSection: SubSection;
  isActive?: boolean; // first item starts active/hovered
}
```

**Actual data extracted from the page:**

```ts
const productsNav: NavItem[] = [
  {
    label: "User Authentication",
    href: "/user-authentication",
    description: "For effortless sign-up, sign-in, and user profiles",
    icon: <UserAuthIcon />,   // 24×24 SVG, see §5
    subSection: {
      heading: "Authentication Components",
      items: [
        { label: "<SignUp />",       href: "/components/sign-up",        isMono: true },
        { label: "<SignIn />",       href: "/components/sign-in",        isMono: true },
        { label: "<UserButton />",   href: "/docs/…/user-button",        isMono: true, badge: "Docs" },
        { label: "<UserProfile />",  href: "/docs/…/user-profile",       isMono: true, badge: "Docs" },
        { label: "<Waitlist />",     href: "/docs/…/waitlist",           isMono: true, badge: "Docs" },
      ]
    }
  },
  {
    label: "B2B Authentication",
    href: "/organizations",
    description: "For powering multi-tenant teams and roles",
    icon: <B2BIcon />,        // 22×17 SVG, see §5
    subSection: {
      heading: "B2B Authentication Components",
      items: [
        { label: "<CreateOrganization />",   href: "…", isMono: true },
        { label: "<OrganizationSwitcher />", href: "…", isMono: true },
        { label: "<OrganizationProfile />",  href: "…", isMono: true },
        { label: "<OrganizationList />",     href: "…", isMono: true },
      ]
    }
  },
  {
    label: "Billing",
    href: "/billing",
    description: "For handling subscriptions plans and payments",
    icon: <BillingIcon />,    // 24×24 SVG, see §5
    tag: "Beta",
    subSection: {
      heading: "Billing Components",
      items: [
        { label: "<PricingTable />",   href: "…", isMono: true },
        { label: "<CheckoutButton />", href: "…", isMono: true },
      ]
    }
  }
];
```

---

## 2. Component Tree

```
<nav>                              // ml-3, hidden on mobile
  <ul>                             // group/nav, flex, items-center
    <li>                           // relative flex
      <NavTriggerButton />         // Base UI Trigger or plain button with onMouseEnter
      <NavDropdownPanel />         // absolute positioned panel
        <div.grid>                 // two-column CSS grid (the key animation target)
          <LeftPanel />            // col 1 — nav items with icons
          <RightPanel />           // col 2 — slide-in submenu
        </div.grid>
    </li>
  </ul>
</nav>
```

---

## 3. Component Specs

### `<NavTriggerButton>`

**Behaviour:** Opens dropdown on hover (`onMouseEnter`), closes on `onMouseLeave` from the entire `<li>` group. Radix NavigationMenu or Base UI Popup is suitable.

**Markup:**

```html
<button data-state="open|closed">
  <span>
    <!-- Animated chevron indicator -->
    <span class="{styles.chevronWrap}">
      <!-- SVG chevron DOWN — visible when closed -->
      <svg viewBox="0 0 8 4" class="{styles.chevronDown}">…</svg>
      <!-- SVG chevron DOWN — rotated 180°, visible when open -->
      <svg viewBox="0 0 8 4" class="{styles.chevronUp}">…</svg>
    </span>
    Products
  </span>
</button>
```

**Key class behaviours:**

- Button has `data-[state=open]:after:absolute data-[state=open]:after:top-full data-[state=open]:after:h-4 data-[state=open]:after:w-full` — a pseudo-element "bridge" that fills the gap between the button and dropdown so hover doesn't break when moving the cursor down.

**Chevron SVG path** (same shape used for both, second one is rotated 180°):

```
M6.17574 0.175736C6.41005 -0.0585787 6.78908 -0.0585787 7.02339 0.175736
C7.25771 0.410051 7.25771 0.789078 7.02339 1.02339L4.7314 3.31636
C4.10656 3.9412 3.09257 3.9412 2.46773 3.31636L0.175736 1.02339
C-0.0585787 0.789078 -0.0585787 0.410051 0.175736 0.175736
C0.410051 -0.0585787 0.789078 -0.0585787 1.02339 0.175736
L3.31636 2.46773C3.47257 2.62394 3.72656 2.62394 3.88277 2.46773Z
```

---

### `<NavDropdownPanel>` (the popup)

**Positioning:** `position: absolute; top: 100%; margin-top: 0.875rem; left: -6rem;` on desktop, `left: -0.75rem` on large screens. Uses `transform-origin: top center`.

**Entry animation (inline style set by JS/motion library):**

- Closed: `opacity: 0; transform: scale(0.97);`
- Open: `opacity: 1; transform: scale(1);`
- Transition: the `will-change-transform` class + CSS `transition: opacity 150ms, transform 150ms cubic-bezier(0.33,1,0.68,1)`.

---

### `<GridWrapper>` — the two-column grid (⭐ key animation)

This is the element that drives the slide-in effect.

```css
/* grid.module.css */
.grid {
  display: grid;
  grid-template-columns: 1fr 0px; /* collapsed: no right column */
  transition: grid-template-columns 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  box-shadow:
    0 0 0 0.5px rgba(19, 19, 22, 0.1),
    0 16px 36px -6px rgba(25, 28, 33, 0.2),
    0 8px 16px -3px rgba(0, 0, 0, 0.08),
    0 0 0 0.5px rgba(255, 255, 255, 0.7) inset;
  border-radius: 0.75rem;
  /* background + shadow via inline arbitrary values: */
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.03) 100%),
    rgba(247, 247, 248, 0.95);
  overflow: clip; /* clips the right panel cleanly */
}

/* When a left-panel item is hovered, JS sets: */
.grid[data-submenu-open='true'] {
  grid-template-columns: 1fr 17.5rem; /* expands right column to 280px */
}
```

The transition on `grid-template-columns` from `1fr 0px` → `1fr 17.5rem` IS the slide-in. Because `overflow: clip` is set on the grid, the right panel is invisible when its column is 0px wide, then slides in as the column expands.

---

### `<LeftPanel>` — Nav items with icons

```css
.leftPanel {
  position: relative;
  z-index: 30;
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.7) inset,
    0 0 0 0.5px rgba(19, 19, 22, 0.1),
    0 1px 1px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.75rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 10%,
    rgba(247, 247, 247, 0.9) 90%
  );
  width: fit-content;
  max-width: 36rem;
  overflow: clip;
}

.leftInner {
  position: relative;
  z-index: 10;
  border-radius: 0.75rem;
  padding: 0.5rem;
  width: max-content;
  height: 100%;
}

.sectionLabel {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  padding: 0.375rem 0.75rem 0 0.75rem;
  color: #4b5563; /* gray-600 */
  font-weight: 500;
  /* Uses custom "tag-1" typography class: */ /* "PRODUCTS" uppercase tag */
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.navList {
  display: flex;
  flex-direction: column;
}
```

**Each nav item `<a>`:**

```css
.navItemLink {
  display: block;
  transition:
    color 150ms cubic-bezier(0.33, 1, 0.68, 1),
    background-color 150ms cubic-bezier(0.33, 1, 0.68, 1),
    border-color 150ms cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 150ms cubic-bezier(0.33, 1, 0.68, 1);
  border: 0.5px solid transparent;
  border-radius: 0.5rem;
  background: transparent;
  padding: 0.5rem 0.75rem;
}

/* Active/hovered item (when submenu is showing for this item): */
.navItemLink[data-active='true'] {
  border-color: rgba(19, 19, 22, 0.12);
  background: rgba(19, 19, 22, 0.02);
}

.navItemRow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  pointer-events: none;
}
```

**Icon wrapper:**

```css
.iconWrap {
  display: flex;
  position: relative;
  flex: none;
  justify-content: center;
  align-items: center;
  transition:
    background-color 450ms cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 450ms cubic-bezier(0.33, 1, 0.68, 1);
  box-shadow:
    0 1px 0 0 #fff inset,
    0 2px 2px -1px rgba(0, 0, 0, 0.2),
    0 0 0 0.5px rgba(19, 19, 22, 0.16);
  border-radius: 0.375rem;
  background: #f9fafb; /* gray-25 */
  padding: 0.25rem;
  width: 2rem; /* size-8 */
  height: 2rem;
  overflow: clip;
}

.iconSvg {
  filter: drop-shadow(0 0.5px 0 rgba(255, 255, 255, 0.4))
    drop-shadow(0 2px 1px rgba(0, 0, 0, 0.15));
  transition: color 450ms cubic-bezier(0.33, 1, 0.68, 1);
  width: 100%;
  height: 100%;
  color: #030712; /* gray-950 */
}
```

**Text block:**

```css
.navItemTitle {
  display: flex;
  align-items: center;
  gap: 0.375rem; /* for the badge */
  transition: color 450ms cubic-bezier(0.33, 1, 0.68, 1);
  color: #030712;
  font-weight: 500;
  font-size: 0.875rem; /* label-3 */
}

.navItemDesc {
  transition: color 150ms;
  color: #111827; /* on active item: black / on rest: gray-600 */
  /* body-3 */
  font-size: 0.75rem;
}

.betaBadge {
  display: inline-block;
  border-radius: 0.2rem;
  background: #eff6ff; /* blue-50 */
  padding: 0.09375rem 0.21875rem;
  color: #3b82f6; /* blue-500 */
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 0.875rem;
}
```

---

### `<RightPanel>` — Slide-in submenu

```css
.rightPanel {
  position: relative;
  z-index: 10;
  background: linear-gradient(180deg, #f7f7f8 0%, #f1f1f2 100%);
}

/* A 30px pseudo-element bleeds LEFT to cover the rounded corner seam: */
.rightPanel::before {
  position: absolute;
  top: 0;
  left: -30px;
  background: linear-gradient(180deg, #f7f7f8 0%, #f1f1f2 100%);
  width: 30px;
  height: 100%;
  content: '';
}
```

**Animated inner div** (JS/motion sets these inline styles on enter/exit):

```
open:   opacity: 1; transform: translate3d(0px, 0px, 0px);
closed: opacity: 0; transform: translate3d(8px, 0px, 0px);
```

Transition: `opacity 200ms cubic-bezier(0.33,1,0.68,1), transform 200ms cubic-bezier(0.33,1,0.68,1)`.

```css
.rightInner {
  position: relative;
  z-index: 10;
  border-radius: 0.75rem;
  padding: 0.5rem;
  width: 17.5rem; /* fixed 280px — matches the grid column */
  height: 100%;
}
```

**Bottom decorative fade (twinkle overlay):**

```css
.bottomFade {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 3.5rem;
  pointer-events: none;
}

.twinklePattern {
  position: absolute;
  opacity: 0.5;
  inset: 0;
  background-image: url('/images/twinkle.png');
  background-size: 5.25rem 5.25rem;
}
```

**Submenu section label:**

```css
/* Reuses .sectionLabel from left panel */
/* Additionally uses will-change: transform for stagger animation */
.subSectionLabel {
  /* same as .sectionLabel but also: */
  will-change: transform;
}
```

**Submenu item `<a>`:**

```css
.subItem {
  display: block;
  position: relative;
  transition:
    border-color 150ms cubic-bezier(0.33, 1, 0.68, 1),
    background-color 150ms cubic-bezier(0.33, 1, 0.68, 1);
  border: 0.5px solid transparent;
  border-radius: 0.375rem;
  background: transparent;
  padding: 0.375rem 0.625rem;
}

.subItem:hover {
  transition-duration: 100ms; /* faster on hover-in */
  border-color: rgba(19, 19, 22, 0.12);
  background: rgba(19, 19, 22, 0.02);
}

.subItemLabel {
  color: #030712; /* gray-950 */
  font-size: 0.8125rem;
  /* mono-2 */
  font-family: monospace;
}

/* "Docs" badge — hidden, slides in on item hover */
.subItemBadge {
  position: absolute;
  top: 50%;
  right: 0.625rem;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 150ms cubic-bezier(0.33, 1, 0.68, 1);
  color: #d1d5db; /* gray-300 */
  font-size: 0.75rem; /* label-4 */
}

.subItem:hover .subItemBadge {
  opacity: 1;
  transition-duration: 100ms;
}
```

**Stagger animation** for list items (applied per-item via inline style or a motion library):

```
LI[0]: transition-delay: 0ms
LI[1]: transition-delay: 25ms
LI[2]: transition-delay: 50ms
…etc
```

Entry state: `opacity: 0; transform: translate3d(0, 4px, 0)`  
Active state: `opacity: 1; transform: translate3d(0, 0, 0)`

---

## 4. Interaction / State Machine

```
State: { activeItemIndex: number | null }

onMouseEnter(triggerButton)  → open popup, set activeItemIndex = 0 (first item)
onMouseEnter(navItemLink[i]) → set activeItemIndex = i (swaps right panel content)
onMouseLeave(li container)   → close popup, set activeItemIndex = null

Grid transition:
  activeItemIndex === null  → gridTemplateColumns = "1fr 0px"
  activeItemIndex !== null  → gridTemplateColumns = "1fr 17.5rem"
```

The right panel content swap is **instant** (no cross-fade) — only the `grid-template-columns` and the `translate3d` animate.

---

## 5. SVG Icons

All icons use `fill="currentColor"`, `viewBox` as noted, rendered at `size-8` (32×32px) inside the icon wrapper.

**UserAuthIcon** — `viewBox="0 0 24 24"`: Person silhouette with outer ring. Single `<path>` with the `d` string starting `M20.3516 12C20.3516 7.38842 16.6135 3.65039...`

**B2BIcon** — `viewBox="0 0 22 17"`: Two stacked buildings. Single `<path>` starting `M18 6.90039C18 6.29287 17.5079...`

**BillingIcon** — `viewBox="0 0 24 24"`: Coin/dollar circle. Single `<path>` starting `M20.3516 12C20.3516 7.38842...` (same outer ring as UserAuth, different inner path for the $ symbol)

---

## 6. Base UI Integration

Use **`@base-ui-components/react` `<Popup>`** (or Floating UI directly) for the popover positioning and open/close logic. Key points:

- Use `openOnHover` with a small `delay={{ open: 80, close: 150 }}` to avoid flickering.
- The `data-state="open|closed"` attribute on the trigger and panel is what Base UI manages — CSS Modules can target it via `[data-state="open"]` selectors.
- The "bridge" pseudo-element on the trigger (`:after` covering the gap) prevents the dropdown from closing as the cursor travels down from the button to the panel.
- **Do not** use Base UI's `<Menu>` for the inner items — they are plain `<a>` tags, not menu items, so keyboard navigation should be implemented manually or with a `<Toolbar>` pattern.

---

## 7. Typography Utility Classes

These are design-system utility classes used in the markup. Implement as CSS Module classes:

| Class     | Spec                                                                                        |
| --------- | ------------------------------------------------------------------------------------------- |
| `tag-1`   | `font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase` |
| `label-3` | `font-size: 0.875rem; font-weight: 500`                                                     |
| `label-4` | `font-size: 0.75rem; font-weight: 500`                                                      |
| `body-3`  | `font-size: 0.75rem; font-weight: 400`                                                      |
| `mono-2`  | `font-family: monospace; font-size: 0.8125rem; font-weight: 400`                            |

---

## 8. File Structure

```
components/
  NavDropdown/
    NavDropdown.tsx          ← root component + popup open/close logic
    NavDropdown.module.css
    LeftPanel.tsx
    LeftPanel.module.css
    RightPanel.tsx
    RightPanel.module.css
    icons/
      UserAuthIcon.tsx
      B2BIcon.tsx
      BillingIcon.tsx
    nav.data.ts              ← the NavItem[] data array
    nav.types.ts
```

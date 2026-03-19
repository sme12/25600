import { useRef, useCallback, type KeyboardEvent, type RefObject } from 'react';

/** Prevent base-ui's CompositeRoot from also handling this key. */
function preventBaseUI(e: KeyboardEvent) {
  const event = e as KeyboardEvent & { preventBaseUIHandler?: () => void };
  event.preventBaseUIHandler?.();
}

/** preventDefault + stopPropagation + preventBaseUI in one call. */
function preventAll(e: KeyboardEvent) {
  e.preventDefault();
  e.stopPropagation();
  preventBaseUI(e);
} 

interface UseSubmenuKeyboardOptions {
  items: { label: string }[];
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  setSubmenuOpen: (open: boolean) => void;
  setDirection: (dir: 'down' | 'up') => void;
  previousIndexRef: RefObject<number>;
}

function useSubmenuKeyboard({
  items,
  activeValue,
  setActiveValue,
  setSubmenuOpen,
  setDirection,
  previousIndexRef,
}: UseSubmenuKeyboardOptions) {
  const triggerElements = useRef<(HTMLElement | null)[]>([]);
  const subItemElements = useRef<(HTMLAnchorElement | null)[]>([]);
  const subItemGeneration = useRef(0);

  const triggerRef = (index: number) => (el: HTMLElement | null) => {
    triggerElements.current[index] = el;
  };

  const subItemRef = (index: number) => {
    // Capture generation at call time (during render, after reset)
    const gen = subItemGeneration.current;
    return (el: HTMLAnchorElement | null) => {
      // Ignore cleanup calls from old AnimatePresence exit elements
      if (gen !== subItemGeneration.current) return;
      subItemElements.current[index] = el;
    };
  };

  const handleTriggerFocus = useCallback(
    (label: string, index: number) => {
      const dir = index > previousIndexRef.current ? 'down' : 'up';
      if (previousIndexRef.current >= 0) setDirection(dir);
      previousIndexRef.current = index;
      setActiveValue(label);
      setSubmenuOpen(true);
    },
    [previousIndexRef, setDirection, setActiveValue, setSubmenuOpen]
  );

  const handleTriggerKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        preventAll(e);
        // CompositeRoot schedules focus via queueMicrotask — use rAF to override
        requestAnimationFrame(() => {
          subItemElements.current[0]?.focus();
        });
        break;
      case 'ArrowLeft':
        preventAll(e);
        break;
      // CompositeItem roving tabindex makes non-active triggers tabIndex=-1,
      // so Tab skips them. Manually advance focus to the next trigger.
      case 'Tab':
        if (!e.shiftKey) {
          const target = e.currentTarget as HTMLElement;
          const currentIndex = triggerElements.current.indexOf(target);
          const nextTrigger = triggerElements.current[currentIndex + 1];
          if (nextTrigger) {
            e.preventDefault();
            nextTrigger.focus();
          }
        }
        break;
    }
  }, []);

  const handleSubItemKeyDown = useCallback(
    (e: KeyboardEvent, subIndex: number) => {
      const activeIndex = items.findIndex((item) => item.label === activeValue);

      switch (e.key) {
        case 'ArrowDown':
          preventAll(e);
          requestAnimationFrame(() => {
            const next =
              subIndex + 1 < subItemElements.current.length ? subIndex + 1 : 0;
            subItemElements.current[next]?.focus();
          });
          break;
        case 'ArrowUp':
          preventAll(e);
          requestAnimationFrame(() => {
            const prev =
              subIndex > 0 ? subIndex - 1 : subItemElements.current.length - 1;
            subItemElements.current[prev]?.focus();
          });
          break;
        case 'ArrowRight':
          preventAll(e);
          break;
        case 'ArrowLeft':
          preventAll(e);
          requestAnimationFrame(() => {
            triggerElements.current[activeIndex]?.focus();
          });
          break;
      }
    },
    [items, activeValue]
  );

  const resetSubItemRefs = useCallback(() => {
    subItemElements.current = [];
    subItemGeneration.current += 1;
    return null;
  }, []);

  return {
    triggerRef,
    subItemRef,
    handleTriggerFocus,
    handleTriggerKeyDown,
    handleSubItemKeyDown,
    resetSubItemRefs,
  };
}

export { useSubmenuKeyboard };

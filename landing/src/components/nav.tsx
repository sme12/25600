import { useState } from 'react';
import { MoonIcon, SunIcon } from '#/components/icons';
import { readTheme, toggleTheme } from '#/lib/theme';

export function Nav() {
  const [theme, setTheme] = useState(() => readTheme());

  return (
    <header className="flex h-14 items-center justify-between bg-surface-2 px-6 shadow-elev desktop:mx-auto desktop:h-auto desktop:w-[1040px] desktop:bg-transparent desktop:px-12 desktop:py-7 desktop:shadow-none">
      <span className="text-[15px] font-bold tracking-[-0.02em] text-text">
        25600<span className="text-accent">.design</span>
      </span>
      <button
        type="button"
        aria-label="Toggle color theme"
        onClick={() => setTheme(toggleTheme(theme))}
        className="-my-[11px] -mr-[11px] flex size-11 cursor-pointer items-center justify-center text-dim transition-colors duration-150 hover:text-accent dark:text-muted"
      >
        <span className="block size-5 overflow-hidden">
          <span
            className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              transform:
                theme === 'dark' ? 'translateY(-50%)' : 'translateY(0)',
            }}
          >
            <MoonIcon />
            <SunIcon />
          </span>
        </span>
      </button>
    </header>
  );
}

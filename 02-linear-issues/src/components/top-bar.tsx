import { PaintIcon } from '#/components/icons/paint';
import { SidebarIcon } from '#/components/icons/sidebar';
import { StarIcon } from '#/components/icons/star';

const t = {
  issues: 'Issues',
  menu: 'Menu',
  addToFavorites: 'Add to favorites',
};

export function TopBar() {
  return (
    <div className="border-b-border-muted flex h-[43.5px] items-center gap-0.5 border-b-[0.5px] px-2 md:gap-1">
      <button
        type="button"
        aria-label={t.menu}
        className="text-text-secondary hover:text-text flex h-7 w-7 items-center justify-center px-0.5"
      >
        <SidebarIcon className="h-3.5 w-3.5" />
      </button>
      <span className="flex items-center ps-2.5 pe-1">
        <span className="mr-2 flex h-6 items-center">
          <PaintIcon className="text-success" />
        </span>
        <span className="text-[13px] font-medium">{t.issues}</span>
      </span>
      <button
        type="button"
        aria-label={t.addToFavorites}
        className="text-text-secondary hover:text-text hover:bg-surface-active flex h-7 w-7 items-center justify-center rounded-full px-0.5"
      >
        <StarIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

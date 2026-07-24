import { GitHubIcon } from './icons';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2 px-5 py-12 desktop:mx-auto desktop:mt-16 desktop:flex desktop:w-[1040px] desktop:items-center desktop:justify-between desktop:border-foot-border desktop:bg-transparent desktop:px-12 desktop:pt-8 desktop:pb-12">
      <p className="mb-4 text-xs leading-4 text-dim desktop:mb-0 desktop:text-[12.5px]">
        Unofficial recreations, purely for education. All original designs
        belong to their owners.
      </p>
      <div className="flex flex-wrap gap-[18px] text-xs leading-4 font-medium desktop:gap-5 desktop:text-[12.5px]">
        <span className="text-dim">
          By{' '}
          <a
            href="https://design-curious.engineer/"
            className="text-foot-link transition-colors duration-150 hover:text-accent"
          >
            Vitalii Sazanov
          </a>
        </span>
        <span className="text-dim">MIT license</span>
        <a
          href="https://github.com/sme12/25600"
          className="inline-flex items-center gap-1.5 text-foot-link transition-colors duration-150 hover:text-accent"
        >
          <GitHubIcon size={14} />
          See on GitHub
        </a>
      </div>
    </footer>
  );
}

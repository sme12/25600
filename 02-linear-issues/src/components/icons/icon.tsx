import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '#/lib/utils';

type Props = Omit<ComponentPropsWithoutRef<'svg'>, 'children'> & {
  size?: number;
  children: ReactNode;
};

export function Icon({ size = 16, className, children, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={cn(className)}
      {...rest}
    >
      {children}
    </svg>
  );
}

export type IconProps = Omit<Props, 'children'>;

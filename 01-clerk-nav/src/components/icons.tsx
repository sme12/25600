import { memo } from 'react';

export const ChevronDownIcon = memo(function ChevronDownIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      {...props}
    >
      <path
        d="M6.17574 0.175736C6.41005 -0.0585787 6.78908 -0.0585787 7.02339 0.175736C7.25771 0.410051 7.25771 0.789078 7.02339 1.02339L4.7314 3.31636C4.10656 3.9412 3.09257 3.9412 2.46773 3.31636L0.175736 1.02339C-0.0585787 0.789078 -0.0585787 0.410051 0.175736 0.175736C0.410051 -0.0585787 0.789078 -0.0585787 1.02339 0.175736L3.31636 2.46773C3.47257 2.62394 3.72656 2.62394 3.88277 2.46773L6.17574 0.175736Z"
        fill="currentColor"
      />
    </svg>
  );
});

export const PlayIcon = memo(function PlayIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.51074 2.31152C3.67124 2.22395 3.86669 2.23025 4.02051 2.3291L7.52051 4.5791C7.66359 4.67111 7.75 4.82989 7.75 5C7.74996 5.17009 7.66359 5.32892 7.52051 5.4209L4.02051 7.6709C3.86672 7.76971 3.67122 7.77602 3.51074 7.68848C3.35024 7.60085 3.25004 7.43286 3.25 7.25V2.75C3.25 2.56712 3.35023 2.39918 3.51074 2.31152Z"
        fill="currentColor"
      />
    </svg>
  );
});

export const UserAuthIcon = memo(function UserAuthIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      {...props}
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 19.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="10.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
});

export const B2BIcon = memo(function B2BIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="22"
      height="17"
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      {...props}
    >
      <rect
        x="0.75"
        y="4.75"
        width="8.5"
        height="11.5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3.5"
        y="7.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="6"
        y="7.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="3.5"
        y="10.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="6"
        y="10.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="12.75"
        y="0.75"
        width="8.5"
        height="15.5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="15.5"
        y="3.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="18"
        y="3.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="15.5"
        y="6.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="18"
        y="6.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="15.5"
        y="9.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
      <rect
        x="18"
        y="9.5"
        width="1.5"
        height="1.5"
        rx="0.5"
        fill="currentColor"
      />
    </svg>
  );
});

export const BillingIcon = memo(function BillingIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 9.5c0-1.1-.9-2-2.5-2s-2.5.9-2.5 2 .9 1.5 2.5 2 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 6v1.5M12 16.5V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
});

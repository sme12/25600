import type { ReactNode } from 'react';
import { UserAuthIcon, B2BIcon, BillingIcon } from './icons';

interface SubItem {
  label: string;
  href: string;
  badge?: string;
}

interface SubSection {
  heading: string;
  items: SubItem[];
}

interface ProductNavItem {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
  tag?: string;
  subSection: SubSection;
}

const productsNav: ProductNavItem[] = [
  {
    label: 'User Authentication',
    href: '/user-authentication',
    description: 'For effortless sign-up, sign-in, and user profiles',
    icon: <UserAuthIcon />,
    subSection: {
      heading: 'Authentication Components',
      items: [
        { label: '<SignUp />', href: '/components/sign-up' },
        { label: '<SignIn />', href: '/components/sign-in' },
        { label: '<UserButton />', href: '/docs/user-button', badge: 'Docs' },
        {
          label: '<UserProfile />',
          href: '/docs/user-profile',
          badge: 'Docs',
        },
        { label: '<Waitlist />', href: '/docs/waitlist', badge: 'Docs' },
      ],
    },
  },
  {
    label: 'B2B Authentication',
    href: '/organizations',
    description: 'For powering multi-tenant teams and roles',
    icon: <B2BIcon />,
    subSection: {
      heading: 'B2B Authentication Components',
      items: [
        { label: '<CreateOrganization />', href: '/docs/create-organization' },
        {
          label: '<OrganizationSwitcher />',
          href: '/docs/organization-switcher',
        },
        {
          label: '<OrganizationProfile />',
          href: '/docs/organization-profile',
        },
        { label: '<OrganizationList />', href: '/docs/organization-list' },
      ],
    },
  },
  {
    label: 'Billing',
    href: '/billing',
    description: 'For handling subscriptions plans and payments',
    icon: <BillingIcon />,
    tag: 'Beta',
    subSection: {
      heading: 'Billing Components',
      items: [
        { label: '<PricingTable />', href: '/docs/pricing-table' },
        { label: '<CheckoutButton />', href: '/docs/checkout-button' },
      ],
    },
  },
];

export { productsNav };
export type { SubItem, SubSection, ProductNavItem };

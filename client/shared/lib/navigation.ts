import { ComponentType } from 'react';

export const ROUTES = {
  JOBS: '/jobs',
  INBOX: '/inbox',
} as const;

export interface NavigationItem {
  name: NavigationRouteName;
  href: string;
  icon?: ComponentType;
}

export enum NavigationRouteName {
  Jobs = 'Jobs',
  Inbox = 'Inbox',
}

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const navigationItems: NavigationItem[] = [
  {
    name: NavigationRouteName.Jobs,
    href: ROUTES.JOBS,
  },
  {
    name: NavigationRouteName.Inbox,
    href: ROUTES.INBOX,
  },
];

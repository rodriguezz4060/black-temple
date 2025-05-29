'use client';

import { data } from '@root/components/shared/profile/admin/app-sidebar';
import { usePathname } from 'next/navigation';

export function useBreadcrumbs() {
  const pathname = usePathname();

  const findBreadcrumbName = (url: string) => {
    for (const group of data.navMain) {
      if (group.url === url) {
        return group.title;
      }
      for (const item of group.items) {
        if (item.url === url) {
          return item.title;
        }
      }
    }
    const segments = url.split('/').filter(Boolean);
    return segments[segments.length - 1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const pathSegments = pathname
    .split('/')
    .filter(segment => segment)
    .slice(1);

  const breadcrumbs = pathSegments.reduce(
    (acc: { href: string; name: string }[], segment, index) => {
      const href = `/profile/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = findBreadcrumbName(href);
      acc.push({ href, name });
      return acc;
    },
    []
  );

  return breadcrumbs;
}

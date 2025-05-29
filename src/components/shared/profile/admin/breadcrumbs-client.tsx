'use client';

import { useBreadcrumbs } from '@root/components/hooks/admin-panel/use-breadcrumbs';
import { Breadcrumbs } from './breadcrumbs';

export function ClientBreadcrumbs() {
  const breadcrumbs = useBreadcrumbs();
  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
}

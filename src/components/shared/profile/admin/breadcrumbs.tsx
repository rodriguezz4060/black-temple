import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@root/components/ui/breadcrumb';
import Link from 'next/link';

interface BreadcrumbItem {
  href: string;
  name: string;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className='flex items-center'>
            <BreadcrumbItem
              className={
                index === breadcrumbs.length - 1 ? 'block' : 'hidden md:block'
              }
            >
              {index < breadcrumbs.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.name}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className='ml-2 hidden md:block' />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

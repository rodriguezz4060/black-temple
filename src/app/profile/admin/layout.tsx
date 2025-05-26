'use client';

import { AppSidebar } from '@root/components/shared/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@root/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@root/components/ui/breadcrumb';
import { Separator } from '@root/components/ui/separator';
import { usePathname } from 'next/navigation';
import { data } from '@root/components/shared/app-sidebar';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Функция для поиска названия по URL
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

  // Разбиваем путь на сегменты и пропускаем первый сегмент ('profile')
  const pathSegments = pathname
    .split('/')
    .filter(segment => segment)
    .slice(1);

  // Формируем хлебные крошки
  const breadcrumbs = pathSegments.reduce(
    (acc: { href: string; name: string }[], segment, index) => {
      const href = `/profile/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = findBreadcrumbName(href);
      acc.push({ href, name });
      return acc;
    },
    []
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className='flex items-center'>
                  <BreadcrumbItem
                    className={
                      index === breadcrumbs.length - 1
                        ? 'block'
                        : 'hidden md:block'
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
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

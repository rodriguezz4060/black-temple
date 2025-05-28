'use client';
import * as React from 'react';
import { MessagesSquare, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@root/components/ui/sidebar';
import { Container } from '@root/components/shared/container';
import { cn } from '@root/lib/utils';
import { Separator } from '@root/components/ui/separator';
import { useIsMobile } from '@root/components/hooks/sidebar/use-mobile';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ClientBreadcrumbs } from '@root/components/shared/profile/admin/breadcrumbs-client';

const data = {
  nav: [
    {
      name: 'Основные',
      icon: Settings,
      path: '/profile/settings',
      title: 'Настройки',
    },
    {
      name: 'Соцсети',
      icon: MessagesSquare,
      path: '/profile/settings/social',
      title: 'Ваши соцсети',
    },
  ],
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <Container className='my-3 max-w-[810px]'>
      <SidebarProvider className='items-start'>
        <Sidebar
          collapsible={isMobile ? 'icon' : 'none'}
          className={cn(isMobile ? 'md:flex' : 'hidden md:flex')}
        >
          <SidebarContent className={cn('min-h-[200px] border')}>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.nav.map(item => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.path}
                      >
                        <Link href={item.path}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className='flex max-h-[700px] flex-1 flex-col overflow-hidden'>
          <header className='flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              {isMobile && <SidebarTrigger className='-ml-1' />}
              <Separator orientation='vertical' className='mr-2 h-4' />
              <ClientBreadcrumbs />
            </div>
          </header>
          {children}
        </main>
      </SidebarProvider>
    </Container>
  );
}

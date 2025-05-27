'use client';
import * as React from 'react';
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from 'lucide-react';

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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@root/components/ui/breadcrumb';
import { Separator } from '@root/components/ui/separator';
import { useIsMobile } from '@root/components/hooks/sidebar/use-mobile';

const data = {
  nav: [
    { name: 'Notifications', icon: Bell },
    { name: 'Navigation', icon: Menu },
    { name: 'Home', icon: Home },
    { name: 'Appearance', icon: Paintbrush },
    { name: 'Messages & media', icon: MessageCircle },
    { name: 'Language & region', icon: Globe },
    { name: 'Accessibility', icon: Keyboard },
    { name: 'Mark as read', icon: Check },
    { name: 'Audio & video', icon: Video },
    { name: 'Connected accounts', icon: Link },
    { name: 'Privacy & visibility', icon: Lock },
    { name: 'Advanced', icon: Settings },
  ],
};

export function ProfileSettingsPage() {
  const isMobile = useIsMobile();

  return (
    <Container className='my-5 max-w-[1000px]'>
      <SidebarProvider className='items-start'>
        <Sidebar
          collapsible={isMobile ? 'icon' : 'none'}
          className={cn(isMobile ? 'md:flex' : 'hidden md:flex')}
        >
          <SidebarContent className={cn('min-h-[100px]!')}>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.nav.map(item => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.name === 'Messages & media'}
                      >
                        <a href='#'>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className='flex max-h-[500px] flex-1 flex-col overflow-hidden'>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              {isMobile && <SidebarTrigger className='-ml-1' />}
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Messages & media</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className='bg-muted/50 aspect-video max-w-3xl rounded-xl'
              />
            ))}
          </div>
        </main>
      </SidebarProvider>
    </Container>
  );
}

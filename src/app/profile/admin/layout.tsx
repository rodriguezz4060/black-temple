import { AppSidebar } from '@root/components/shared/profile/admin/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@root/components/ui/sidebar';
import { Separator } from '@root/components/ui/separator';
import { ClientBreadcrumbs } from '@root/components/shared/profile/admin/breadcrumbs-client';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for managing the application',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <ClientBreadcrumbs />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

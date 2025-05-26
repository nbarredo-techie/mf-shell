import React from 'react';
import { routes } from './routes';
import { AppSidebar, SidebarProvider } from 'shared-ui';
 

export default function Root() {
  return (
    <SidebarProvider>
         <AppSidebar items={routes} />
 
    </SidebarProvider>
  );
}

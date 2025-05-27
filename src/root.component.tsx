import React from 'react';
import { routes } from './routes';
import { AppSidebar, SidebarProvider, ThemeProvider, ThemeToggle } from '@shared-ui';
 

export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme"> 
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="flex h-16 items-center w-screen px-4 justify-between">
          <div className='w-2/5'></div>
          <div className='w-2/5'>
            <span className='font-black'>TERRABOOST MANAGE</span>
          </div>
            <div className="w-1/5">
              <ThemeToggle  />
            </div>
          </div>
        </header> 
      </div>
    <SidebarProvider>
         <AppSidebar items={routes} /> 
    </SidebarProvider> 
    </ThemeProvider>
  );
}

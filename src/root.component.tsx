import React from 'react';
import { routes } from './routes';
import { AppSidebar, SidebarProvider, ThemeProvider, ThemeToggle } from 'shared-ui';
 

export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="your-app-theme">
       <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </header> 
      </div>
    </ThemeProvider>
    <SidebarProvider>
         <AppSidebar items={routes} />
 
    </SidebarProvider>
    
    </ThemeProvider>
  );
}

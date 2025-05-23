import React from 'react';
import { routes } from './routes';
import { SidebarMenuButton, SidebarMenu, SidebarProvider } from 'shared-ui';

console.log('SidebarProvider:', SidebarProvider);
console.log('SidebarMenu:', SidebarMenu);
console.log('SidebarMenuButton:', SidebarMenuButton);

export default function Root() {
  return (
    <SidebarProvider>
      <div className="flex h-screen font-sans bg-slate-50 text-slate-900">
        <aside className="w-64 bg-white border-r border-slate-200 p-6 shadow-sm flex flex-col">
          <h2 className="mb-6 text-xl font-bold flex items-center gap-2 text-slate-800">
            <span>3</span> Microfrontends
          </h2>
          <SidebarMenu>
            {routes.map(route => (
              <SidebarMenuButton key={route.path} asChild>
                <a href={route.path}>{route.label}</a>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </aside>
        <main className="flex-1 p-8 bg-slate-50">
          {/* single-spa will mount microfrontend apps here */}
          <div id="single-spa-application:@mf/shell" />
        </main>
      </div>
    </SidebarProvider>
  );
}

import React from "react";
import { routes } from "./routes";

import {
  AppSidebar,
  SidebarProvider,
  ThemeProvider,
  ThemeToggle,
} from "@shared-ui";

export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="your-app-theme">
      <SidebarProvider>
        <AppSidebar items={routes} />
      </SidebarProvider>
      <div id="theme-toggle" className="fixed top-5 right-5">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

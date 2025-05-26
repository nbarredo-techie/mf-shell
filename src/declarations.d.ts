declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "shared-ui" {
  export const Button: React.ComponentType<React.PropsWithChildren<any>>; 
  export const AppSidebar: React.ComponentType<React.PropsWithChildren<any>>;

  export const SidebarProvider: React.ComponentType<React.PropsWithChildren<any>>;
  // Add other shared-ui exports as needed
}

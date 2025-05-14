/// <reference types="vite/client" />
/// <reference types="vite/client" />

declare module 'shared_ui/theme';
declare module 'shared_ui/components' {
  export const Button: React.ComponentType<{
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
    [key: string]: any;
  }>;
  
  export const buttonVariants: (options: {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
  }) => string;
}
// src/types/shared-ui.d.ts
declare module 'shared-ui/theme';
declare module 'shared-ui' {
  import React from 'react';
  
  export const Button: React.ComponentType<{
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
    [key: string]: any;
  }>;
}
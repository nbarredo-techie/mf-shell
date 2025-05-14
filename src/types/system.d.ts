// system.d.ts
interface Window {
    System: {
      import: (module: string) => Promise<any>;
    };
  }
  
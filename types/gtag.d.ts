// types/gtag.d.ts
declare global {
  interface Window {
    gtag?: {
      (command: 'config', target: string, params?: Record<string, any>): void;
      (command: 'event', action: string, params?: Record<string, any>): void;
      (command: 'js', date: Date): void;
      (command: 'get', target: string, field: string, callback: (value: string) => void): void;
      (...args: any[]): void;
    };
  }
}

export {};

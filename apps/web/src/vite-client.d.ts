declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly PROD?: boolean;
    // add other env vars as needed
    [key: string]: any;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly hot?: {
      on: (event: string, cb: (...args: any[]) => void) => void;
      off?: (event: string, cb: (...args: any[]) => void) => void;
      invalidate?: () => void;
      accept?: (cb: (...args: any[]) => void) => void;
    };
    glob?: (pattern: string) => Record<string, any>;
  }
}

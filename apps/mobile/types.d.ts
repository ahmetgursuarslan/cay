// Shim for React 19 + React Native JSX namespace in TS to avoid JSX namespace errors
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any intrinsic RN elements without strict checking here
      [elemName: string]: any;
    }
  }
}

// Allow importing JS helpers without types
declare module '*report-error-to-remote' {
  export function reportErrorToRemote(arg: { error: unknown }): Promise<{ success: boolean; error?: unknown }>;
}

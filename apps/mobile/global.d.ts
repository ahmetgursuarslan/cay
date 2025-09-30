/// <reference types="react" />
/// <reference types="react-native" />
declare module 'react-native/Libraries/Core/ExceptionsManager' {
  export function handleException(err: Error, isFatal: boolean): void;
}

declare module 'react-native-web-refresh-control' {
  import type { ComponentType } from 'react';
  import type { RefreshControlProps } from 'react-native';
  export const RefreshControl: ComponentType<RefreshControlProps>;
}

// Allow importing global CSS files on web entry
declare module '*.css' {
  const css: string;
  export default css;
}

// Also allow side-effect CSS imports (no exported value)
declare module './global.css' {
  const css: string;
  export default css;
}

// Allow importing JSX/JS files without types in strict TS project
declare module '*.jsx' {
  const Component: any;
  export default Component;
}
import 'react-router';
module 'virtual:load-fonts.jsx' {
	export function LoadFonts(): null;
}
declare module 'react-router' {
	interface AppLoadContext {
		// add context properties here
	}
}
declare module 'npm:stripe' {
	import Stripe from 'stripe';
	export default Stripe;
}
declare module '@auth/create/react' {
	import { SessionProvider } from '@auth/react';
	export { SessionProvider };
}

// Vite types are not strictly required; ImportMeta.hot is typed locally in src/client.d.ts

// Allow importing CSS as a side-effect in TS files
declare module '*.css' {
	const css: string;
	export default css;
}

// Keep JSX runtime types from @types/react; no local fallback needed
